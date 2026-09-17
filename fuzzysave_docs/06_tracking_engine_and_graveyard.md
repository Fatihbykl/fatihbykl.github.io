# 06. Tracking Engine, Dynamic Spawns & Graveyard

## 📍 Overview

Saving a game involves more than just storing isolated variables; it requires preserving the spatial state and existence of game entities:
1. **Static Scene Objects:** Objects placed in the scene at build time (e.g., doors, chests, levers).
2. **Dynamic Runtime Entities:** Objects spawned dynamically via `Instantiate` (e.g., dropped loot, spawned enemies).
3. **Destroyed Entities (The Graveyard):** Scene objects that were killed, consumed, or destroyed and must **not** respawn when reloading.

FuzzySave handles all three scenarios with zero runtime boilerplate.

---

## 🏷️ 1. Static Scene Entities: `SaveGuid`

The `SaveGuid` component should be attached to any GameObject in your scene hierarchy whose transform, physics, or active state must be persisted.

```csharp
using UnityEngine;
using FuzzyLogicLabs.FuzzySave;

[RequireComponent(typeof(SaveGuid))]
public class TreasureChest : MonoBehaviour
{
    // SaveGuid handles position, rotation, and active state automatically!
}
```

### Key Features:
- **Automatic GUID Generation:** Upon being added to a GameObject, `SaveGuid` generates a unique string identifier (`System.Guid.NewGuid()`).
- **Duplicate Detection:** If a designer duplicates a GameObject or pastes a prefab in the scene, `SaveGuid.OnValidate` detects identical IDs across the scene and automatically generates a fresh GUID.
- **Save Flags (`SaveFlags`):** Granularly toggle what data to capture:
  - `Position`: World coordinates.
  - `Rotation`: World rotation quaternion.
  - `Scale`: Local transform scale.
  - `ActiveState`: `gameObject.activeSelf`.
  - `RigidbodyState`: Velocity and angular velocity.
  - `CustomState`: Custom serialized JSON payload.
  - `All`: Enables all flags.
- **Position Threshold (`m_PositionThreshold`):** Skips writing delta transform updates if the object moved less than the threshold (e.g., `0.001f`), saving memory and CPU cycles.
- **Unity 6 Compatibility:** Automatically adapts to Unity 6's updated physics APIs using `#if UNITY_6000_0_OR_NEWER` (`rb.linearVelocity` vs `rb.velocity`).

---

## 💥 2. Dynamic Runtime Spawns: `DynamicSpawnTracker`

Objects spawned at runtime (such as projectiles, floating crystals, or summoned monsters) do not exist in the scene hierarchy when the scene starts. 

To make them persistent:
1. Attach `DynamicSpawnTracker` to your prefab.
2. Provide the prefab lookup path via:
   - **Resources Folder:** Relative path in `m_PrefabResourcePath` (e.g., `"Prefabs/LootCrystal"`).
   - **Settings Registry:** Direct asset reference in `FuzzySaveSettings.registeredPrefabs`.

```
Player spawns loot ➔ DynamicSpawnTracker assigns Instance GUID
                        │
                        ▼ (Game Saved)
           Prefab Path + Position + Velocity saved to SaveContainer
                        │
                        ▼ (Game Reloaded)
       Old runtime instances destroyed ➔ Fresh prefabs instantiated
           at saved positions with identical velocities and IDs
```

---

## 🪦 3. The Graveyard Registry (Destruction Tracking)

### The Problem:
If a player opens and destroys a treasure chest in the scene and then saves, reloading the scene will cause Unity to instantiate the default scene hierarchy—bringing the destroyed chest back from the dead!

### The FuzzySave Solution:
FuzzySave includes an automated **Graveyard Tracking Registry**:
- Whenever an object with a `SaveGuid` is destroyed, its GUID is registered in `GraveyardRegistry`.
- Destructions are captured automatically via `SaveGuid.OnDestroy()` or explicitly via `FuzzySaveManager.Destroy(gameObject)`.
- When loading a save slot, FuzzySave inspects the `destroyedGuids` list and automatically purges or deactivates those entities before the player sees them.

```csharp
// Recommended method to destroy persistent objects:
FuzzySaveManager.Destroy(enemyGameObject);

// Check if an entity is recorded as destroyed:
bool isDead = FuzzySaveManager.IsDestroyed("chest_room_3_guid");

// Revive an entity (e.g., respawning a boss or resetting a dungeon):
FuzzySaveManager.Revive("chest_room_3_guid");

// Clear all destruction records:
FuzzySaveManager.ClearGraveyard();
```

### Graveyard Actions:
Configurable via `SaveGuid.GraveyardAction` or `FuzzySaveSettings.defaultGraveyardAction`:
- **`Destroy`**: Completely removes the GameObject from memory (`UnityEngine.Object.Destroy`).
- **`Deactivate`**: Keeps the GameObject intact but sets `gameObject.SetActive(false)`.

---

## 🧱 4. Zero-Allocation DTO Architecture

Serializing native Unity classes directly creates reference loops and heavy GC garbage. FuzzySave uses stack-allocated DTO (Data Transfer Object) structs:

| Unity Type | FuzzySave DTO | Conversion Syntax |
|---|---|---|
| `Vector2`, `Vector3`, `Vector4` | `Vector2DTO`, `Vector3DTO`, `Vector4DTO` | `Vector3DTO dto = transform.position;` (Implicit) |
| `Quaternion` | `QuaternionDTO` | `QuaternionDTO rot = transform.rotation;` (Implicit) |
| `Color`, `Color32` | `ColorDTO`, `Color32DTO` | `ColorDTO c = myColor;` (Implicit) |
| `Rect`, `Bounds` | `RectDTO`, `BoundsDTO` | `RectDTO r = myRect;` (Implicit) |
| `Transform` + Physics | `TransformDTO` | Encapsulates pos, rot, scale, active, and velocities |

### CharacterController & NavMeshAgent Safety
Applying positions directly to a `Transform` while a `CharacterController` or `NavMeshAgent` is active can cause physics stutter or immediate position snapbacks. `TransformDTO.ApplyTo` handles this safely:

```csharp
// Excerpt from DTOs.cs (TransformDTO.ApplyTo)
var cc = go.GetComponent<CharacterController>();
var agent = go.GetComponent<UnityEngine.AI.NavMeshAgent>();

// Temporarily disable controllers before applying position
if (cc != null) cc.enabled = false;
if (agent != null) agent.enabled = false;

transform.position = position;
transform.rotation = rotation;

if (cc != null) cc.enabled = true;
if (agent != null) agent.enabled = true;
```

---

## 🔄 5. CodeRewriter Tool

Found in `Editor/CodeMod/CodeRewriter.cs`, the `CodeRewriter` is an editor utility that uses regular expressions to convert standard Unity math types in your C# scripts to FuzzySave DTOs (and vice-versa) with a single click, ensuring compile-time type safety for custom serialization pipelines.

---

## 🧭 Next Chapter

Proceed to [07. No-Code Runtime Components](07_no_code_components.md) to explore the ready-to-use checkpoint zones, rolling autosave managers, and UI bindings.
