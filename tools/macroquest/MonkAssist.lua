--[[
    MonkAssist.lua - EverQuest Monk combat assist for MacroQuest (MQNext)

    A standalone replacement for monkeedisc.lua, built around the "Basic Monk
    Guide" (Shattering of Ro era) with ability data and condition logic adapted
    from the RGMercs mnk_class_config.lua. No external modules are required
    beyond mq and ImGui, which ship with MQNext.

    INSTALL
      1. Copy this file into your MacroQuest "lua" folder, e.g.
         <MQ folder>/lua/MonkAssist.lua
      2. In game, run:  /lua run MonkAssist
      3. Type /monk help for the command list, or /monk gui for the window.

    RECOMMENDED ONE-TIME SETUP (the script does not send these for you):
      /autoskill flying kick on
      /autoskill tiger claw on

    HOW IT WORKS (short version)
      - On startup the script resolves every ability list to the highest rank
        your character actually owns (Live or Emu, it simply skips anything
        you do not have).
      - A state machine runs while the script is on. States are evaluated in
        priority order: Downtime, Emergency, Burn, CombatBuff, DPS, Precision.
        The first state whose entry condition passes gets to act; if nothing
        in that state is ready, evaluation falls through to the next state,
        so the spam bar never stalls waiting on a burn.
      - Each state holds an ordered rotation list. One ability fires per pass
        and the loop runs several times a second, which approximates the
        guide's "always be smashing your multibind" without flooding the
        server or clipping casts.

    CUSTOMISING
      - Ability lists live in the ABILITY DATA section. Each list is ordered
        highest rank first; the resolver picks the first entry you own. To
        add a new expansion's ability, insert its base name (no "Rk. II"
        suffix) at the top of the relevant list.
      - Rotation order lives in the ROTATIONS section. Each entry is just
        { key = "...", cond = function() ... end }. Reorder entries to change
        priority, delete an entry to drop it, or add a new one after
        registering the ability in the ABILITY DATA section.
      - Thresholds and toggles live in DEFAULT SETTINGS and are editable in
        the GUI. Settings persist per server and character under the MQ
        config folder.
--]]

local mq = require('mq')
require('ImGui')

-- ===========================================================================
-- SCRIPT STATE
-- ===========================================================================

local Running   = true       -- main loop flag, cleared by /monk exit
local openGUI   = true       -- window visibility, toggled by /monk gui
local Resolved  = {}         -- ability key -> resolved data (filled at startup)
local Log       = {}         -- ring buffer for the Log tab
local MAX_LOG   = 200

-- Ctx is refreshed once per tick so every condition reads the same snapshot
-- instead of hammering the TLO layer repeatedly.
local Ctx = {
    pctHP     = 100,
    pctEnd    = 100,
    inCombat  = false,
    feigning  = false,
    casting   = false,
    named     = false,
    aggro     = 0,
    aeCount   = 0,
    targetID  = 0,
    state     = 'Idle',
    lastAction = 'None',
    lastActionTime = 0,
    epicSeen  = 0,           -- os.time() when the Shaman epic buff last appeared
}

-- ===========================================================================
-- DEFAULT SETTINGS
-- ===========================================================================
-- Everything here is exposed in the Settings tab and saved per character.

local Settings = {
    Enabled           = true,    -- master switch (/monk on|off)
    BurnMode          = false,   -- force the burn state whenever possible
    BurnAuto          = true,    -- auto-burn when the Shaman/Bard epic buff lands
    BurnNamed         = true,    -- auto-burn on named targets
    BurnPref          = 'Speed', -- primary burn preference: 'Speed' or 'Heel'
    DelayForRuaabri   = true,    -- hold Speed Focus while a Beastlord's HHE runs
    ABD               = true,    -- Always Be Discing: tertiary fillers when idle
    AbdAllDiscs       = false,   -- ABD also cycles secondary burn discs
    StopFillerForBurn = true,    -- /stopdisc a tertiary filler when a primary is ready
    DoAlliance        = false,   -- fire the Alliance line (raid etiquette applies)
    DoAEDamage        = false,   -- allow AE tools (Destructive Forces, Dev Assault)
    AeCount           = 3,       -- minimum mobs in range before AE tools fire
    DoVetAA           = true,    -- Intensity of the Resolute / Armor of Experience
    AggroFeign        = true,    -- emergency Feign Death / Imitate Death
    DoCoating         = false,   -- click Blood/Spirit Drinker's Coating in emergencies
    DoChestClick      = true,    -- click the chest item during burns
    UseFivePointPalm  = true,    -- guide warns this can rip aggro on engage
    UseAureateBane    = false,   -- guide: only useful in ToB content
    EmergencyHP       = 35,      -- below this, the Emergency state takes over
    CriticalHP        = 20,      -- below this, last-resort abilities fire
    EndRegenPct       = 20,      -- refresh endurance regen below this
    MinEndPct         = 5,       -- stop spending endurance on spam below this
    MendPct           = 50,      -- downtime Mend threshold
    LowHPPct          = 10,      -- do not debuff mobs below this HP percentage
    EngageRange       = 50,      -- max target distance before we act
    Debug             = false,   -- verbose logging (/monk debug)
}

