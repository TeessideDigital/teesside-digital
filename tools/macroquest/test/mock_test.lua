-- Mock harness for MonkAssist.lua: stubs mq + ImGui, simulates a monk in
-- combat with a named target, and records every command the script fires.

local SCRATCH  = arg[1]
local SCRIPT   = arg[2]
local SCENARIO = arg[3] or 'normal'

local fired = {}
local usedDisc, usedAA, usedAbility = {}, {}, {}
local activeDisc = nil
local aaIds, aaNames = {}, {}
local nextAAId = 100
local delayCalls = 0
local bindFn, renderFn

-- Leaf object: property access returns a function that yields the value.
local function leaf(props)
    return setmetatable({}, {
        __index = function(_, k)
            return function() return props[k] end
        end,
        __call = function() return props.__self end,
    })
end

-- Responses keyed by TLO path; each is a function invoked on call with args.
local responses = {
    ['MacroQuest.GameState'] = function() return 'INGAME' end,
    ['EverQuest.Server'] = function() return 'mocktest' end,
    ['Me.CleanName'] = function() return 'Testmonk' end,
    ['Me.Class.ShortName'] = function() return 'MNK' end,
    ['Me.Level'] = function() return 130 end,
    ['Me.PctHPs'] = function() return 100 end,
    ['Me.PctEndurance'] = function() return 80 end,
    ['Me.CurrentEndurance'] = function() return 5000 end,
    ['Me.Feigning'] = function() return false end,
    ['Me.Casting'] = function() return nil end,
    ['Me.PctAggro'] = function() return 50 end,
    ['Me.Combat'] = function() return true end,
    ['Me.CombatState'] = function() return 'COMBAT' end,
    ['Me.Invis'] = function() return false end,
    ['Me.Moving'] = function() return false end,
    ['Me.XTargetSlots'] = function() return 2 end,
    ['Me.XTarget'] = function(i)
        if i == 1 then return leaf({ TargetType = 'Auto Hater', ID = 2000, Distance = 20 }) end
        return leaf({})
    end,
    ['Me.AutoSkill'] = function(i) return function() return 'Flying Kick' end end,
    ['Me.ActiveDisc.Name'] = function() return activeDisc end,
    ['Me.Aura'] = function(i) return function() return nil end end,
    ['Me.Buff'] = function(name) return function() return nil end end,
    ['Me.Song'] = function(name) return function() return nil end end,
    ['Me.FindBuff'] = function(pred) return function() return nil end end,
    ['Group'] = function() return 0 end,
    ['Spell'] = function(name)
        return leaf({ RankName = name .. ' Rk. III', EnduranceCost = 50, Stacks = true })
    end,
    ['Me.CombatAbility'] = function(name) return function() return 1 end end,
    ['Me.CombatAbilityReady'] = function(name) return function() return not usedDisc[name] end end,
    ['Me.CombatAbilityTimer'] = function(i) return leaf({ TotalSeconds = 0 }) end,
    ['Me.AltAbility'] = function(name)
        if not aaIds[name] then
            nextAAId = nextAAId + 1
            aaIds[name] = nextAAId
            aaNames[nextAAId] = name
        end
        return leaf({ ID = aaIds[name], Rank = 5 })
    end,
    ['Me.AltAbilityReady'] = function(name) return function() return not usedAA[name] end end,
    ['Me.AltAbilityTimer'] = function(name) return leaf({ TotalSeconds = 0 }) end,
    ['Me.Skill'] = function(name) return function() return 100 end end,
    ['Me.AbilityReady'] = function(name) return function() return not usedAbility[name] end end,
    ['Me.Inventory'] = function(slot) return leaf({ Name = nil }) end,
    ['FindItem'] = function(name) return function() return nil end end,
    ['SpawnCount'] = function(q) return function() return 0 end end,
    ['Target'] = function() return 1 end,
    ['Target.Type'] = function() return 'NPC' end,
    ['Target.Dead'] = function() return false end,
    ['Target.Distance'] = function() return 10 end,
    ['Target.LineOfSight'] = function() return true end,
    ['Target.ID'] = function() return 1000 end,
    ['Target.Named'] = function() return true end,
    ['Target.PctHPs'] = function() return 80 end,
    ['Target.CleanName'] = function() return 'A test dummy' end,
    ['Target.Buff'] = function(name) return function() return nil end end,
    ['Target.FindBuff'] = function(pred) return function() return nil end end,
}

if SCENARIO == 'emergency' then
    responses['Me.PctHPs'] = function() return 25 end
    responses['Me.PctAggro'] = function() return 100 end
