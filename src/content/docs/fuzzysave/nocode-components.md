---
title: "No-Code Runtime Components"
description: "Pre-built MonoBehaviour components for triggers, checkpoints, UI buttons, and auto-saving."
slug: docs/fuzzysave/nocode-components
---

FuzzySave provides a comprehensive collection of pre-built, drop-in `MonoBehaviour` components. These enable game designers and developers to build complete save/load workflows—including checkpoints, UI menus, hotkeys, auto-saving, and screen toasts—**without writing a single line of C# code**.

---

## 1. `SaveTriggerZone` (Checkpoints & Level Transitions)

* **Menu Path:** `Component > FuzzySave > Save Trigger Zone`
* **Source:** `SaveTriggerZone.cs`

`SaveTriggerZone` converts any 2D or 3D trigger volume into an interactive checkpoint or world-transition trigger.

### Key Features & Inspector Properties

| Property | Type | Description |
|---|---|---|
| **Action** | `TriggerAction` | `Save`, `Load`, `DeleteSlot`, `ClearAllSlots`, `SaveGroup`, `LoadGroup`. |
| **Use Active Slot** | `bool` | If true, targets `FuzzySaveManager.ActiveSlot`. Otherwise uses `m_SlotName`. |
| **Slot Name** | `string` | Custom target slot identifier (e.g., `"checkpoint_dungeon_1"`). |
| **Group Name** | `string` | Target save group when action is `SaveGroup` or `LoadGroup`. |
| **Target Tag** | `string` | Tag filter (default: `"Player"`). Ignores other colliders. |
| **Target Layer** | `LayerMask` | Layer mask filter to restrict which physics layers can activate the trigger. |
| **Cooldown Seconds**| `float` | Minimum interval before the zone can re-trigger (prevents multi-firing). |
| **One Shot** | `bool` | If true, deactivates itself after the first successful trigger. |
| **Trigger Sound** | `AudioClip` | Sound effect played at the trigger position via `AudioSource.PlayClipAtPoint`. |
| **OnTriggerExecuted**| `UnityEvent` | Fires the moment the trigger is activated. |
| **OnActionCompleted**| `UnityEvent<bool>`| Fires when the asynchronous save/load operation finishes. |

### Scene View Gizmo Feedback
In the Unity Scene View, `SaveTriggerZone` automatically draws visual boundaries representing its collider dimensions, color-coded by action:
* **Green:** Save action (Checkpoint).
* **Cyan/Blue:** Load action (Respawn portal).
* **Red:** Delete or Clear action.

---

## 2. `SaveButtonBinding` (UI Button Integration)

* **Menu Path:** `Component > FuzzySave > Save Button Binding`
* **Source:** `SaveButtonBinding.cs`

Attaches directly to any Unity UI `Button` to wire up save menu screens (e.g., "Save Game", "Load Game", "Delete Slot").

### Anti-Spam Click Protection
A common bug in game UI is the "double-click" glitch: a player spam-clicks a "Save" or "Load" button while an asynchronous operation is in flight, initiating overlapping I/O writes.
* When `m_DisableWhileProcessing = true`, `SaveButtonBinding` automatically sets `button.interactable = false` upon click.
* Once the background save/load task finishes, interactability is restored automatically.
* Optionally plays click feedback audio (`m_ClickSound`).

---

## 3. `SaveKeyBinding` (Quick Save & Quick Load)

* **Menu Path:** `Component > FuzzySave > Save Key Binding (Quick Save)`
* **Source:** `SaveKeyBinding.cs`

Provides PC and console hotkey shortcuts for standard Quick Save and Quick Load mechanics.

### Configuration

* **Quick Save:**
  * Enabled toggle (`m_EnableQuickSave`).
  * KeyCode (default: `KeyCode.F5`).
  * Target slot name (default: `"quicksave"`).
  * Audio effect on save success (`m_SaveSound`).
  * Event notification (`OnQuickSaveCompleted`).
* **Quick Load:**
  * Enabled toggle (`m_EnableQuickLoad`).
  * KeyCode (default: `KeyCode.F9`).
  * Audio effect on load success (`m_LoadSound`).
  * Event notification (`OnQuickLoadCompleted`).
