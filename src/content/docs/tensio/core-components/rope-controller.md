---
title: Rope Controller
description: Complete specification of RopeController parameters, physics settings, aerodynamics, and anchor constraints.
slug: docs/tensio/core-components/rope-controller
---

The `RopeController` is the core architectural component in Tensio. It bridges the Unity scene hierarchy and GameObject transforms with the underlying multi-threaded XPBD physics solver. Every simulated rope requires exactly one `RopeController`.

---

## Component Architecture

When attached to a GameObject, `RopeController` orchestrates:
* **Physics Simulation Loop:** Scheduling and dispatching Burst-compiled distance, bending, and collision jobs.
* **Pinning Constraints:** Enforcing spatial anchor attachments against static positions or dynamic `Rigidbody` instances.
* **Collision Detection:** Raycasting/SphereCasting against layer masks or registering with analytical proxy colliders.
* **Curve Generation:** Managing control points and tangents for spline interpolation.

---

## Inspector Parameter Reference

### 1. Init Settings

These parameters define the base topological and geometric structure of the rope. Modifying these properties requires calling `InitializeRope()` or restarting Play Mode:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Type** | `RopeType` | `Elastic` | Chooses simulation and rendering archetype: `Elastic` (continuous tube) or `Chain` (instanced links). |
| **Particle Count** | `int` | `20` | Resolution of the simulation (`2` to `200`). Higher counts produce smoother curves with slightly higher CPU cost. |
| **Length** | `float` | `10.0` | Total resting length of the rope in meters. |
| **Loop** | `bool` | `false` | When enabled, connects the final particle back to the first, creating a closed loop (rubber band / ring). |

---

### 2. Physics Settings

Runtime parameters that govern physical behavior. These can be adjusted live in the Inspector or modified dynamically via C# scripts during gameplay:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Gravity** | `Vector3` | `(0, -9.81, 0)` | Directional gravitational acceleration vector applied to all particles. |
| **Sub Steps** | `int` | `8` | Solver iterations per fixed physics frame (`1` to `30`). Higher values yield stiffer, ultra-stable constraints. |
| **Compliance** | `float` | `0.0` | Inverse physical stiffness. `0.0` simulates inextensible steel cable; higher values create stretchy bungee cords. |
| **Friction** | `float` | `0.3` | Surface friction coefficient from `0.0` (frictionless ice) to `1.0` (high drag). |
| **Particle Radius** | `float` | `0.1` | Collision thickness radius around each simulated particle point. |
| **Particle Mass** | `float` | `1.0` | Individual particle mass in kilograms. |
| **Break On Stretch**| `bool` | `false` | Enables realistic tensile snapping when elongated past the safety threshold. |
| **Max Stretch Ratio**| `float` | `1.3` | Stretch multiplier at which snapping triggers (e.g. `1.3` represents 30% elongation). |
| **Collision Mask** | `LayerMask` | `Default` | Standard Unity LayerMask defining objects the rope collides with via World SphereCast. |
| **Support Inter-Rope**| `bool` | `false` | Enables mutual collisions with other ropes via `RopeInteractionManager`. |
| **Visualize Stretch**| `bool` | `true` | Dynamically modulates renderer thickness or color under tension. |

---

### 3. Aerodynamics Settings

Simulates environmental wind forces, air turbulence, and atmospheric drag:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Wind Direction** | `Vector3` | `(1, 0, 0)` | Vector direction of atmospheric wind flow. |
| **Wind Speed** | `float` | `0.0` | Base velocity force applied along the wind vector. |
| **Turbulence Strength** | `float` | `0.5` | Amplitude of procedural Perlin noise injected into the wind stream. |
| **Air Drag** | `float` | `0.05` | Atmospheric movement resistance. Higher values simulate underwater drag or viscous fluids. |

---

### 4. Pin Constraints

Anchors specific points of the rope to coordinates or GameObjects:

* **Particle Index:** Which simulation particle is locked (`0` = start of rope, `Count - 1` = end of rope).
* **Target:** Target `Transform` to track. If assigned to an object with a `Rigidbody`, forces are transferred bi-directionally.
* **Offset:** Local position offset from the target transform's pivot.
