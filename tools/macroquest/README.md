# MonkAssist

A standalone Lua combat assist for an EverQuest Monk, written for MacroQuest
(MQNext). It replaces the old `monkeedisc.lua` and follows the burn strategy
from the "Basic Monk Guide" (Shattering of Ro era), using ability lists
adapted from the RGMercs `mnk_class_config.lua`. Everything is embedded in
one file: no RGMercs installation or external modules are required.

Works on Live and Emu: every ability is detected at startup and anything the
character does not have is skipped silently.

## Installation

1. Copy `MonkAssist.lua` into your MacroQuest `lua` folder:
   `<MQ folder>/lua/MonkAssist.lua`
2. In game: `/lua run MonkAssist`
3. One-time setup the script deliberately does not do for you (it reminds
   you at startup if it cannot confirm they are on):

   ```
   /autoskill flying kick on
   /autoskill tiger claw on
   ```

Settings are saved per server and character in the MQ `config` folder as
`MonkAssist_<server>_<name>.lua`, so each character keeps its own toggles.

## Commands

| Command | Effect |
| --- | --- |
| `/monk on` / `/monk off` | Enable or disable the assist |
| `/monk burn [on\|off]` | Burn Mode: force the burn state whenever possible |
| `/monk abd` | Toggle Always Be Discing (tertiary disc fillers) |
| `/monk alliance` | Toggle the Alliance line |
| `/monk aoe [on\|off]` | Toggle AE abilities |
| `/monk pref speed\|heel` | Set the primary burn preference |
| `/monk gui` | Show or hide the window |
| `/monk debug` | Toggle debug logging |
| `/monk rescan` | Re-detect abilities (after levelling or buying ranks) |
| `/monk help` | List commands |
| `/monk exit` | Shut the script down |

## How the rotation works

The script runs a priority state machine roughly ten times a second. States
are checked in this order and the first one that can act, acts; a state with
nothing ready falls through, so the spam bar never stalls behind a burn:

1. **Downtime** - aura, endurance regen (Breather/Hiatus/Breaths), Mend.
2. **Emergency** - below the emergency HP threshold or holding aggro on a
   named: Reject Death line, Mend, epic click, coating, Imitate Death,
   Armor of Experience, Feign Death. Emergency detection counts XTarget
   haters, so it still works when adds jump you with auto-attack off.
3. **Burn** - the guide's burn multibind: Silent Strikes on high aggro,
   then the preferred primary (Speed Focus or Heel of Zagali), then the
   amplifiers (Focused/Destructive Forces, Ton Po's, Infusion of Thunder,
   Spire of the Sensei, Eagle's Symmetry, Heron Stance, Reciprocal Form),
   with Terrorpalm/Ironfist as secondaries when both primaries are down and
   Eye of the Storm/Earthforce as tertiary fillers.
4. **CombatBuff** - Drunken Monkey, Zan Fi's Whistle, Alliance, combat
   endurance regen, and the ABD fillers.
5. **DPS** - the guide's core spam bar in hotbar order: Synergy, Fang,
   Wheel of Fists, Curse, Intimidation, Two-Finger Wasp Touch, Five Point
   Palm, optional Aureate Bane.
6. **Precision** - the throwing bar: all five Precision Strikes (low to
   high, so the throwing modifiers stack) and Vigorous Shuriken.

Burn windows open when Burn Mode is forced on, when the target is a named,
or when the Shaman epic buff (Prophet's Gift of the Ruchu) or Bard epic
(Spirit of Vesagran) lands on you, matching the guide's advice to anchor
burns on the Shaman epic. When a Beastlord's Ruaabri's Fury is running, the
script holds Speed Focus and leads with Heel instead, because both are
Hundred Hands effects and do not stack (toggleable).

Only one stance disc can run at a time, so the script never fires Speed over
Heel or vice versa. The one deliberate interruption is `/stopdisc` on a
tertiary filler when a primary burn is ready (toggleable).

AE tools (Destructive Forces with Speed, Devastating Assault otherwise) only
fire when AE is enabled and at least the configured number of mobs that are
actually aggroed on you are in range. It counts XTarget haters, not nearby
NPCs, so it will not clip bystanders.

## Customising

- **Ability lists** are near the top of the script in the `AbilitySets`
  table. Lists are ordered highest rank first and the resolver picks the
  first entry you own, so adding a new expansion's ability means inserting
  its base name (no `Rk. II` suffix) at the top of the right list.
- **Rotation order** lives in the `Rotations` tables. Each entry is
  `{ key = '...', cond = function() ... end }`; reorder or delete entries
  freely. To add a new AA, register it in `defineAAs` first, then add an
  entry to a rotation.
- **Thresholds** (emergency HP, endurance floors, AE count, engage range)
  are in the `Settings` table and adjustable in the GUI.

## Testing without the game

`test/mock_test.lua` stubs the `mq` and `ImGui` APIs and runs the whole
script against a simulated fight, printing every command it would have sent.
Useful for checking a rotation change before logging in:

```
lua5.1 test/mock_test.lua /tmp ../MonkAssist.lua           # normal burn
lua5.1 test/mock_test.lua /tmp ../MonkAssist.lua emergency # low HP + aggro
lua5.1 test/mock_test.lua /tmp ../MonkAssist.lua ruaabri   # Beastlord HHE up
lua5.1 test/mock_test.lua /tmp ../MonkAssist.lua filler    # stopdisc for a primary
```

(The first argument is a scratch directory for the settings file.)

## A note on automation

MacroQuest automation is against the rules on official Live servers and on
many Emu servers. Use this on servers where it is permitted, and know your
server's policy before running it.
