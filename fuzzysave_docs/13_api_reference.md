# 13. Complete C# API Reference

## 📚 Overview

The static `FuzzySaveManager` class serves as the primary gateway to all persistence, snapshotting, and slot management routines.

All methods are thread-safe or automatically marshal execution to the appropriate Unity SynchronizationContext.

---

## 🗃️ 1. In-Memory Data Access

### `SetData<T>`
Stores a strongly-typed value in the current in-memory save container.
```csharp
public static void SetData<T>(string key, T value)
```
- **Parameters:**
  - `key` (`string`): Unique identifier for this data entry.
  - `value` (`T`): The value to store (primitives, structs, classes, or collections).
- **Example:**
  ```csharp
  FuzzySaveManager.SetData("player_score", 4500);
  FuzzySaveManager.SetData("checkpoint_pos", (Vector3DTO)transform.position);
  ```

---

### `GetData<T>`
Retrieves a strongly-typed value from the current in-memory save container.
```csharp
public static T GetData<T>(string key, T defaultValue = default)
```
- **Parameters:**
  - `key` (`string`): The identifier of the data entry to retrieve.
  - `defaultValue` (`T`): Fallback value returned if the key does not exist.
- **Returns:** The deserialized value or `defaultValue`.
- **Example:**
  ```csharp
  int score = FuzzySaveManager.GetData<int>("player_score", defaultValue: 0);
  ```

---

### `SetRawJson`
Directly stores a pre-serialized JSON string without double-serializing.
```csharp
public static void SetRawJson(string key, string json)
```

---

### `HasData` & `DeleteData`
```csharp
public static bool HasData(string key)
public static void DeleteData(string key)
```
- **Example:**
  ```csharp
  if (FuzzySaveManager.HasData("quest_boss_slain"))
  {
      FuzzySaveManager.DeleteData("quest_boss_slain");
  }
  ```

---

## 💾 2. Asynchronous Save & Load Pipeline

### `SaveAsync`
Asynchronously serializes and writes the current game state to local disk (and triggers cloud upload if enabled).
```csharp
public static Task<bool> SaveAsync(string slotName = null)
```
- **Parameters:**
  - `slotName` (`string`, optional): Target slot filename. If null or omitted, saves to `FuzzySaveManager.ActiveSlot`.
- **Returns:** `Task<bool>` resolving to `true` if save succeeded; otherwise `false`.
- **Example:**
  ```csharp
  bool saved = await FuzzySaveManager.SaveAsync("slot_campaign_1");
  ```

---

### `LoadAsync`
Asynchronously reads and restores the game state from disk, reconstructing entities, applying variables, and handling cross-scene transitions if necessary.
```csharp
public static Task<bool> LoadAsync(string slotName = null)
```
- **Parameters:**
  - `slotName` (`string`, optional): Target slot filename to read. Defaults to `ActiveSlot`.
- **Returns:** `Task<bool>` resolving to `true` if load and restoration succeeded.
- **Example:**
  ```csharp
  bool loaded = await FuzzySaveManager.LoadAsync("slot_campaign_1");
  ```

---

### `SaveGroupAsync` & `LoadGroupAsync`
Selectively saves or loads a specific Save Group instead of serializing the entire scene.
```csharp
public static Task<bool> SaveGroupAsync(string groupName, string slotName = null)
public static Task<bool> LoadGroupAsync(string groupName, string slotName = null)
```
- **Example:**
  ```csharp
  // Save only inventory items without saving enemy or world positions:
  await FuzzySaveManager.SaveGroupAsync("InventoryGroup");
  ```

---

## ⚡ 3. RAM Snapshots (Time-Travel)

### `TakeSnapshot`
Captures the entire active memory container into high-speed RAM.
```csharp
public static void TakeSnapshot(string snapshotId)
```

### `RestoreSnapshot`
Restores game state from an in-memory snapshot within `< 1ms` without disk I/O.
```csharp
public static void RestoreSnapshot(string snapshotId)
```
- **Example:**
  ```csharp
  // Before boss encounter:
  FuzzySaveManager.TakeSnapshot("boss_room_checkpoint");

  // On player death:
  FuzzySaveManager.RestoreSnapshot("boss_room_checkpoint");
  ```

---

## 🗄️ 4. Slot & Companion Metadata

### `ActiveSlot`
Property to get or set the default active slot filename.
```csharp
public static string ActiveSlot { get; set; } // Default: "DefaultSlot"
```

### `SlotExists` & `DeleteSlot`
```csharp
public static bool SlotExists(string slotName = null)
public static void DeleteSlot(string slotName = null)
public static void ClearAllSlots()
public static string[] GetAvailableSlots()
```

### `GetSlotMetadataAsync` & `GetAllSlotMetadataAsync`
Reads companion `.meta` files without loading multi-megabyte save payloads.
```csharp
public static Task<SaveSlotMetadata> GetSlotMetadataAsync(string slotName = null)
public static Task<List<SaveSlotMetadata>> GetAllSlotMetadataAsync()
```

### `SetSlotSummaryValue` & `GetSlotSummaryValue`
```csharp
public static void SetSlotSummaryValue(string key, string value)
public static string GetSlotSummaryValue(string key)
```
- **Example:**
  ```csharp
  FuzzySaveManager.SetSlotSummaryValue("difficulty", "Hardcore");
  FuzzySaveManager.SetSlotSummaryValue("level", "45");
  ```

---

## 📸 5. GPU Thumbnail Screen Capture

### `CaptureThumbnailBase64Async`
Asynchronously captures the current frame buffer via `AsyncGPUReadback` and encodes it to a Base64 JPEG string.
```csharp
public static Task<string> CaptureThumbnailBase64Async(int width = 240, int height = 135, int quality = 70)
```

---

## 🪦 6. Graveyard & Destruction Tracking

```csharp
// Destroy GameObject and register GUID to prevent respawning on reload:
public static void Destroy(GameObject go, float t = 0f)
public static void Destroy(SaveGuid saveGuid)

// Query if a GUID is destroyed:
public static bool IsDestroyed(string guid)

// Revive a destroyed entity:
public static void Revive(string guid)

// Clear all graveyard records:
public static void ClearGraveyard()
public static List<string> GetDestroyedGuids()
```

---

## 📊 7. Diagnostics & Profiling Properties

```csharp
// Duration of Main Thread gathering during last save (ms)
public static float LastSaveMainThreadGatherMs { get; }

// Duration of Background Worker Thread I/O during last save (ms)
public static float LastSaveWorkerDurationMs { get; }

// State flags
public static bool IsSaving { get; }
public static bool IsLoading { get; }
public static bool IsBusy { get; }

// Total cumulative playtime in seconds
public static float TotalPlaytimeSeconds { get; }
```

---

## 🔔 8. Global Events & Delegates

```csharp
public static event Action<string> OnSaveStarted;
public static event Action<string, bool> OnSaveCompleted;
public static event Action<string> OnLoadStarted;
public static event Action<string, bool> OnLoadCompleted;
public static event Action<string> OnActiveSlotChanged;
public static event Action<string> OnCustomEventTriggered;

// Manually fire a custom event rule:
public static void TriggerEvent(string eventName)
```

---

## 🧭 Next Chapter

Proceed to [14. Troubleshooting & FAQ](14_troubleshooting_faq.md) for benchmark comparisons, mobile storage considerations, and common questions.