* **Debounce Cooldown:** `m_CooldownSeconds = 1.0f` prevents key-press spamming.

---

## 4. `AutoSaveManager` (Periodic & Rolling Slots)

* **Menu Path:** `Component > FuzzySave > Auto Save Manager`
* **Source:** `AutoSaveManager.cs`

A complete background auto-save manager featuring **Rolling Slot Rotation** and **Pause State Safeguards**.

### 4.1 Rolling Slots Architecture (Eliminating Bad Checkpoints)

If a game only writes to a single `autosave` file and triggers an auto-save right before the player falls into lava or gets hit by a lethal projectile, the player can end up in an unescapable death loop.

FuzzySave solves this with **Rolling Slots**:
* Configured with `m_RollingSlotPrefix = "autosave_"` and `m_RollingSlotCount = 3`.
* Writes sequentially: `autosave_1` -> `autosave_2` -> `autosave_3` -> `autosave_1`.
* The player always retains access to the previous 2 or 3 chronological checkpoints.

### 4.2 Pause Protection & Lifecycle Triggers

* **Pause Safety (`m_PauseWhenTimeScaleZero`):** When the player opens an in-game pause menu or inventory screen where `Time.timeScale == 0`, periodic timer ticks are suspended. Auto-saving will never freeze the game in a pause menu.
* **Lifecycle Hooks:**
  * `m_SaveOnSceneLoaded`: Auto-saves upon entering a new level.
  * `m_SaveOnApplicationPause`: Auto-saves immediately when the game is minimized on iOS, Android, or consoles.
  * `m_SaveOnApplicationQuit`: Auto-saves when the application receives an OS quit signal.

---

## 5. `SaveFeedbackUI` (Visual Toast Notifications & Spinners)

* **Menu Path:** `Component > FuzzySave > Save Feedback UI`
* **Source:** `SaveFeedbackUI.cs`

Provides instant visual feedback to players during save and load operations (e.g., displaying "Game Saved..." in the corner of the screen).

### Features

* **Zero Code Wiring:** Automatically binds to `FuzzySaveManager.OnSaveStarted`, `OnSaveCompleted`, `OnLoadStarted`, and `OnLoadCompleted`.
* **Smooth Transitions:** Employs a `CanvasGroup` to perform customizable ease fade-ins, display pauses, and fade-outs.
* **Rotating Spinner Icon:** Animates a rotating loading spinner `Transform` at configurable degrees per second (`m_SpinnerSpeed = 360f`).
* **Status Text Formatting:** Displays dynamic status strings with localized fallback text (`"Saving Game..."`, `"Game Saved!"`, `"Loading Game..."`, `"Load Complete!"`, `"Save Failed!"`).

---

## 6. `SaveActionTrigger` (UnityEvent & Inspector Bridge)

* **Menu Path:** `Component > FuzzySave > Save Action Trigger`
* **Source:** `SaveActionTrigger.cs`

Exposes public parameterless and parameter-driven C# methods that can be hooked into standard Unity Inspector events:
* **Compatible With:**
  * Animation Events (e.g., save when player character sits at a bonfire).
  * Unity Timeline Signal Receivers.
  * Dialogue System node completion callbacks.
  * Boss / Enemy death events (`bossHealth.OnDeath.AddListener(...)`).
* **Available Methods:**
  * `Save()`, `Load()`
  * `SaveActiveSlot()`, `LoadActiveSlot()`
  * `SaveSlot(string slotName)`, `LoadSlot(string slotName)`
  * `SaveGroup(string groupName)`, `LoadGroup(string groupName)`
  * `DeleteSlot(string slotName)`, `ClearAllSlots()`
  * `TriggerCustomEvent(string eventName)`

---

## 7. `FuzzySaveEventTriggerManager` (Lifecycle Runner)

* **Source:** `FuzzySaveEventTriggerManager.cs`

An internal singleton instantiated automatically at game launch via `[RuntimeInitializeOnLoadMethod]`. It remains persistent across scenes (`DontDestroyOnLoad`) and actively executes all declarative `SaveEventRule` items configured inside `FuzzySaveSettings.eventRules`.
