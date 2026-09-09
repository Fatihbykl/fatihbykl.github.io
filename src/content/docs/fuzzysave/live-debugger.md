---
title: "Play Mode Live Debugger"
description: "Real-time diagnostic window and live cheat console to inspect and modify save data in Play Mode."
slug: docs/fuzzysave/live-debugger
---

## 1. Overview & Launching the Debugger

The **Play Mode Live Debugger** is a real-time runtime diagnostics window designed to inspect, modify, and test save data while the game is actively running in the Unity Editor. It acts as both a **diagnostic profiler** and a **live cheat console**, eliminating the need to write debug UI overlays or restart game sessions.

To open the debugger:
* Navigate to: **`Tools > FuzzySave > Play Mode Live Debugger`**
* The window can be docked alongside the Game or Console view.

```
+-----------------------------------------------------------------------------------------+
| [● LIVE PLAY MODE ACTIVE]                                                               |
+-----------------------------------------------------------------------------------------+
| Slot Controls: [Active Slot Dropdown: slot_1 ▼]  [💾 Force Save]  [📂 Force Load]       |
| Snapshots:     [Snapshot ID: checkpoint_1]  [📸 Take Snapshot]  [⏪ Restore]            |
+-----------------------------------------------------------------------------------------+
| 🔍 Live Memory Variables (RAM) | Filter: [health                  ]                    |
|   • player_hp: 85 (int)        [ Edit: 100 ] [Update]                                   |
|   • player_gold: 1450 (int)    [ Edit: 9999] [Update]                                   |
|   • is_poisoned: false (bool)  [ Toggle ]                                               |
+-----------------------------------------------------------------------------------------+
| 📍 Tracked Scene Objects (SaveGuid) (Count: 24)                                         |
| 👾 Active Dynamic Spawns (DynamicSpawnTracker) (Count: 12)                              |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Key Capabilities & Workflow

### 2.1 Live RAM Memory Inspector & In-Game Cheat Console
While Play Mode is running, FuzzySave keeps an active `SaveContainer` in memory (`s_CurrentContainer`). The Live Debugger presents every stored entry:
* **Search Filter:** Type variable keys or values into the search field (`m_TxtSearchMemory`) to instantly isolate specific fields (e.g., searching `hp` or `inventory`).
* **Live In-Place Editing:**
  * Modify player health, ammunition, gold, or quest progress directly inside the editor window.
  * Clicking **Apply / Update** pushes the modified value directly into the runtime `SaveContainer`.
  * Triggering `LoadAsync()` or an in-game load will immediately reflect these edited values on the actual game characters.
* **Focus Safety Guard:** The debugger features an active input guard (`IsAnyMemoryElementFocused`). If you are currently typing in an input field, the window automatically suppresses auto-refresh polling so your cursor and text selection are never interrupted.

### 2.2 Scene GUID Tracking Inspector
The debugger connects to `GlobalGuidRegistry` and lists all active scene objects marked with `SaveGuid`:
* **Object Name & GUID:** Displays the hierarchy name and its unique GUID string.
* **Save Flags:** Shows which properties are currently monitored (`Position`, `Rotation`, `Scale`, `ActiveState`, `RigidbodyState`).
* **Threshold & Delta:** Inspects whether an object has moved past its `PositionThreshold` and will be written during the next save cycle.

### 2.3 Dynamic Spawn Tracker Inspector
Monitors entities instantiated at runtime via `DynamicSpawnTracker`:
* Displays all instances in `DynamicSpawnTracker.ActiveSpawns`.
* Shows the originating `prefabResourcePath`.
* Displays current dynamic physics velocities (`linearVelocity` and `angularVelocity`).

---

## 3. Quick Action Controls

### 3.1 Force Save & Force Load
* **Slot Dropdown:** Switch the target slot on the fly between all available save files on disk.
* **Create Custom Slot:** Enter a new slot identifier (e.g., `debug_test_slot`) and initialize it without leaving the play session.
* **Force Save:** Immediately invokes `FuzzySaveManager.SaveAsync(slotName)` on the active slot, executing the full main-thread gathering, background serialization, and atomic swap.
* **Force Load:** Immediately invokes `FuzzySaveManager.LoadAsync(slotName)`. Reinstates game state, repositions characters, restores dynamic spawns, and applies mapped fields.

### 3.2 Time-Travel RAM Snapshots
The Live Debugger exposes the in-memory snapshot API directly through visual buttons:
1. Enter an identifier in the **Snapshot ID** field (e.g., `BeforeTrap`).
2. Click **📸 Take Snapshot**: FuzzySave creates a deep clone of the current `SaveContainer` in RAM.
3. Test a lethal trap, hazardous boss encounter, or physics experiment.
4. Click **⏪ Restore Snapshot**: The game immediately rolls back to the exact snapshot state with zero disk reads and zero frame-rate hitch.

---

## 4. Diagnostics & Status Reporting

The bottom bar of the Live Debugger displays operational telemetry:
* **Status Badge:** Green `PLAY MODE ACTIVE` indicator or Grey `EDIT MODE IDLE` warning.
* **Memory Counter:** Total count of active variables currently resident in the RAM container.
* **Diagnostics Log:** Reports background task execution timings, write completion statuses, and any deserialization warnings in real time.
