---
title: "14. Troubleshooting & FAQ"
description: "Feature comparison matrix, mobile storage considerations, common issues, and FAQ."
slug: docs/fuzzysave/best-practices
---

## Comprehensive Comparison Table

| Capability / Feature | Unity `PlayerPrefs` | Standard `JsonUtility` | Generic Save Assets | **FuzzySave** |
|---|---|---|---|---|
| **Main-Thread Performance** | Freezes main thread | Freezes main thread | Partial async or blocking | **Full 3-Phase Async (`Task.Run`), 0ms hitch** |
| **Crash & Power-Cut Safety** | Prone to corruption | Direct writes corrupt easily | Rare atomic write support | **Fail-Safe Atomic Swap (`.tmp` → `.bak` → swap)** |
| **Visual Studio Editor** | None | None | Basic inspector | **Full UI Toolkit Studio (Dashboard, Live JSON)** |
| **Play Mode Cheat / Inject** | None | None | None | **Live Variable Injection & RAM Snapshots** |
| **File Compression** | None | None | Deflate / None | **GZip Byte-Stream (70% - 90% reduction)** |
| **Anti-Cheat & Cryptography** | None | None | XOR / Basic AES | **AES-256-CBC + PBKDF2 Cache + HMAC-SHA256** |
| **Scene Entity Tracking** | None | Manual code required | Limited ID mapping | **Automated `SaveGuid` + Duplicate Resolver** |
| **Dynamic Spawn Persistence** | None | Manual code required | Complex setups | **`DynamicSpawnTracker` + Re-Instantiation** |
| **Destruction / Graveyard** | None | Manual boolean flags | None | **Autonomous `GraveyardRegistry` + Revive** |
| **Cloud Storage** | None | None | Typically 1 vendor | **UGS, Steam, PlayFab, Firebase & REST** |
| **Schema Migrations** | None | None | Custom scripting | **Chained `SaveMigrationManager` (v1→v2→v3)** |
| **Zero-Reflection Code Bake** | Reflection / None | Reflection | Heavy Reflection | **Direct C# Code Emitter (`FuzzySaveGenerated`)** |

---

## Mobile Platform Considerations (iOS & Android)

### 1. Storage Directories
FuzzySave defaults to storing data in:
`Path.Combine(Application.persistentDataPath, FuzzySaveSettings.saveFolderName)`

- **Android:** Maps to `/storage/emulated/0/Android/data/<package_name>/files/FuzzySaveData`. This directory is private to the application and does not require runtime storage permissions on Android 10+ (API 29+ Scoped Storage).
- **iOS:** Maps to `/var/mobile/Containers/Data/Application/<GUID>/Documents/FuzzySaveData`.

### 2. iOS iCloud Backup Flag
Apple's App Store Review Guidelines reject applications that place large temporary or cache files in the `Documents` directory because they are backed up to iCloud. Because FuzzySave files are vital user progression saves, storing them in `Documents` is standard practice. However, if your saves exceed tens of megabytes, enable GZip compression to ensure small footprint compliance.

---

## Troubleshooting Common Issues

### 1. "Duplicate GUID detected! Click 'Regenerate Unique GUID' to resolve"
- **Cause:** A GameObject containing `SaveGuid` was duplicated in the scene hierarchy or copy-pasted across prefabs.
- **Solution:** Select the duplicated object in the Inspector and click **"Regenerate Unique GUID"**. In most cases, `SaveGuid.OnValidate` will automatically resolve this for you.

---

### 2. "Prefab Resource Path is empty!" Warning
- **Cause:** A prefab has `DynamicSpawnTracker` attached, but the `m_PrefabResourcePath` field is empty.
- **Solution:** 
  1. Move the prefab into a `Resources/` folder (e.g., `Assets/.../Resources/Enemies/Goblin.prefab`) and set the path to `"Enemies/Goblin"`.
  2. Or register the prefab directly inside `FuzzySaveSettings.registeredPrefabs`.

---

### 3. CharacterController Snaps Back or Falls Through Floor on Load
- **Cause:** Unity's `CharacterController` or `NavMeshAgent` overrides `transform.position` during its internal physics tick if moved while active.
- **Solution:** Ensure you are using FuzzySave's built-in `TransformDTO.ApplyTo` or that you temporarily disable `CharacterController.enabled = false` before applying loaded coordinates, then re-enable it immediately after.

---

### 4. Cloud Sync Fails with "Provider class not found"
- **Cause:** A cloud provider like UGS Cloud Save or Steam Cloud was selected in settings, but the respective SDK package (e.g., Unity Services Core or Steamworks) is not installed in the project.
- **Solution:** Install the required SDK via Unity Package Manager or switch the provider to `None` / `REST`.

---

## Frequently Asked Questions (FAQ)

#### Q: Does FuzzySave work with IL2CPP and AOT compilation?
**Yes.** All DTO structures, JSON converters, and baked accessors are specifically written to avoid unconstrained reflection and code stripping issues on IL2CPP platforms (Consoles, iOS, WebGL).

#### Q: How can I reset the save data completely for a clean build?
Simply call:
```csharp
FuzzySaveManager.ClearAllSlots();
```
Or in the editor, navigate to **`Tools > FuzzySave > Visual Save Studio > Save Slots`** and click **"Clear All Slots"**.

#### Q: Can I inspect and modify encrypted save files during development?
**Yes.** In **Visual Save Studio > Settings**, you can temporarily toggle off encryption during active development. When ready for release, enable AES-256 encryption and set your production password.

---

## Conclusion

FuzzySave brings enterprise-level reliability, zero-hitch asynchronous performance, and elegant no-code workflows to your Unity game. 

For feature requests, support, or updates, consult **Fuzzy Logic Labs**.
