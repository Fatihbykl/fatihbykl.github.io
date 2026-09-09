---
title: "C# Scripting API Reference"
description: "Complete API reference for FuzzySaveManager, SaveResult, events, and callback delegates."
slug: docs/fuzzysave/api-reference
---

The `FuzzySaveManager` static class provides the primary C# programming interface for the entire save engine. All methods are thread-safe and non-blocking where applicable.

```csharp
using FuzzyLogicLabs.FuzzySave;
```

---

## 1. Properties & Global Configuration

### `ActiveSlot`
```csharp
public static string ActiveSlot { get; set; }
```
Gets or sets the current active save slot name (defaults to `"slot_1"`).
* When set to a new value, fires the [`OnActiveSlotChanged`](#onactiveslotchanged) event delegate.
* Passing `null` or empty string safely defaults back to `"slot_1"`.

### `Settings`
```csharp
public static FuzzySaveSettings Settings { get; set; }
```
Gets or sets the active `FuzzySaveSettings` ScriptableObject.
* If `null`, it automatically loads `FuzzySaveSettings` from the project's `Resources/` directory.
* In the Unity Editor, it automatically creates the asset on disk if none exists.

### `CurrentState`
```csharp
public static SaveContainer CurrentState { get; }
```
Returns a direct reference to the current in-memory `SaveContainer`, allowing advanced low-level inspection of entries, GUID objects, and dynamic spawn records.

---

## 2. Event Delegates

### `OnSaveStarted`
```csharp
public static event Action<string> OnSaveStarted;
```
Fired immediately before a save operation begins. Passes the target slot name as a parameter.

### `OnSaveCompleted`
```csharp
public static event Action<string, bool> OnSaveCompleted;
```
Fired when a save operation concludes on the main thread.
* Parameter 1: `string slotName`
* Parameter 2: `bool success` (indicates whether disk write and cloud upload succeeded).

### `OnLoadStarted`
```csharp
public static event Action<string> OnLoadStarted;
```
Fired when a load operation starts. Passes the target slot name.

### `OnLoadCompleted`
```csharp
public static event Action<string, bool> OnLoadCompleted;
```
Fired when a load operation finishes. Passes the target slot name and success boolean.

### `OnActiveSlotChanged`
```csharp
public static event Action<string> OnActiveSlotChanged;
```
Fired when `FuzzySaveManager.ActiveSlot` is reassigned to a new slot name.

### `OnCustomEventTriggered`
```csharp
public static event Action<string> OnCustomEventTriggered;
```
Fired when `TriggerEvent(eventName)` is called, notifying all active `SaveEventRule` listeners.

---

## 3. Data Manipulation API

### `SetData<T>`
```csharp
public static void SetData<T>(string key, T value);
```
Stores or updates a key-value pair in memory.
* **`key`**: Unique string identifier.
* **`value`**: Any primitive, DTO struct, collection, or serializable custom class.

```csharp
FuzzySaveManager.SetData("player_level", 45);
FuzzySaveManager.SetData("player_pos", new Vector3(10f, 0f, -5f));
FuzzySaveManager.SetData("inventory_keys", new List<string> { "SilverKey", "DungeonKey" });
```

### `SetData` (Object Overload)
```csharp
public static void SetData(string key, object value);
```
Non-generic overload for runtime systems operating on `System.Object`.

### `SetRawJson`
```csharp
public static void SetRawJson(string key, string json);
```
Directly injects a pre-formatted JSON string into the target key, bypassing serializer reflection.

### `GetData<T>`
```csharp
public static T GetData<T>(string key, T defaultValue = default);
```
Retrieves a deserialized value from memory. If the key does not exist or deserialization fails, returns `defaultValue`.

```csharp
int level = FuzzySaveManager.GetData<int>("player_level", 1);
Vector3 pos = FuzzySaveManager.GetData<Vector3>("player_pos", Vector3.zero);
```

### `GetData` (Type Overload)
```csharp
public static object GetData(Type type, string key, object defaultValue = null);
```
Reflection-friendly overload returning an unboxed `object`.

### `HasData`
```csharp
public static bool HasData(string key);
```
Returns `true` if the key exists in the active memory container.

### `DeleteData`
```csharp
public static void DeleteData(string key);
```
Removes a specific key and its data from the active container.

---

## 4. Asynchronous Save & Load API

### `SaveAsync`
```csharp
public static async Task<bool> SaveAsync(string slotName = null);
```
Gathers all mapped fields, scene GUID objects, and dynamic spawns on the main thread, then offloads serialization, compression, encryption, atomic disk write, and cloud upload to a background thread.
* **`slotName`**: Target slot name. If `null`, uses `FuzzySaveManager.ActiveSlot`.
* **Returns**: `Task<bool>` (`true` on success, `false` on failure).

### `LoadAsync`
```csharp
public static async Task<bool> LoadAsync(string slotName = null);
```
Loads the specified save slot into memory.
* Checks cloud sync for newer versions according to the conflict policy.
* Falls back to local `.bak` backup if the primary `.sav` file is corrupt.
* Asynchronously offloads decryption and decompression to a background worker.
* Automatically transitions scenes if the save belongs to a different scene.
* Reinstates mapped fields and uses **time-slicing** (`await Task.Yield()`) to instantiate dynamic prefabs and reposition GUID scene objects without FPS drops.

### `SaveGroupAsync`
```csharp
public static async Task<bool> SaveGroupAsync(string groupName, string slotName = null);
```
Selectively persists only the fields and entities belonging to a specific Save Group (e.g., `"Inventory"` or `"WorldState"`).

### `LoadGroupAsync`
```csharp
public static async Task<bool> LoadGroupAsync(string groupName, string slotName = null);
```
Selectively restores only the fields belonging to a specific Save Group.

---

## 5. In-Memory Snapshots & Time-Travel

### `TakeSnapshot`
```csharp
public static void TakeSnapshot(string snapshotId);
```
Captures a deep-copy snapshot of the current state directly in RAM. Bypasses disk I/O completely.

### `RestoreSnapshot`
```csharp
public static void RestoreSnapshot(string snapshotId);
```
Instantly restores the game state from an in-memory snapshot.

---

## 6. Slot & Storage Management

### `SlotExists`
```csharp
public static bool SlotExists(string slotName = null);
```
Returns `true` if the target slot exists on the local physical disk.

### `DeleteSlot`
```csharp
public static void DeleteSlot(string slotName = null);
```
Safely deletes the target `.sav` file from disk.

### `GetAvailableSlots`
```csharp
public static string[] GetAvailableSlots();
```
Scans the save directory and returns an array of all available slot names.

### `GetSlotMetadata`
```csharp
public static SaveSlotMetadata GetSlotMetadata(string slotName = null);
```
Returns a `SaveSlotMetadata` struct containing:
* `slotName` (`string`)
* `exists` (`bool`)
* `lastModifiedUtc` (`DateTime`)
* `sizeBytes` (`long`)
* Helper methods: `GetFormattedDate()`, `GetFormattedTimeOnly()`, `GetFormattedSize()` (e.g., `"42.5 KB"`).

### `ClearAllSlots`
```csharp
public static void ClearAllSlots();
```
Wipes all save files from the project save folder.

### `TriggerEvent`
```csharp
public static void TriggerEvent(string eventName);
```
Fires a custom event string, triggering any matching `SaveEventRule` defined with `SaveEventTriggerType.OnCustomEvent`.
