---
title: "07. No-Code Runtime Components"
description: "AutoSaveManager, SaveTriggerZone checkpoints, SaveButtonBinding, SaveKeyBinding, and SaveFeedbackUI."
slug: docs/fuzzysave/nocode-components
---

## Overview

FuzzySave includes a rich suite of plug-and-play MonoBehaviour components designed for level designers, technical artists, and teams seeking zero-code gameplay persistence. Simply attach these components to scene objects or UI prefabs to establish full save and load mechanics.

---

![SaveTriggerZone with SaveFeedbackUI Toast](/images/fuzzysave/triggerzone_toast_feedback.gif)
*Player entering a green SaveTriggerZone checkpoint, prompting the SaveFeedbackUI spinner and toast notification.*

---

## 1. AutoSaveManager

The `AutoSaveManager` runs autonomously in the background to handle periodic saves and lifecycle triggers.

```
Inspector: [FuzzySave/Auto Save Manager]
├── Periodic Auto-Save:
│   ├── Enable Interval Save: [x]
│   ├── Interval Seconds: 300 (5 minutes)
│   └── Pause When TimeScale Zero: [x] (Skips saving while in Pause Menu)
├── Slot Management:
│   ├── Use Rolling Slots: [x]
│   ├── Rolling Slot Prefix: "autosave_"
│   └── Rolling Slot Count: 3 (Cycles: autosave_1 -> autosave_2 -> autosave_3)
└── Lifecycle Triggers:
    ├── Save On Scene Loaded: [ ]
    ├── Save On Application Pause: [x]
    └── Save On Application Quit: [x]
```

### Key Highlights:
- **Rolling Slots Protection:** Instead of repeatedly overwriting a single file, the manager cycles through `autosave_1`, `autosave_2`, and `autosave_3`. If a player saves right before dying, previous checkpoints remain intact.
- **TimeScale Zero Protection:** When players open inventory or pause screens (`Time.timeScale == 0`), auto-saving is halted to avoid capturing broken game states.

---

## 2. SaveTriggerZone

Attach `SaveTriggerZone` to any GameObject with a 2D or 3D Collider (`isTrigger = true`) to create checkpoints, level exit saves, or auto-load gates.

### Features:
- **Collider Support:** Works with 3D (`BoxCollider`, `SphereCollider`) and 2D (`BoxCollider2D`, `CircleCollider2D`).
- **Filtering:** Filter by `TargetTag` (default: `"Player"`) and `LayerMask`.
- **Supported Actions:** `Save`, `Load`, `SaveGroup`, `LoadGroup`, `DeleteSlot`, `ClearAllSlots`.
- **Cooldown & One-Shot:**
  - `m_CooldownSeconds`: Prevents double triggers when a player paces inside the zone.
  - `m_OneShot`: Ensures the checkpoint only activates once in its lifetime.
- **Scene View Gizmos:** Automatically draws colored 3D wire/solid gizmos in the Scene View:
  - **Green:** Save Action
  - **Blue:** Load Action
  - **Red:** Delete Action

---

## 3. SaveButtonBinding

Attach `SaveButtonBinding` to any standard Unity UI `Button` to convert it into a save or load button without writing click listeners.

### Anti-Spam Lockout:
When saving or loading begins, `SaveButtonBinding` automatically sets `button.interactable = false`. Once the asynchronous operation completes, it re-enables the button, preventing players from spamming file writes.

---

## 4. SaveKeyBinding (Quick Save / Quick Load)

Provides PC keybinding support (Default: **F5** for Quick Save, **F9** for Quick Load):
- Internal cooldown protection (`1.0s`) to prevent rapid key hammering.
- Optional audio clips for successful save (`m_SaveSound`) and load (`m_LoadSound`).

---

## 5. SaveFeedbackUI

A completely autonomous visual notification component. Drop it onto any Canvas UI element or toast banner prefab:
- **Zero Configuration:** Automatically registers itself to global events on `FuzzySaveManager`.
- **Smooth Fading:** Controls a `CanvasGroup` with customizable fade-in and fade-out animations.
- **Spinning Indicator:** Rotates an icon transform (`m_SpinnerIcon`) during active I/O.
- **State Messages:** Shows `"Saving..."`, `"Game Saved"`, `"Loading..."`, or `"Operation Failed!"`.

---

## 6. SaveActionTrigger

A versatile bridge component exposing parameterless and parameterized public methods ready for connection with:
- **UnityEvents** (`Button.onClick`, `UnityEvent`)
- **Animation Events** (save game at the end of a cutscene animation)
- **Timeline Signals**
- **Dialogue Systems** (save progress when finishing a quest dialogue)

```csharp
// Exposed public methods:
public void Save();
public void Load();
public void SaveActiveSlot();
public void LoadActiveSlot();
public void SaveSlot(string slotName);
public void LoadSlot(string slotName);
public void SaveGroup(string groupName);
public void LoadGroup(string groupName);
public void DeleteSlot(string slotName);
public void ClearAllSlots();
public void TriggerCustomEvent(string eventName);
```

---

## 7. FuzzySaveEventTriggerManager

Automatically instantiated upon scene load via `[RuntimeInitializeOnLoadMethod]`, this persistent `DontDestroyOnLoad` runner monitors global event rules defined in `FuzzySaveSettings.eventRules`.

---

## Next Chapter

Proceed to [08. Slot Metadata & GPU Thumbnails](/docs/fuzzysave/slot-metadata/) to explore rich slot data cards and zero-stall GPU screenshot capture.