elseif SCENARIO == 'ruaabri' then
    responses['Me.FindBuff'] = function(pred)
        return function()
            if pred:find('Ruaabri') then return "Ruaabri's Fury" end
            return nil
        end
    end
elseif SCENARIO == 'filler' then
    activeDisc = 'Eye of the Storm Rk. III'
end

local function makeNode(path)
    return setmetatable({}, {
        __index = function(_, k)
            return makeNode(path == '' and k or (path .. '.' .. k))
        end,
        __call = function(_, ...)
            local r = responses[path]
            if r then return r(...) end
            return nil
        end,
    })
end

local mqmock = {
    TLO = makeNode(''),
    configDir = SCRATCH,
    doevents = function() end,
    bind = function(cmd, fn) bindFn = fn end,
    unbind = function() end,
    imgui = { init = function(name, fn) renderFn = fn end },
    cmd = function(c)
        fired[#fired + 1] = c
        if c == '/stopdisc' then activeDisc = nil end
    end,
    cmdf = function(fmt, ...)
        local c = string.format(fmt, ...)
        fired[#fired + 1] = c
        local disc = c:match('^/disc (.+)$')
        if disc then
            usedDisc[disc] = true
            activeDisc = disc
        end
        local aaId = c:match('^/alt activate (%d+)$')
        if aaId then usedAA[aaNames[tonumber(aaId)]] = true end
        local abil = c:match('^/doability "(.+)"$')
        if abil then usedAbility[abil] = true end
        local item = c:match('^/useitem "(.+)"$')
        if item then usedDisc['ITEM:' .. item] = true end
    end,
    delay = function(ms, cond)
        if cond then return end
        if ms == 100 then
            delayCalls = delayCalls + 1
            if delayCalls > 60 then error('MOCKDONE', 0) end
        end
    end,
}

package.preload['mq'] = function() return mqmock end
package.preload['ImGui'] = function()
    local stub = {
        Begin = function() return true, true end,
        End = function() end,
        BeginTabBar = function() return true end,
        EndTabBar = function() end,
        BeginTabItem = function() return true end,
        EndTabItem = function() end,
        BeginChild = function() return true end,
        EndChild = function() end,
        BeginTable = function() return true end,
        EndTable = function() end,
        TableSetupColumn = function() end,
        TableHeadersRow = function() end,
        TableNextRow = function() end,
        TableNextColumn = function() end,
        Text = function() end,
        TextColored = function() end,
        TextWrapped = function() end,
        Separator = function() end,
        SameLine = function() end,
        ProgressBar = function() end,
        Checkbox = function(label, v) return v, false end,
        SliderInt = function(label, v) return v, false end,
        RadioButton = function() return false end,
        IsItemHovered = function() return false end,
        SetTooltip = function() end,
        Button = function() return false end,
        GetScrollY = function() return 0 end,
        GetScrollMaxY = function() return 100 end,
        SetScrollHereY = function() end,
        SetNextWindowSize = function() end,
    }
    ImGui = stub
    ImVec2 = function(x, y) return { x = x, y = y } end
    ImGuiCond = { FirstUseEver = 1 }
    ImGuiTableFlags = { Borders = 1, RowBg = 2 }
    return stub
end
bit32 = { bor = function(...)
    local r = 0
    for _, v in ipairs({ ... }) do r = r + v end
    return r
end }

local ok, err = pcall(dofile, SCRIPT)
print('=== script exit: ' .. tostring(err) .. ' ===')
assert(err == 'MOCKDONE' or tostring(err):find('MOCKDONE'), 'script died early: ' .. tostring(err))

print('=== fired commands, in order ===')
for i, c in ipairs(fired) do print(string.format('%2d. %s', i, c)) end

print('=== render test ===')
local rok, rerr = pcall(renderFn)
print('render 1: ' .. (rok and 'OK' or ('FAIL: ' .. tostring(rerr))))
rok, rerr = pcall(renderFn)
print('render 2: ' .. (rok and 'OK' or ('FAIL: ' .. tostring(rerr))))

print('=== bind test ===')
for _, args in ipairs({ { 'help' }, { 'burn', 'on' }, { 'pref', 'heel' }, { 'abd' }, { 'aoe', 'off' },
    { 'debug' }, { 'gui' }, { 'bogus' }, { 'alliance' }, { 'rescan' } }) do
    local bok, berr = pcall(bindFn, args[1], args[2])
    print(string.format('bind %-10s: %s', args[1], bok and 'OK' or ('FAIL: ' .. tostring(berr))))
end

print('=== settings file ===')
local f = io.open(SCRATCH .. '/MonkAssist_mocktest_Testmonk.lua')
if f then
    print(f:read('*a'))
    f:close()
else
    print('MISSING')
end
