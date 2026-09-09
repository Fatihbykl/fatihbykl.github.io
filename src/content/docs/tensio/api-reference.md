---
title: Tensio — C# Scripting API Reference
description: Complete public API reference, namespace definitions, lifecycle hooks, and code examples for Tensio.
slug: docs/tensio/api-reference
---

This page provides the complete technical API specification for core Tensio classes, native memory buffers, and simulation hooks under the `Tensio` (and `FuzzyLogicLabs.Tensio`) namespace.

---

## 1. `RopeController`

The primary simulation controller and interface for runtime rope manipulation.

```csharp
namespace Tensio
{
    public class RopeController : MonoBehaviour
}
```

### Public Properties

| Property | Type | Access | Description |
| :--- | :--- | :--- | :--- |
| `InitSettings` | `RopeInitSettings` | get / set | Configuration structure for initialization (Length, ParticleCount, Type). |
| `PhysicsSettings` | `RopePhysicsSettings` | get / set | Runtime physics properties (Gravity, Compliance, Friction, Mass, Substeps). |
| `AeroSettings` | `AerodynamicsSettings`| get / set | Wind vector, turbulence, and air drag coefficients. |
| `CurrentLength` | `float` | get | Target resting length in meters. |
| `CurrentStressRatio` | `float` | get | Current elongated length divided by resting length (`> 1.0` indicates tension). |
| `AverageVelocity` | `float` | get | Magnitude of average velocity across all particles. |
| `ParticleCount` | `int` | get | Total number of simulation particles. |
| `Positions` | `NativeArray<float3>` | get | Direct read-only access to unmanaged particle position buffer. |
| `Velocities` | `NativeArray<float3>` | get | Direct access to unmanaged particle velocity buffer. |

### Public Methods

#### `void InitializeRope()`
Rebuilds the internal XPBD solver buffers and constraints based on the current `InitSettings`. Call this after altering `ParticleCount` or `Type` at runtime.

#### `void PinParticle(int index, Transform target, Vector3 worldPos)`
Anchors particle at `index` to the specified `target` transform.
* `index`: Particle index (`0` for start, `ParticleCount - 1` for end).
* `target`: GameObject transform to pin to.
* `worldPos`: World position at attachment time (calculates local offset automatically).

#### `void SetCurrentLength(float length)`
Dynamically modifies the resting length of the cable. Used extensively for winching and grapple reeling.

#### `void Split(int segmentIndex, float segmentFraction)`
Slices the rope at the given segment, spawning an independent second `RopeController` GameObject.
* `segmentIndex`: The segment index to sever (`0` to `ParticleCount - 2`).
* `segmentFraction`: Position along segment (`0.0` to `1.0`).

#### `bool Raycast(Ray ray, out float hitDistance, out int segmentIndex, out float segmentFraction)`
Performs an analytical ray intersection test against the simulated rope particles.

#### `void SetParticlePosition(int index, Vector3 position)`
Teleports a particle to a specific position and zeroes out its velocity vector.

### Events

```csharp
// Fired when particle undergoes high-energy collision impact
public event Action<Vector3, float> OnCollisionImpulse;

// Fired when the rope is severed via Split() or tensile snapping
public event Action OnRopeCut;
```

---

## 2. `RopeRenderer`

Handles procedural Catmull-Rom tube mesh generation.

```csharp
namespace Tensio
{
    [RequireComponent(typeof(MeshFilter), typeof(MeshRenderer))]
    public class RopeRenderer : MonoBehaviour
}
```

### Public Properties & Buffer Access

| Member | Type | Description |
| :--- | :--- | :--- |
| `Radius` | `float` | Cross-sectional tube radius in meters. |
| `UVOffset` | `float` | Longitudinal texture offset coordinate for animation. |
| `TextureTiling` | `float` | UV repetitions per linear meter. |
| `VertexCount` | `int` | Total vertices in active procedural mesh buffer. |
| `IndexCount` | `int` | Total triangle indices in active mesh buffer. |

#### Buffer Methods
* `NativeArray<RopeVertex> GetVertices()`: Returns raw unmanaged vertex buffer (Position, Normal, UV).
* `NativeArray<ushort> GetIndices()`: Returns raw triangle index buffer.

---

## 3. `RopeChainRenderer`

Manages GPU-instanced rigid chain meshes.

```csharp
namespace Tensio
{
    public class RopeChainRenderer : MonoBehaviour
}
```

### Properties
* `LinkSpacing` (`float`): Center-to-center spacing between chain links.
* `LinkOffset` (`float`): Linear shift of link patterns along the spline.
* `AlternatingRotation` (`bool`): Enables 90-degree alternation for links.

---

## 4. `RopeInteractionManager`

Global singleton coordinating inter-rope spatial hash collisions.

```csharp
namespace Tensio
{
    public class RopeInteractionManager : MonoBehaviour
    {
        public static RopeInteractionManager Instance { get; }
        public float CellSize { get; set; }
        public void Register(RopeController rope);
        public void Unregister(RopeController rope);
    }
}
```

---

## 5. `RopeLODController`

Level of Detail manager based on Unity `CullingGroup`.

```csharp
namespace Tensio
{
    public class RopeLODController : MonoBehaviour
    {
        public int CurrentLOD { get; } // 0 = Mesh, 1 = Line, 2 = Culled, 3 = Suspended
        public float CurrentDistance { get; }
        public string DebugStatus { get; }
    }
}
```

---

## 6. Complete Scripting Example

A C# component showing how to monitor rope stress and trigger emergency brakes:

```csharp
using UnityEngine;
using Tensio;

public class ElevatorSafetySystem : MonoBehaviour
{
    [SerializeField] private RopeController cable;
    [SerializeField] private float maxSafeStressRatio = 1.25f; // 25% stretch max

    private void OnEnable()
    {
        if (cable != null)
        {
            cable.OnRopeCut += HandleCableSnapped;
            cable.OnCollisionImpulse += HandleHardImpact;
        }
    }

    private void OnDisable()
    {
        if (cable != null)
        {
            cable.OnRopeCut -= HandleCableSnapped;
            cable.OnCollisionImpulse -= HandleHardImpact;
        }
    }

    private void Update()
    {
        if (cable == null) return;

        // Monitor real-time tensile strain
        if (cable.CurrentStressRatio > maxSafeStressRatio)
        {
            Debug.LogWarning($"[Elevator] Critical cable stress: {cable.CurrentStressRatio:F2}x! Engaging hydraulic brakes.");
        }
    }

    private void HandleCableSnapped()
    {
        Debug.LogError("[Elevator] CABLE SEVERED! Deploying emergency clamp system.");
    }

    private void HandleHardImpact(Vector3 contactPoint, float impulseMagnitude)
    {
        Debug.Log($"[Elevator] Cable struck object at {contactPoint} with force {impulseMagnitude} N.");
    }
}
```
