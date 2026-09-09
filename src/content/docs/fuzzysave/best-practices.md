---
title: "Best Practices & Troubleshooting"
description: "Production optimization advice, memory management, common pitfalls, and diagnostic solutions."
slug: docs/fuzzysave/best-practices
---

## 1. Performance & Architecture Best Practices

### 1.1 Always "Bake Persistent Code" Before Release Builds
While the auto-discovery engine can traverse fields via reflection in the Unity Editor, runtime reflection incurs memory allocations and CPU overhead on low-end hardware.
* **Best Practice:** Always open **`Tools > FuzzySave > Visual Save Studio`** and click **`Bake Persistent Code`** before creating a production build.
* This generates `FuzzySaveGenerated.cs`, replacing reflection with direct C# getter/setter calls.

### 1.2 Leverage DTOs for High-Frequency Game Data
Do not serialize raw `UnityEngine.Transform` or `UnityEngine.GameObject` instances directly. Use the provided structs in `DTOs.cs`:
* `Vector3DTO` instead of `Vector3`.
* `TransformDTO` for entities that need position, rotation, scale, and active state.
* `ColorDTO` instead of `Color`.

### 1.3 Tune `PositionThreshold` for Open Worlds
If your scene contains hundreds of physics boulders, crates, or interactive props with `SaveGuid`, micro-vibrations from the physics engine can trigger unnecessary saves:
* Set `m_PositionThreshold` to `0.01f` or `0.05f` units.
* Objects that have not moved significantly will be skipped via delta checking, saving disk I/O and reducing save payload size.

### 1.4 Use Save Groups for Segmented Persistence
Avoid saving the entire game state when only a small subsystem needs saving:
* Save settings or audio preferences to a `"Settings"` group:
  ```csharp
  await FuzzySaveManager.SaveGroupAsync("Settings", "settings_slot");
  ```
* Save quest updates to a `"QuestData"` group without writing the entire open-world entity graph.

---

## 2. Platform-Specific Guidelines

### 2.1 Mobile (iOS & Android)
* **`OnApplicationPause` is Mandatory:** On mobile platforms, operating systems frequently terminate backgrounded apps without firing `OnApplicationQuit`. Always ensure `m_SaveOnApplicationPause = true` in your `AutoSaveManager` or settings event rules.
* **Enable GZip Compression:** Mobile cellular networks can be slow or metered. GZip compression reduces cloud sync transfer sizes by up to 90%.

### 2.2 Consoles (PlayStation, Xbox, Nintendo Switch)
* **Slot Size Budgets:** Console certification requirements often enforce strict quotas on save file sizes. Check your slot size via `FuzzySaveManager.GetSlotMetadata().GetFormattedSize()` to guarantee compliance.
* **Synchronous vs. Asynchronous:** Never block the main thread with synchronous file I/O on consoles. Always use `await FuzzySaveManager.SaveAsync()`.

---

## 3. Troubleshooting & Diagnostic Guide

### Issue 1: "Save slot 'slot_1' could not be loaded or file does not exist"
* **Cause:** The slot file hasn't been created yet, or the application lacks read permissions to the storage directory.
* **Resolution:** Check `FuzzySaveManager.SlotExists("slot_1")` before attempting to load. Always provide fallback default values when calling `GetData<T>("key", defaultValue)`.

### Issue 2: Duplicate GUID Warnings on `SaveGuid`
* **Symptom:** Unity Console reports duplicate GUID collisions on scene objects.
* **Cause:** Prefabs or GameObjects were duplicated in the hierarchy using `Ctrl+D`.
* **Resolution:** `SaveGuid.OnValidate()` automatically detects collisions and generates a new GUID. If an object remains conflicted, select the GameObject in the Inspector and click **Force New GUID** or re-enable the component.

### Issue 3: Dynamic Spawn Prefab Not Found During `LoadAsync()`
* **Symptom:** Dynamic entities fail to respawn when a save is loaded.
* **Cause:** The prefab was moved, renamed, or is neither in a `Resources/` folder nor registered in `FuzzySaveSettings.registeredPrefabs`.
* **Resolution:**
  1. Open `Assets/FuzzyLogicLabs/FuzzySave/Resources/FuzzySaveSettings.asset`.
  2. Under **Registered Prefabs**, add a new entry linking your prefab asset to its designated path.

### Issue 4: Type Deserialization Warning After Refactoring Class Names
* **Symptom:** `Failed to deserialize type 'OldPlayerStats'`.
* **Cause:** A C# class was renamed or moved to a different namespace.
* **Resolution:** Use `SaveMigrationManager` to register a migration step that converts old type signatures to the new type name, or retain the old class as a deprecated DTO adapter.

### Issue 5: Cloud Sync Conflicts
* **Symptom:** The cloud overwrites recent local progress or local progress rejects cloud saves.
* **Resolution:** Review your `CloudConflictPolicy`:
  * Use `CloudConflictPolicy.UseNewest` for standard gameplay.
  * Ensure system clocks on client devices are reasonably synchronized with network time (NTP).
