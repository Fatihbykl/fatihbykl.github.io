---
title: "DTOs & Zero-Allocation Serialization"
description: "Lightweight, serializable structs for Unity types without GC allocations or payload bloat."
slug: docs/fuzzysave/dto-serialization
---

## 1. Why DTOs (Data Transfer Objects)?

In standard Unity serialization pipelines, developers often attempt to serialize native Unity structs (`Vector3`, `Quaternion`, `Color`) directly with standard JSON libraries. This introduces multiple performance and stability penalties:
1. **Garbage Collection (GC) Overhead:** Serializers relying on reflection allocate boxed objects on the managed heap, triggering garbage collection hitches.
2. **Verbose JSON Payload:** Native Unity types frequently contain internal properties (`normalized`, `magnitude`, `sqrMagnitude`, `eulerAngles`) that bloat the serialized file by up to 400%.
3. **Circular Reference Risks:** Complex Unity objects can trigger infinite recursion exceptions in third-party serializers.

FuzzySave addresses this with a dedicated library of lightweight, serializable structs located in `DTOs.cs`.

---

## 2. The DTO Struct Suite

Every DTO is declared as a `[Serializable]` C# `struct` (value type) containing only primitive numerical fields.

### 2.1 Supported Mathematical & Geometric DTOs

| DTO Type | Corresponding Unity Type | Underlying Fields | Implicit Casting |
|---|---|---|---|
| **`Vector2DTO`** | `UnityEngine.Vector2` | `float x, y` | Yes (Bidirectional) |
| **`Vector3DTO`** | `UnityEngine.Vector3` | `float x, y, z` | Yes (Bidirectional) |
| **`Vector4DTO`** | `UnityEngine.Vector4` | `float x, y, z, w` | Yes (Bidirectional) |
| **`QuaternionDTO`**| `UnityEngine.Quaternion` | `float x, y, z, w` | Yes (Bidirectional) |
| **`ColorDTO`** | `UnityEngine.Color` | `float r, g, b, a` | Yes (Bidirectional) |
| **`Color32DTO`** | `UnityEngine.Color32` | `byte r, g, b, a` | Yes (Bidirectional) |
| **`RectDTO`** | `UnityEngine.Rect` | `float x, y, width, height` | Yes (Bidirectional) |
| **`BoundsDTO`** | `UnityEngine.Bounds` | `Vector3DTO center, size` | Yes (Bidirectional) |

---

## 3. Seamless Implicit Conversions

All FuzzySave DTO structs implement C# **implicit operator conversions**. Developers can assign native Unity types directly to DTO fields—and vice versa—without explicit cast syntax or memory allocation:

```csharp
// Assigning native Vector3 directly to Vector3DTO
Vector3DTO savedPos = transform.position; 

// Assigning Vector3DTO directly back to native Vector3
Vector3 livePos = savedPos; 

// Same seamless syntax for Colors and Quaternions
ColorDTO playerColor = Color.cyan;
Color nativeColor = playerColor;
```

---

## 4. `TransformDTO` & Physics Controller Safeguards

Persisting a GameObject’s complete transform state requires tracking position, rotation, scale, and active state simultaneously. `TransformDTO` wraps these into a single compact structure:

```csharp
[Serializable]
public struct TransformDTO
{
    public Vector3DTO position;
    public QuaternionDTO rotation;
    public Vector3DTO localScale;
    public bool activeSelf;
}
```

### The `CharacterController` & `NavMeshAgent` Teleport Problem

In Unity, directly modifying `transform.position` on a GameObject with an active `CharacterController` or `NavMeshAgent` is notoriously error-prone:
* The `CharacterController` will often reject the position change or cause rubber-banding physics glitches.
* The `NavMeshAgent` will log errors regarding position mismatch or attempt to pathfind backwards to the previous coordinate.

`TransformDTO.ApplyTo` solves this automatically:

```csharp
public void ApplyTo(Transform transform, SaveFlags flags = SaveFlags.All)
{
    if (transform == null) return;

    if (flags.HasFlag(SaveFlags.Position))
    {
        var cc = transform.GetComponent<UnityEngine.CharacterController>();
        var agent = transform.GetComponent<UnityEngine.AI.NavMeshAgent>();
        
        // 1. Temporarily disable physics/navmesh controllers
        if (cc != null) cc.enabled = false;
        if (agent != null) agent.enabled = false;
        
        // 2. Safely apply position matrix
        transform.position = position;
        
        // 3. Re-enable controllers cleanly at the new destination
        if (cc != null) cc.enabled = true;
        if (agent != null) agent.enabled = true;
    }

    if (flags.HasFlag(SaveFlags.Rotation))
        transform.rotation = rotation;

    if (flags.HasFlag(SaveFlags.Scale))
        transform.localScale = localScale;

    if (flags.HasFlag(SaveFlags.ActiveState))
        transform.gameObject.SetActive(activeSelf);
}
```
This guarantees that character controllers, AI agents, and physics objects can be loaded into new coordinates reliably.