-- Keys we persist; anything else in Settings is treated as transient.
local SettingKeys = {}
for k in pairs(Settings) do SettingKeys[#SettingKeys + 1] = k end
table.sort(SettingKeys)

-- ===========================================================================
-- SMALL UTILITIES
-- ===========================================================================

-- pcall wrapper for TLO access. MQ TLO chains can error if a member does not
-- exist on a given build (Live vs Emu), so every speculative read goes
-- through here and failures simply return the default.
local function safe(fn, default)
    local ok, res = pcall(fn)
    if ok then return res end
    return default
end

local function printf(msg, ...)
    print('\a-t[MonkAssist]\ax ' .. string.format(msg, ...))
end

local function addLog(msg)
    Log[#Log + 1] = string.format('[%s] %s', os.date('%H:%M:%S'), msg)
    if #Log > MAX_LOG then table.remove(Log, 1) end
end

local function debugLog(msg)
    if Settings.Debug then
        addLog('DEBUG: ' .. msg)
        printf('\ay%s\ax', msg)
    end
end

local function info(msg)
    addLog(msg)
    printf('%s', msg)
end

-- ===========================================================================
-- SETTINGS PERSISTENCE
-- ===========================================================================
-- Settings are written out as a plain Lua table so they are human readable
-- and trivially loadable with loadfile. One file per server and character.

local function settingsPath()
    local server = safe(function() return mq.TLO.EverQuest.Server() end, 'unknown')
    local name   = safe(function() return mq.TLO.Me.CleanName() end, 'unknown')
    return string.format('%s/MonkAssist_%s_%s.lua', mq.configDir, server, name)
end

local function saveSettings()
    local f = io.open(settingsPath(), 'w')
    if not f then
        addLog('ERROR: could not write settings file')
        return
    end
    f:write('return {\n')
    for _, k in ipairs(SettingKeys) do
        local v = Settings[k]
        if type(v) == 'string' then
            f:write(string.format('    %s = %q,\n', k, v))
        else
            f:write(string.format('    %s = %s,\n', k, tostring(v)))
        end
    end
    f:write('}\n')
    f:close()
end

local function loadSettings()
    local chunk = loadfile(settingsPath())
    if not chunk then return end
    local ok, saved = pcall(chunk)
    if not ok or type(saved) ~= 'table' then return end
    for _, k in ipairs(SettingKeys) do
        if saved[k] ~= nil and type(saved[k]) == type(Settings[k]) then
            Settings[k] = saved[k]
        end
    end
end

-- ===========================================================================
-- ABILITY DATA
-- ===========================================================================
-- Disc lists come from the RGMercs config: ordered highest first, resolver
-- takes the first one the character owns. AAs and skills are single names.
-- The five Precision strikes are deliberately separate entries (not one
-- ranked list) because a max level monk keeps and throws all five, each on
-- its own timer, exactly as the guide's throwing hotbar does.

local AbilitySets = {
    EndRegen       = { 'Breather', 'Rest', 'Reprieve', 'Respite' },
    CombatEndRegen = { 'Hiatus V', 'Convalesce', "Night's Calming", 'Relax', 'Hiatus' },
    WindEndRegen   = { 'Fourth Wind', 'Third Wind', 'Second Wind' },
    Breaths        = { 'Moment of Stillness', 'Breath of Stillness', 'Breath of Tranquility',
        'Nine Breaths', 'Eight Breaths', 'Seven Breaths', 'Six Breaths', 'Five Breaths' },
    MonkAura       = { "Master's Aura", "Disciple's Aura" },
    Dicho          = { 'Reciprocal Form', 'Ecliptic Form', 'Composite Form', 'Dissident Form', 'Dichotomic Form' },
    Drunken        = { 'Drunken Monkey Style' },
    Curse          = { 'Curse of Seventeen Facets', 'Curse of Sixteen Shadows', 'Curse of Fifteen Strikes',
        'Curse of Fourteen Fists', 'Curse of the Thirteen Fingers' },
    Fang           = { "Uncia's Fang", "Zlexak's Fang", "Hoshkar's Fang", "Zalikor's Fang", 'Dragon Fang' },
    Fists          = { 'Wheel of Fists XII', 'Flurry of Fists', 'Buffeting of Fists', 'Barrage of Fists',
        'Firestorm of Fists', 'Torrent of Fists', 'Whorl of Fists', 'Wheel of Fists' },
    Synergy        = { "Lifewalker's Synergy", "Fatewalker's Synergy", "Bloodwalker's Synergy",
        "Icewalker's Synergy", "Firewalker's Synergy", "Doomwalker's Synergy", "Shadewalker's Synergy",
        "Veilwalker's Synergy", "Dreamwalker's Synergy", "Calanin's Synergy" },
    Alliance       = { "Fatewalker's Covariance", "Bloodwalker's Conjunction", "Icewalker's Coalition",
        "Firewalker's Covenant", "Doomwalker's Alliance" },
    Shuriken       = { 'Vigorous Shuriken' },
    CraneStance    = { 'Heron Stance', 'Crane Stance' },
    Storm          = { 'Eye of the Storm' },
    FistsOfWu      = { 'Fists Of Wu' },
    EarthDisc      = { 'Earthforce Discipline', 'Earthwalk Discipline' },
    RejectDeath    = { 'Delay Death XI', 'Defy Death', 'Repeal Death', 'Rescind Death', 'Reject Death',
        'Refuse Death', 'Forestall Death', 'Decry Death', 'Deny Death', 'Defer Death', 'Delay Death' },
    FistDisc       = { 'Ironfist Discipline', 'Scaledfist Discipline', 'Ashenhand Discipline' },
    Heel           = { 'Heel of Zagali', 'Heel of Kojai', 'Heel of Kai', 'Rapid Kick Discipline', 'Heel of Kanji' },
    Speed          = { 'Speed Focus Discipline', 'Hundred Fists Discipline' },
    Palm           = { 'Terrorpalm Discipline', 'Diamondpalm Discipline', 'Crystalpalm Discipline', 'Innerflame Discipline' },
    Poise          = { "Eagle's Symmetry", "Tiger's Symmetry", "Dragon's Poise", "Eagle's Poise", "Tiger's Poise" },
    -- Guide throwing bar order is low to high so the throw modifiers stack
    -- before the biggest strike lands. Each is its own resolver entry.
    PrecisionDoom  = { "Doomwalker's Precision Strike" },
    PrecisionFire  = { "Firewalker's Precision Strike" },
    PrecisionIce   = { "Icewalker's Precision Strike" },
    PrecisionBlood = { "Bloodwalker's Precision Strike" },
    PrecisionFate  = { "Fatewalker's Precision Strike" },
}

local ItemSets = {
    Epic    = { 'Transcended Fistwraps of Immortality', 'Fistwraps of Celestial Discipline' },
    Coating = { "Spirit Drinker's Coating", "Blood Drinker's Coating" },
}

-- Registry of everything the resolver should look for. kind determines how
-- an entry is checked for readiness and how it is activated.
local AbilityDefs = {}

local function defineDiscs()
    for key, list in pairs(AbilitySets) do
        AbilityDefs[key] = { kind = 'disc', list = list }
    end
end

local function defineAAs()
    local aas = {
        ZanFi           = "Zan Fi's Whistle",
        TwoFinger       = 'Two-Finger Wasp Touch',
        FivePointPalm   = 'Five Point Palm',
        AureateBane     = 'Aureate Bane',
        TonPo           = "Ton Po's Stance",
        InfusionThunder = 'Infusion of Thunder',
        SpireSensei     = 'Spire of the Sensei',
        SilentStrikes   = 'Silent Strikes',
        DestructForce   = 'Destructive Force',
        FocusedDF       = 'Focused Destructive Force',
        DevAssault      = 'Devastating Assault',
        SwiftTails      = "Swift Tails' Chant",
        Intensity       = 'Intensity of the Resolute',
        ArmorOfExp      = 'Armor of Experience',
        ImitateDeath    = 'Imitate Death',
    }
    for key, name in pairs(aas) do
        AbilityDefs[key] = { kind = 'aa', list = { name } }
    end
end

local function defineItemsAndSkills()
    AbilityDefs.Epic       = { kind = 'item', list = ItemSets.Epic }
    AbilityDefs.Coating    = { kind = 'item', list = ItemSets.Coating }
    AbilityDefs.Mend       = { kind = 'ability', list = { 'Mend' } }
    AbilityDefs.FeignDeath = { kind = 'ability', list = { 'Feign Death' } }
    AbilityDefs.Intimidate = { kind = 'ability', list = { 'Intimidation' } }
    AbilityDefs.EagleStrike = { kind = 'ability', list = { 'Eagle Strike' } }
end

defineDiscs()
defineAAs()
defineItemsAndSkills()

-- ===========================================================================
-- ABILITY RESOLUTION
-- ===========================================================================
-- The old monkeedisc.lua tried "name Rk. III", then "Rk. II", then base name
-- on every single check. Spell(name).RankName does that lookup properly: it
-- returns the exact rank the character owns (or the base name when there are
-- no ranks, which covers Emu). We resolve once at startup and cache.

local function resolveOne(def)
    for _, base in ipairs(def.list) do
        if def.kind == 'disc' then
            local rank = safe(function() return mq.TLO.Spell(base).RankName() end) or base
            if safe(function() return mq.TLO.Me.CombatAbility(rank)() end) then
                return { kind = 'disc', name = rank, base = base }
            end
        elseif def.kind == 'aa' then
            local id = safe(function() return mq.TLO.Me.AltAbility(base).ID() end)
            if id then
                return { kind = 'aa', name = base, base = base, id = id }
            end
        elseif def.kind == 'item' then
            if safe(function() return mq.TLO.FindItem('=' .. base)() end) then
                return { kind = 'item', name = base, base = base }
            end
        elseif def.kind == 'ability' then
            local skill = safe(function() return mq.TLO.Me.Skill(base)() end, 0)
            if (skill or 0) > 0 then
                return { kind = 'ability', name = base, base = base }
            end
        end
    end
    return nil
end

local function resolveAll()
    Resolved = {}
    local count = 0
    for key, def in pairs(AbilityDefs) do
        local r = resolveOne(def)
        if r then
            Resolved[key] = r
            count = count + 1
            debugLog(string.format('Resolved %s -> %s (%s)', key, r.name, r.kind))
        end
    end
    info(string.format('Resolved %d abilities for %s.', count,
        safe(function() return mq.TLO.Me.CleanName() end, 'unknown')))
end

-- ===========================================================================
-- CONDITION HELPERS
-- ===========================================================================
-- These are embedded, simplified versions of the RGMercs utility functions
-- (Casting.SelfBuffCheck, Targeting.MobNotLowHP, Core.AtEmergencyHP, etc.)
-- so the script stays fully standalone.

-- FindBuff searches buffs and songs with a predicate and copes with rank
-- suffixes; fall back to exact Buff/Song lookups if the build lacks it.
local function hasBuff(name)
    if not name then return false end
    local found = safe(function() return mq.TLO.Me.FindBuff('name "' .. name .. '"')() end)
    if found then return true end
    if safe(function() return mq.TLO.Me.Buff(name)() end) then return true end
    if safe(function() return mq.TLO.Me.Song(name)() end) then return true end
    return false
end

local function targetHasBuff(name)
    if not name then return false end
    local found = safe(function() return mq.TLO.Target.FindBuff('name "' .. name .. '"')() end)
    if found then return true end
    return safe(function() return mq.TLO.Target.Buff(name)() end) ~= nil
end

local function auraActive(base)
    for i = 1, 2 do
        local a = safe(function() return mq.TLO.Me.Aura(i)() end)
        if a and a:find(base, 1, true) then return true end
    end
    return false
end

local function inGroup(shortName)
    local size = safe(function() return mq.TLO.Group() end, 0) or 0
    for i = 1, size do
        local cls = safe(function() return mq.TLO.Group.Member(i).Class.ShortName() end)
        if cls == shortName then return true end
    end
    return false
end

local function atEmergencyHP() return Ctx.pctHP <= Settings.EmergencyHP end
local function atCriticalHP() return Ctx.pctHP <= Settings.CriticalHP end

-- Targeting.MobNotLowHP: do not waste ramp-up debuffs (Curse, Wasp Touch,
-- Alliance) on a mob that will be dead before they pay off.
local function mobNotLowHP()
    local pct = safe(function() return mq.TLO.Target.PctHPs() end, 0) or 0
    return pct > Settings.LowHPPct
end

-- Enough endurance for a disc, plus a floor so spam does not starve burns.
local function endOK(rankName)
    if Ctx.pctEnd < Settings.MinEndPct then return false end
    local cost = safe(function() return mq.TLO.Spell(rankName).EnduranceCost() end, 0) or 0
    local cur  = safe(function() return mq.TLO.Me.CurrentEndurance() end, 0) or 0
    return cur >= cost
end

-- Helpers.BurnDiscCheck from the config: true when it is safe to START a
-- burn stance disc, i.e. none of Heel/Speed/Ironfist/Terrorpalm is already
-- occupying the disc slot and we are not at emergency health. This is what
-- stops Speed Focus stomping Heel of Zagali mid-window.
local BURN_STANCES = { 'Heel', 'Speed', 'FistDisc', 'Palm' }

local function activeDiscName()
    return safe(function() return mq.TLO.Me.ActiveDisc.Name() end)
end

local function burnStanceActive()
    local active = activeDiscName()
    if not active then return false end
    for _, key in ipairs(BURN_STANCES) do
        local r = Resolved[key]
        if r and r.name == active then return true end
    end
    return false
end

local function burnDiscCheck()
    if atEmergencyHP() then return false end
    return not burnStanceActive()
end

local function fillerDiscActive()
    local active = activeDiscName()
    if not active then return false end
    for _, key in ipairs({ 'Storm', 'EarthDisc' }) do
        local r = Resolved[key]
        if r and r.name == active then return true end
    end
    return false
end

local function noDiscActive()
    return activeDiscName() == nil
end

-- Guide: when grouped with a Beastlord, their Ruaabri's Fury is a smaller
-- HHE that does not stack with Speed Focus, so hold Speed while it runs.
local function ruaabriActive()
    return hasBuff("Ruaabri's Fury")
end

-- Which primary burn goes first this window. Returns two keys.
local function primaryOrder()
    local first, second = 'Speed', 'Heel'
    if Settings.BurnPref == 'Heel' then first, second = 'Heel', 'Speed' end
    if first == 'Speed' and Settings.DelayForRuaabri and ruaabriActive() then
        first, second = 'Heel', 'Speed'
    end
    return first, second
end

-- Guide: the Shaman epic is the anchor for burns. Bard epic kept from the
-- old script for groups running one.
local EpicBuffs = { SHM = "Prophet's Gift of the Ruchu", BRD = 'Spirit of Vesagran' }

local function adpsEpicActive()
    local shm, brd = inGroup('SHM'), inGroup('BRD')
    if not shm and not brd then return nil end -- nil = no epic classes present
    if shm and hasBuff(EpicBuffs.SHM) then return true end
    if brd and hasBuff(EpicBuffs.BRD) then return true end
    return false
end

local function shouldBurn()
    if Settings.BurnMode then return true end
    if not Settings.BurnAuto then return false end
    if Settings.BurnNamed and Ctx.named then return true end
    local epic = adpsEpicActive()
    if epic == true then return true end
    return false
end

-- Counts mobs that actually have aggro on us (XTarget "Auto Hater" slots),
-- optionally limited to a range. Deliberately NOT a raw SpawnCount: counting
-- every NPC nearby would let the AE tools clip mobs nobody has aggroed.
local function xtHaterCount(maxRange)
    local count = 0
    local slots = safe(function() return mq.TLO.Me.XTargetSlots() end, 13) or 13
    for i = 1, slots do
        local xt = mq.TLO.Me.XTarget(i)
        if safe(function() return xt.TargetType() end) == 'Auto Hater' then
            local id = safe(function() return xt.ID() end, 0) or 0
            local dist = safe(function() return xt.Distance() end, 999) or 999
            if id > 0 and (not maxRange or dist <= maxRange) then count = count + 1 end
        end
    end
    return count
end

local function aeOK()
    return Settings.DoAEDamage and Ctx.aeCount >= Settings.AeCount
end

-- Casting.SelfBuffItemCheck: only click an item whose clicky buff is not
-- already running and would stack.
local function selfBuffItemCheck(itemName)
    local clicky = safe(function() return mq.TLO.FindItem('=' .. itemName).Clicky.Spell.Name() end)
    if not clicky then return false end
    if hasBuff(clicky) then return false end
    local stacks = safe(function() return mq.TLO.Spell(clicky).Stacks() end, true)
    return stacks ~= false
end

local function aaRank(name)
    return safe(function() return mq.TLO.Me.AltAbility(name).Rank() end, 0) or 0
end

-- ===========================================================================
-- READINESS AND EXECUTION
-- ===========================================================================

local function isReady(r)
    if r.kind == 'disc' then
        if not safe(function() return mq.TLO.Me.CombatAbilityReady(r.name)() end) then return false end
        return endOK(r.name)
    elseif r.kind == 'aa' then
        return safe(function() return mq.TLO.Me.AltAbilityReady(r.name)() end) == true
    elseif r.kind == 'ability' then
        return safe(function() return mq.TLO.Me.AbilityReady(r.name)() end) == true
    elseif r.kind == 'item' then
        local t = safe(function() return mq.TLO.FindItem('=' .. r.name).TimerReady() end, -1)
        return t == 0
    end
    return false
end

-- Seconds until an ability is usable again, for the Cooldowns tab.
-- Discs report in Ticks, AAs in a TimeStamp; both expose TotalSeconds.
local function cooldownSeconds(r)
    if r.kind == 'disc' then
        local idx = safe(function() return mq.TLO.Me.CombatAbility(r.name)() end)
        if not idx then return nil end
        return safe(function() return mq.TLO.Me.CombatAbilityTimer(idx).TotalSeconds() end, 0) or 0
    elseif r.kind == 'aa' then
        return safe(function() return mq.TLO.Me.AltAbilityTimer(r.name).TotalSeconds() end, 0) or 0
    elseif r.kind == 'item' then
        return safe(function() return mq.TLO.FindItem('=' .. r.name).TimerReady() end, 0) or 0
    end
    return nil
end

-- Fire one ability. The small delay afterwards mirrors the pacing of a real
-- multibind press and gives the server time to register the activation; the
-- conditional delay waits out cast-time abilities (Precision strikes) so we
-- never clip our own casts.
local function execute(r, label)
    if r.kind == 'disc' then
        mq.cmdf('/disc %s', r.name)
    elseif r.kind == 'aa' then
        mq.cmdf('/alt activate %d', r.id)
    elseif r.kind == 'ability' then
        mq.cmdf('/doability "%s"', r.name)
    elseif r.kind == 'item' then
        mq.cmdf('/useitem "%s"', r.name)
    end
    Ctx.lastAction = label or r.name
    Ctx.lastActionTime = os.time()
    debugLog('Fired: ' .. (label or r.name))
    mq.delay(150)
    mq.delay(1500, function() return not safe(function() return mq.TLO.Me.Casting() end) end)
end

-- Run one rotation list: fire the first entry that is resolved, ready, and
-- whose condition (if any) passes. Returns true if something fired.
local function runRotation(rotation)
    for _, entry in ipairs(rotation) do
        if entry.func then
            -- Special steps (like stopping a filler disc) supply func instead
            -- of an ability key. func returns true when it acted.
            if entry.func() then return true end
        else
            local r = Resolved[entry.key]
            if r and isReady(r) and (not entry.cond or entry.cond(r)) then
                execute(r, entry.label or entry.key)
                return true
            end
        end
    end
    return false
end

-- ===========================================================================
-- ROTATIONS
-- ===========================================================================
-- Order inside each list is priority order. Conditions are checked on top
-- of readiness, so an entry with no cond fires whenever it is off cooldown.

local Rotations = {}

Rotations.Downtime = {
    { key = 'MonkAura', cond = function(r) return not auraActive(r.base) end },
    { key = 'CombatEndRegen', cond = function() return Ctx.pctEnd < Settings.EndRegenPct end },
    { key = 'EndRegen', cond = function()
        return not Resolved.CombatEndRegen and Ctx.pctEnd < Settings.EndRegenPct
            and not safe(function() return mq.TLO.Me.Moving() end)
    end },
    { key = 'WindEndRegen', cond = function()
        return not Resolved.CombatEndRegen and not Resolved.EndRegen and Ctx.pctEnd < Settings.EndRegenPct
    end },
    { key = 'Breaths', cond = function() return Ctx.pctEnd < Settings.EndRegenPct end },
    { key = 'Mend', cond = function() return Ctx.pctHP < Settings.MendPct end },
    { key = 'FistsOfWu', cond = function(r)
        local lvl = safe(function() return mq.TLO.Me.Level() end, 0) or 0
        return lvl < 100 and not hasBuff(r.base)
    end },
}

-- Emergency handles both low health and dangerous aggro. Ctx.emHealth and
-- Ctx.emAggro are set by the state condition each tick.
Rotations.Emergency = {
    { key = 'RejectDeath', cond = function() return Ctx.emHealth and atCriticalHP() end },
    { key = 'Mend', cond = function() return Ctx.emHealth end },
    { key = 'Epic', cond = function() return Ctx.emHealth end },
    { key = 'Coating', cond = function(r)
        return Ctx.emHealth and Settings.DoCoating and selfBuffItemCheck(r.name)
    end },
    { key = 'ImitateDeath', cond = function() return Ctx.emAggro and Settings.AggroFeign end },
    { key = 'ArmorOfExp', cond = function() return Settings.DoVetAA and atCriticalHP() end },
    { key = 'FeignDeath', cond = function() return Ctx.emAggro and Settings.AggroFeign end },
}

-- Burn follows the guide's multibind structure: hate reduction, then the
-- preferred primary stance, then everything that amplifies it, then
-- secondary and tertiary stances as fallbacks when primaries are down.
Rotations.Burn = {
    -- Planned burn switch: a tertiary filler (Eye of the Storm, Earthforce)
    -- must be stopped before a primary can start, because only one disc can
    -- occupy the stance slot. This is the ONE case where we deliberately end
    -- a running disc.
    { label = 'StopFiller', func = function()
        if not Settings.StopFillerForBurn then return false end
        if not fillerDiscActive() then return false end
        local first, second = primaryOrder()
        local r1, r2 = Resolved[first], Resolved[second]
        if (r1 and isReady(r1)) or (r2 and isReady(r2)) then
            mq.cmd('/stopdisc')
            Ctx.lastAction = 'StopFiller (/stopdisc)'
            Ctx.lastActionTime = os.time()
            debugLog('Stopped filler disc for a primary burn')
            mq.delay(250)
            return true
        end
        return false
    end },
    { key = 'SilentStrikes', cond = function() return Ctx.named and Ctx.aggro > 60 end },
    -- Primaries require noDiscActive because the game rejects a /disc while
    -- any disc occupies the stance slot; burnDiscCheck adds the emergency
    -- HP gate on top.
    { label = 'Primary1', func = function()
        local first = primaryOrder()
        local r = Resolved[first]
        if r and isReady(r) and burnDiscCheck() and noDiscActive() then
            execute(r, 'Primary: ' .. r.name)
            return true
        end
        return false
    end },
    { label = 'Primary2', func = function()
        local _, second = primaryOrder()
        local r = Resolved[second]
        if r and isReady(r) and burnDiscCheck() and noDiscActive() then
            execute(r, 'Primary: ' .. r.name)
            return true
        end
        return false
    end },
    -- Guide pairing: Destructive Forces with Speed Focus when AE is safe,
    -- Focused Destructive Forces with Speed on single targets.
    { key = 'DestructForce', cond = function()
        local speed = Resolved.Speed
        return aeOK() and speed and activeDiscName() == speed.name
    end },
    { key = 'FocusedDF', cond = function()
        local speed = Resolved.Speed
        return not aeOK() and speed and activeDiscName() == speed.name
    end },
    { key = 'TonPo', cond = function() return burnStanceActive() end },
    { key = 'InfusionThunder' },
    { key = 'SpireSensei' },
    -- Note: the RGMercs config comments say Poise (Eagle's Symmetry) should
    -- only run alongside a burn stance, and the guide fires it inside the
    -- Speed multibind, so that is the behaviour here.
    { key = 'Poise', cond = function() return burnStanceActive() end },
    { key = 'CraneStance' },
    { key = 'Dicho' },
    -- Secondary stances fire only when neither primary is available, so a
    -- burn window never wastes Terrorpalm when Speed is seconds away.
    { label = 'Secondary', func = function()
        if not burnDiscCheck() or not noDiscActive() then return false end
        local first, second = primaryOrder()
        local r1, r2 = Resolved[first], Resolved[second]
        if (r1 and isReady(r1)) or (r2 and isReady(r2)) then return false end
        for _, key in ipairs({ 'Palm', 'FistDisc' }) do
            local r = Resolved[key]
            if r and isReady(r) then
                execute(r, 'Secondary: ' .. r.name)
                return true
            end
        end
        return false
    end },
    -- Tertiary fillers keep a disc running through the burn if all else is down.
    { key = 'Storm', cond = function() return noDiscActive() end },
    { key = 'EarthDisc', cond = function() return noDiscActive() end },
    { key = 'DevAssault', cond = function()
        return aeOK() and not hasBuff('Destructive Force')
    end },
    { label = 'ChestClick', func = function()
        if not Settings.DoChestClick then return false end
        local chest = safe(function() return mq.TLO.Me.Inventory('Chest').Name() end)
        if not chest then return false end
        local ready = safe(function() return mq.TLO.FindItem('=' .. chest).TimerReady() end, -1)
        if ready ~= 0 or not selfBuffItemCheck(chest) then return false end
        mq.cmdf('/useitem "%s"', chest)
        Ctx.lastAction = 'Chest: ' .. chest
        Ctx.lastActionTime = os.time()
        debugLog('Clicked chest: ' .. chest)
        mq.delay(150)
        return true
    end },
    { key = 'Intensity', cond = function() return Settings.DoVetAA end },
    -- Group endurance regen; the old script fired this when Speed Focus was
    -- draining endurance, so keep it need-based rather than on cooldown.
    { key = 'SwiftTails', cond = function() return Ctx.pctEnd < 70 end },
}

Rotations.CombatBuff = {
    -- The Hiatus line occupies the disc slot while channelling, so only
    -- start it when nothing else is running (ABD restarts fillers after).
    { key = 'CombatEndRegen', cond = function()
        return Ctx.pctEnd < Settings.EndRegenPct and noDiscActive()
    end },
    { key = 'WindEndRegen', cond = function()
        return not Resolved.CombatEndRegen and Ctx.pctEnd < Settings.EndRegenPct and noDiscActive()
    end },
    { key = 'Drunken', cond = function(r) return not hasBuff(r.base) end },
    { key = 'ZanFi', cond = function(r) return not hasBuff(r.base) end },
    { key = 'FistsOfWu', cond = function(r)
        local lvl = safe(function() return mq.TLO.Me.Level() end, 0) or 0
        return lvl < 100 and not hasBuff(r.base)
    end },
    { key = 'Alliance', cond = function(r)
        return Settings.DoAlliance and mobNotLowHP() and not targetHasBuff(r.base)
    end },
    -- Always Be Discing: guide's tertiary fillers keep the disc slot warm
    -- between burn windows. AbdAllDiscs additionally cycles the secondary
    -- stances (old monkeedisc behaviour); primaries are never spent here so
    -- they stay banked for real burn windows.
    { key = 'Storm', cond = function() return Settings.ABD and noDiscActive() end },
    { key = 'EarthDisc', cond = function() return Settings.ABD and noDiscActive() end },
    { key = 'Palm', cond = function()
        return Settings.ABD and Settings.AbdAllDiscs and noDiscActive() and not shouldBurn()
    end },
    { key = 'FistDisc', cond = function()
        return Settings.ABD and Settings.AbdAllDiscs and noDiscActive() and not shouldBurn()
    end },
}

-- DPS is the guide's core spam bar, in the guide's left-to-right order.
-- Zan Fi's and Drunken sit in CombatBuff (higher priority) so their buffs
-- are refreshed before the damage spam, same net effect as the hotbar.
Rotations.DPS = {
    { key = 'Synergy' },
    { key = 'Fang' },
    { key = 'Fists' },
    { key = 'Curse', cond = mobNotLowHP },
    { key = 'Intimidate', cond = function() return aaRank('Intimidation') > 1 end },
    { key = 'TwoFinger', cond = mobNotLowHP },
    { key = 'FivePointPalm', cond = function() return Settings.UseFivePointPalm end },
    { key = 'AureateBane', cond = function() return Settings.UseAureateBane end },
    { key = 'DevAssault', cond = function()
        return aeOK() and not hasBuff('Destructive Force')
    end },
    { key = 'EagleStrike', cond = function() return Ctx.pctEnd < 25 end },
}

-- Throwing attacks, guide hotbar order (low to high, then Shuriken).
Rotations.Precision = {
    { key = 'PrecisionDoom' },
    { key = 'PrecisionFire' },
    { key = 'PrecisionIce' },
    { key = 'PrecisionBlood' },
    { key = 'PrecisionFate' },
    { key = 'Shuriken' },
}

-- ===========================================================================
-- STATE MACHINE
-- ===========================================================================
-- States are tried in this order every tick. A state whose cond fails is
-- skipped; a state that fires an ability ends the tick; a state that has
-- nothing ready falls through, so DPS spam continues underneath burns.

local StateOrder = {
    {
        name = 'Downtime',
        cond = function()
            return not Ctx.inCombat and not Ctx.feigning and Ctx.haters == 0
                and safe(function() return mq.TLO.Me.CombatState() end) ~= 'COMBAT'
                and safe(function() return mq.TLO.Me.Invis() end, false) ~= true
        end,
    },
    {
        name = 'Emergency',
        -- Driven by haters rather than Ctx.inCombat so it still fires when
        -- mobs are on us with auto-attack off (adds while medding, etc.).
        cond = function()
            if Ctx.feigning then return false end
            Ctx.emHealth = Ctx.haters > 0 and atEmergencyHP()
            Ctx.emAggro  = Ctx.haters > 0 and Ctx.aggro >= 100 and (atEmergencyHP() or Ctx.named)
            return Ctx.emHealth or Ctx.emAggro
        end,
    },
    {
        name = 'Burn',
        cond = function() return Ctx.inCombat and not Ctx.feigning and shouldBurn() end,
    },
    {
        name = 'CombatBuff',
        cond = function() return Ctx.inCombat and not Ctx.feigning end,
    },
    {
        name = 'DPS',
        cond = function() return Ctx.inCombat and not Ctx.feigning end,
    },
    {
        name = 'Precision',
        cond = function() return Ctx.inCombat and not Ctx.feigning end,
    },
}

-- Refresh the per-tick snapshot of everything the conditions read.
local function refreshCtx()
    Ctx.pctHP    = safe(function() return mq.TLO.Me.PctHPs() end, 100) or 100
    Ctx.pctEnd   = safe(function() return mq.TLO.Me.PctEndurance() end, 100) or 100
    Ctx.feigning = safe(function() return mq.TLO.Me.Feigning() end, false) == true
    Ctx.casting  = safe(function() return mq.TLO.Me.Casting() end) ~= nil
    Ctx.aggro    = safe(function() return mq.TLO.Me.PctAggro() end, 0) or 0
    Ctx.haters   = xtHaterCount(nil)  -- anything aggroed on us, any range
    Ctx.aeCount  = xtHaterCount(50)   -- aggroed mobs close enough for AE rounds

    -- A valid combat target: attackable NPC, alive, in range, in line of
    -- sight. Ctx.inCombat additionally requires auto-attack on (like the
    -- old script's Me.Combat() gate) so the DPS spam only runs while you
    -- are actually fighting; Emergency uses Ctx.haters instead so it still
    -- works when adds jump you while you are medding.
    local attacking = safe(function() return mq.TLO.Me.Combat() end, false) == true
    local t = mq.TLO.Target
    local validTarget = safe(function() return t() end) ~= nil
        and safe(function() return t.Type() end) == 'NPC'
        and safe(function() return t.Dead() end) ~= true
        and (safe(function() return t.Distance() end, 999) or 999) <= Settings.EngageRange
        and safe(function() return t.LineOfSight() end, true) ~= false
    Ctx.inCombat = attacking and validTarget
    Ctx.targetID = validTarget and (safe(function() return t.ID() end, 0) or 0) or 0
    Ctx.named    = validTarget and safe(function() return t.Named() end, false) == true

    -- Track the Shaman epic for the Status tab burn planning readout.
    if hasBuff(EpicBuffs.SHM) then Ctx.epicSeen = os.time() end
end

local function tick()
    refreshCtx()

    -- Never act over a cast in progress or while feigned; a stray ability
    -- press would interrupt the cast or stand us up.
    if Ctx.casting then return end
    if Ctx.feigning then Ctx.state = 'Feigned'; return end

    for _, state in ipairs(StateOrder) do
        if state.cond() then
            Ctx.state = state.name
            if runRotation(Rotations[state.name]) then return end
        end
    end
    if not Ctx.inCombat then Ctx.state = 'Idle' end
end

-- ===========================================================================
-- IMGUI USER INTERFACE
-- ===========================================================================
-- The render callback runs on the render thread. It only reads state and
-- flips settings flags; it must never call mq.delay or fire abilities. The
-- main loop does all the acting. This split is what keeps the UI responsive
-- while the combat loop is mid-delay.

local function fmtSeconds(s)
    if not s or s <= 0 then return 'Ready' end
    return string.format('%d:%02d', math.floor(s / 60), math.floor(s % 60))
end

local function settingCheckbox(label, key, tooltip)
    local value, pressed = ImGui.Checkbox(label, Settings[key])
    if pressed then
        Settings[key] = value
        saveSettings()
    end
    if tooltip and ImGui.IsItemHovered() then ImGui.SetTooltip(tooltip) end
end

local function drawStatusTab()
    local stateColour = { Idle = { 0.6, 0.6, 0.6 }, Downtime = { 0.4, 0.8, 1.0 },
        Emergency = { 1.0, 0.3, 0.3 }, Burn = { 1.0, 0.6, 0.1 }, CombatBuff = { 0.6, 1.0, 0.6 },
        DPS = { 0.9, 0.9, 0.3 }, Precision = { 0.7, 0.7, 1.0 }, Feigned = { 0.8, 0.5, 0.8 } }
    local c = stateColour[Ctx.state] or { 1, 1, 1 }

    ImGui.Text('Assist:')
    ImGui.SameLine()
    if Settings.Enabled then
        ImGui.TextColored(0.3, 1.0, 0.3, 1.0, 'ON')
    else
        ImGui.TextColored(1.0, 0.3, 0.3, 1.0, 'OFF')
    end
    ImGui.SameLine()
    ImGui.Text('  State:')
    ImGui.SameLine()
    ImGui.TextColored(c[1], c[2], c[3], 1.0, Ctx.state)
    ImGui.SameLine()
    ImGui.Text('  Burn:')
    ImGui.SameLine()
    if Settings.BurnMode then
        ImGui.TextColored(1.0, 0.6, 0.1, 1.0, 'FORCED')
    elseif shouldBurn() and Ctx.inCombat then
        ImGui.TextColored(1.0, 0.6, 0.1, 1.0, 'ACTIVE')
    else
        ImGui.TextColored(0.6, 0.6, 0.6, 1.0, 'waiting')
    end

    ImGui.Separator()
    ImGui.Text(string.format('HP: %d%%', Ctx.pctHP))
    ImGui.ProgressBar(Ctx.pctHP / 100, ImVec2(-1, 14), '')
    ImGui.Text(string.format('Endurance: %d%%', Ctx.pctEnd))
    ImGui.ProgressBar(Ctx.pctEnd / 100, ImVec2(-1, 14), '')

    ImGui.Separator()
    local tname = safe(function() return mq.TLO.Target.CleanName() end) or 'None'
    local thp = safe(function() return mq.TLO.Target.PctHPs() end, 0) or 0
    ImGui.Text(string.format('Target: %s%s', tname, Ctx.named and ' (NAMED)' or ''))
    if tname ~= 'None' then
        ImGui.ProgressBar(thp / 100, ImVec2(-1, 14), string.format('%d%%', thp))
    end
    ImGui.Text('Active disc: ' .. (activeDiscName() or 'none'))
    ImGui.Text(string.format('Aggroed mobs in AE range: %d', Ctx.aeCount))

    ImGui.Separator()
    ImGui.Text('Last action: ' .. Ctx.lastAction)
    if hasBuff(EpicBuffs.SHM) then
        ImGui.TextColored(0.3, 1.0, 0.3, 1.0, 'Shaman epic: ACTIVE - burn now')
    elseif Ctx.epicSeen > 0 then
        ImGui.Text(string.format('Shaman epic: last seen %s ago', fmtSeconds(os.time() - Ctx.epicSeen)))
    end
    if ruaabriActive() then
        ImGui.TextColored(1.0, 0.8, 0.2, 1.0, "Ruaabri's Fury running - Speed Focus held")
    end
end

local function drawSettingsTab()
    ImGui.TextColored(0.9, 0.7, 0.3, 1.0, 'General')
    settingCheckbox('Assist enabled', 'Enabled', 'Master switch, same as /monk on|off')
    settingCheckbox('Always Be Discing (ABD)', 'ABD',
        'Keep a tertiary disc (Eye of the Storm, Earthforce) running between burns')
    settingCheckbox('ABD uses secondary discs too', 'AbdAllDiscs',
        'Also cycle Terrorpalm/Ironfist outside burn windows (old monkeedisc behaviour)')

    ImGui.Separator()
    ImGui.TextColored(0.9, 0.7, 0.3, 1.0, 'Burns')
    settingCheckbox('Burn Mode (always be burning)', 'BurnMode', 'Force the burn state whenever possible')
    settingCheckbox('Auto-burn on ADPS epic', 'BurnAuto', 'Burn when the Shaman/Bard epic buff lands on you')
    settingCheckbox('Auto-burn on named', 'BurnNamed', 'Treat named targets as burn windows')
    settingCheckbox("Hold Speed for Ruaabri's Fury", 'DelayForRuaabri',
        "Use Heel first while a Beastlord's HHE is running (they do not stack)")
    settingCheckbox('Stop filler disc for a primary', 'StopFillerForBurn',
        'End Eye of the Storm/Earthforce early when Speed or Heel is ready')
    ImGui.Text('Primary preference:')
    ImGui.SameLine()
    if ImGui.RadioButton('Speed first', Settings.BurnPref == 'Speed') then
        Settings.BurnPref = 'Speed'
        saveSettings()
    end
    ImGui.SameLine()
    if ImGui.RadioButton('Heel first', Settings.BurnPref == 'Heel') then
        Settings.BurnPref = 'Heel'
        saveSettings()
    end

    ImGui.Separator()
    ImGui.TextColored(0.9, 0.7, 0.3, 1.0, 'Damage options')
    settingCheckbox('Use Alliance', 'DoAlliance', 'Fire the Alliance/Conjunction line (coordinate on raids)')
    settingCheckbox('Use AE abilities', 'DoAEDamage', 'Destructive Forces / Devastating Assault when mobs allow')
    local ae, aeChanged = ImGui.SliderInt('AE mob count', Settings.AeCount, 2, 10)
    if aeChanged then
        Settings.AeCount = ae
        saveSettings()
    end
    settingCheckbox('Use Five Point Palm', 'UseFivePointPalm', 'High damage but can rip aggro on engage')
    settingCheckbox('Use Aureate Bane', 'UseAureateBane', 'Guide: only worth it in ToB content')

    ImGui.Separator()
    ImGui.TextColored(0.9, 0.7, 0.3, 1.0, 'Items and veteran AAs')
    settingCheckbox('Chest click during burns', 'DoChestClick', 'Click your breastplate as part of the burn')
    settingCheckbox('Coating in emergencies', 'DoCoating', "Click Blood/Spirit Drinker's Coating at low HP")
    settingCheckbox('Use veteran AAs', 'DoVetAA', 'Intensity of the Resolute and Armor of Experience')

    ImGui.Separator()
    ImGui.TextColored(0.9, 0.7, 0.3, 1.0, 'Safety thresholds')
    settingCheckbox('Emergency feign', 'AggroFeign', 'Feign Death / Imitate Death when aggro goes wrong')
    local em, emChanged = ImGui.SliderInt('Emergency HP %', Settings.EmergencyHP, 10, 70)
    if emChanged then
        Settings.EmergencyHP = em
        saveSettings()
    end
    local cr, crChanged = ImGui.SliderInt('Critical HP %', Settings.CriticalHP, 5, 50)
    if crChanged then
        Settings.CriticalHP = cr
        saveSettings()
    end
    local er, erChanged = ImGui.SliderInt('End regen below %', Settings.EndRegenPct, 5, 60)
    if erChanged then
        Settings.EndRegenPct = er
        saveSettings()
    end
end

-- Curated list for the Cooldowns tab: the spam bar plus the burn toolkit.
local CooldownKeys = {
    'Synergy', 'Fang', 'Fists', 'Curse', 'Shuriken',
    'PrecisionDoom', 'PrecisionFire', 'PrecisionIce', 'PrecisionBlood', 'PrecisionFate',
    'ZanFi', 'TwoFinger', 'FivePointPalm', 'TonPo', 'InfusionThunder', 'SpireSensei',
    'SilentStrikes', 'DestructForce', 'FocusedDF', 'DevAssault',
    'Speed', 'Heel', 'Palm', 'FistDisc', 'Storm', 'EarthDisc',
    'Poise', 'CraneStance', 'Dicho', 'Epic',
}

local function drawCooldownsTab()
    local flags = bit32.bor(ImGuiTableFlags.Borders, ImGuiTableFlags.RowBg)
    if ImGui.BeginTable('CooldownTable', 4, flags) then
        ImGui.TableSetupColumn('Ability')
        ImGui.TableSetupColumn('Type')
        ImGui.TableSetupColumn('Status')
        ImGui.TableSetupColumn('Reuse')
        ImGui.TableHeadersRow()
        for _, key in ipairs(CooldownKeys) do
            local r = Resolved[key]
            if r then
                ImGui.TableNextRow()
                ImGui.TableNextColumn()
                ImGui.Text(r.name)
                ImGui.TableNextColumn()
                ImGui.Text(r.kind)
                ImGui.TableNextColumn()
                if isReady(r) then
                    ImGui.TextColored(0.3, 1.0, 0.3, 1.0, 'Ready')
                else
                    ImGui.TextColored(1.0, 0.4, 0.4, 1.0, 'Waiting')
                end
                ImGui.TableNextColumn()
                local cd = cooldownSeconds(r)
                ImGui.Text(cd and fmtSeconds(cd) or '-')
            end
        end
        ImGui.EndTable()
    end
end

local function drawLogTab()
    settingCheckbox('Debug logging', 'Debug', 'Also toggled with /monk debug')
    ImGui.SameLine()
    if ImGui.Button('Clear') then Log = {} end
    ImGui.Separator()
    ImGui.BeginChild('##LogRegion')
    for _, line in ipairs(Log) do
        ImGui.TextWrapped(line)
    end
    if ImGui.GetScrollY() >= ImGui.GetScrollMaxY() - 20 then
        ImGui.SetScrollHereY(1.0)
    end
    ImGui.EndChild()
end

local function renderUI()
    if not openGUI then return end
    ImGui.SetNextWindowSize(ImVec2(460, 420), ImGuiCond.FirstUseEver)
    local shouldDraw
    openGUI, shouldDraw = ImGui.Begin('Monk Assist##MonkAssist', openGUI)
    if shouldDraw then
        if ImGui.BeginTabBar('MonkAssistTabs') then
            if ImGui.BeginTabItem('Status') then
                drawStatusTab()
                ImGui.EndTabItem()
            end
            if ImGui.BeginTabItem('Settings') then
                drawSettingsTab()
                ImGui.EndTabItem()
            end
            if ImGui.BeginTabItem('Cooldowns') then
                drawCooldownsTab()
                ImGui.EndTabItem()
            end
            if ImGui.BeginTabItem('Log') then
                drawLogTab()
                ImGui.EndTabItem()
            end
            ImGui.EndTabBar()
        end
    end
    ImGui.End()
end

-- ===========================================================================
-- SLASH COMMANDS
-- ===========================================================================

local function onOff(value, current)
    if value == 'on' or value == 'true' or value == '1' then return true end
    if value == 'off' or value == 'false' or value == '0' then return false end
    return not current -- no argument = toggle
end

local function bindMonk(action, arg)
    action = action and string.lower(action) or nil
    arg = arg and string.lower(arg) or nil

    if action == 'on' or action == 'off' then
        Settings.Enabled = (action == 'on')
        info('Assist: ' .. (Settings.Enabled and 'ON' or 'OFF'))
    elseif action == 'burn' then
        Settings.BurnMode = onOff(arg, Settings.BurnMode)
        info('Burn Mode: ' .. (Settings.BurnMode and 'ON' or 'OFF'))
    elseif action == 'abd' then
        Settings.ABD = not Settings.ABD
        info('Always Be Discing: ' .. (Settings.ABD and 'ON' or 'OFF'))
    elseif action == 'alliance' or action == 'ally' then
        Settings.DoAlliance = not Settings.DoAlliance
        info('Alliance: ' .. (Settings.DoAlliance and 'ON' or 'OFF'))
    elseif action == 'aoe' then
        Settings.DoAEDamage = onOff(arg, Settings.DoAEDamage)
        info('AE damage: ' .. (Settings.DoAEDamage and 'ON' or 'OFF'))
    elseif action == 'pref' and (arg == 'speed' or arg == 'heel') then
        Settings.BurnPref = arg == 'speed' and 'Speed' or 'Heel'
        info('Primary burn preference: ' .. Settings.BurnPref)
    elseif action == 'debug' then
        Settings.Debug = not Settings.Debug
        info('Debug logging: ' .. (Settings.Debug and 'ON' or 'OFF'))
    elseif action == 'gui' then
        openGUI = not openGUI
    elseif action == 'rescan' then
        info('Rescanning abilities...')
        resolveAll()
    elseif action == 'exit' or action == 'quit' then
        Running = false
    elseif action == 'help' or action == nil then
        printf('\ayCommand list:\ax')
        printf('  /monk on|off          - enable or disable the assist')
        printf('  /monk burn [on|off]   - toggle Burn Mode (always be burning)')
        printf('  /monk abd             - toggle Always Be Discing')
        printf('  /monk alliance        - toggle Alliance usage')
        printf('  /monk aoe [on|off]    - toggle AE abilities')
        printf('  /monk pref speed|heel - set primary burn preference')
        printf('  /monk gui             - show or hide the window')
        printf('  /monk debug           - toggle debug logging')
        printf('  /monk rescan          - re-detect abilities (after levelling)')
        printf('  /monk exit            - shut the script down')
    else
        printf('\arUnknown command "%s". Try /monk help.\ax', tostring(action))
        return
    end
    saveSettings()
end

-- ===========================================================================
-- STARTUP AND MAIN LOOP
-- ===========================================================================

local function autoskillReminder()
    -- The guide recommends autoskilling Flying Kick and Tiger Claw. Not all
    -- builds expose autoskill state to Lua, so if we cannot confirm it we
    -- just log a one-time reminder rather than sending commands ourselves.
    local detected = safe(function() return mq.TLO.Me.AutoSkill(1)() end)
    if not detected then
        info('Reminder: set /autoskill flying kick on and /autoskill tiger claw on (one-time setup).')
    end
end

local function setup()
    while safe(function() return mq.TLO.MacroQuest.GameState() end) ~= 'INGAME' do
        mq.delay(1000)
    end
    local cls = safe(function() return mq.TLO.Me.Class.ShortName() end)
    if cls ~= 'MNK' then
        printf('\arWarning: this script is built for Monks, you are %s. Expect most abilities to skip.\ax', tostring(cls))
    end
    loadSettings()
    resolveAll()
    autoskillReminder()
    mq.bind('/monk', bindMonk)
    mq.imgui.init('MonkAssist', renderUI)
    info('Monk Assist loaded. /monk help for commands, /monk gui for the window.')
end

local function main()
    setup()
    while Running do
        mq.doevents()
        if Settings.Enabled then
            local ok, err = pcall(tick)
            if not ok then
                addLog('ERROR: ' .. tostring(err))
                printf('\arTick error: %s\ax', tostring(err))
                mq.delay(1000) -- back off so a repeating fault cannot spam
            end
        else
            Ctx.state = 'Disabled'
        end
        mq.delay(100) -- ~10 evaluations per second; the multibind cadence
    end
    mq.unbind('/monk')
    saveSettings()
    printf('Monk Assist shut down.')
end

main()
