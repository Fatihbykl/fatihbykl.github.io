---
title: Rope Renderer
description: Procedural 3D tube mesh generation along Catmull-Rom splines with dynamic UV tiling and stress feedback.
slug: docs/tensio/core-components/rope-renderer
---

The `RopeRenderer` component translates raw physics particle positions into a smooth, continuous 3D tube mesh in real time. It interpolates physics points using Catmull-Rom splines and constructs procedural geometry per frame with zero GC allocation.

<video autoplay loop muted playsinline class="w-full rounded-xl border border-neutral-800 shadow-md my-4">
  <source src="/images/tensio/rope_renderer.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Usage

Attach `RopeRenderer` to the same GameObject hosting your `RopeController`. It automatically requires and manages a standard Unity `MeshFilter` and `MeshRenderer`.

---

## Parameter Reference

### 1. Mesh Settings

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Radius** | `float` | `0.05` | Cross-sectional radius (thickness) of the tube in world meters. |
| **Tube Segments** | `int` | `8` | Radial resolution (e.g., `8` vertices forms an octagonal cylinder). Lower values optimize rendering performance. |
| **Mesh Resolution** | `int` | `4` | Longitudinal subdivisions inserted between consecutive physics particles to produce smooth spline curvature. |
| **Close Ends** | `bool` | `true` | Generates geometric end caps on both rope terminals. Uncheck if ends are tucked inside pulleys or anchors. |
| **Use Batching** | `bool` | `false` | Enables global draw-call aggregation via `RopeBatchManager`. Automatically delegates rendering to the shared batch buffer. |

:::caution[Batching Note]
Enabling **Use Batching** routes vertex data to the shared `RopeBatchManager` to combine draw calls. When active, the local `MeshRenderer` is temporarily disabled.
:::

---

### 2. Texture & UV Settings

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Texture Tiling** | `float` | `2.0` | UV coordinate repetitions per meter of rope length. |
| **UV Offset** | `float` | `0.0` | Shifts the longitudinal V coordinate along the length. Ideal for winching or conveyor belt motion effects. |

---

### 3. Material Assignment

Assign any standard Unity Material supporting URP, HDRP, or Built-in pipelines. Tensio outputs clean Normals, Tangents, and UV0 channels compatible with PBR surface shaders, normal maps, and roughness maps.

---

## Dynamic Stress Feedback

When **Visualize Stretch** is active on the parent `RopeController`, the renderer provides immediate physical feedback:

1. **Mesh Thinning:** Procedurally contracts the tube radius as tensile elongation increases according to Poisson's ratio.
2. **Color Tinting:** Blends material color (via `_BaseColor` or `_Color` shader properties) toward a designated warning tint (e.g. orange/red) as stress approaches breaking point.
