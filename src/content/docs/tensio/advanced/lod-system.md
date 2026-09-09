---
title: Dynamic Level of Detail (LOD) System
description: Performance scaling via camera distance culling, procedural mesh to billboard line substitution, and physics suspension.
slug: docs/tensio/advanced/lod-system
---

Tensio features an intelligent Level of Detail (LOD) subsystem designed to maximize frame budgets in open-world games and large-scale architectural environments. The system is managed by the `RopeLODController`.

<video autoplay loop muted playsinline class="w-full rounded-xl border border-neutral-800 shadow-md my-4">
  <source src="/images/tensio/lod.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## How the LOD System Works

`RopeLODController` hooks into Unity's high-performance native `CullingGroup` API. It continuously evaluates camera distance and viewport visibility without incurring any GameObject raycasts:

* **LOD 0 — High Quality (Close Range, e.g. 0 – 10m):**
  * **Visuals:** Full 3D procedural tube mesh generated via `RopeRenderer`.
  * **Physics:** Full simulation fidelity (`Substeps = 8+`).
* **LOD 1 — Medium Quality (Mid Range, e.g. 10 – 40m):**
  * **Visuals:** Replaces heavy 3D geometry with an efficient 2D billboard `LineRenderer`.
  * **Physics:** Reduced simulation fidelity (`Substeps = 4`). Skips procedural mesh generation entirely.
* **LOD 2 — Off-Screen / Distant (Far Range, > 40m):**
  * **Visuals:** Completely culled (renderers disabled).
  * **Physics:** Minimal maintenance simulation (`Substeps = 1`) to preserve resting shape.
* **LOD 3 — Suspended (> 100m):**
  * Physics solver suspended entirely until the player re-enters the active bounding sphere.

---

## Component Configuration

Attach `RopeLODController` to the same GameObject hosting `RopeController`:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **High Quality Renderer** | `RopeRenderer` | Auto | Reference to the primary 3D tube renderer. |
| **Low Quality Renderer** | `LineRenderer` | Auto | Reference to the lightweight line renderer (auto-instantiated if empty). |
| **Distance Mesh To Line** | `float` | `15.0` | Distance in meters where 3D mesh transitions to 2D line. |
| **Distance Line To Cull** | `float` | `45.0` | Distance where visual rendering is disabled completely. |
| **Distance Suspend Physics**| `float` | `100.0` | Distance where physics updates stop. |
| **LOD Substeps** | `Vector3Int` | `(8, 4, 1)` | Physics iteration budgets assigned per respective LOD tier. |

:::tip[Performance Impact]
In benchmarks with 250+ simultaneous ropes, enabling `RopeLODController` delivers up to a **400% framerate boost** by bypassing tube mesh reconstruction on distant elements.
:::
