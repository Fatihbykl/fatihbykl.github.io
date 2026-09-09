---
title: Rope Chain Renderer
description: GPU-instanced rigid mesh chain renderer with alternating link rotations and twist minimization.
slug: docs/tensio/core-components/rope-chain-renderer
---

The `RopeChainRenderer` visualizes the rope as a succession of rigid geometric links rather than a continuous flexible tube. This component is specifically designed for industrial chains, nautical anchor cables, suspension bridge links, and decorative necklaces.

<video autoplay loop muted playsinline class="w-full rounded-xl border border-neutral-800 shadow-md my-4">
  <source src="/images/tensio/chain_renderer.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Usage

Attach `RopeChainRenderer` to a GameObject possessing a `RopeController` (or switch `Type` to `Chain` on the controller). Rendering uses GPU Instancing (`Graphics.DrawMeshInstanced`) for ultra-high throughput without CPU mesh regeneration.

---

## Parameter Reference

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Link Mesh** | `Mesh` | `ChainLink` | 3D mesh asset representing a single link element (e.g. torus or oval ring). |
| **Link Material** | `Material` | `ChainMat` | Material assigned to links. **Must have "Enable GPU Instancing" checked**. |
| **Link Spacing** | `float` | `0.3` | Center-to-center distance between successive links along the spline. |
| **Link Scale** | `Vector3` | `(1, 1, 1)` | Uniform or non-uniform scaling multiplier applied to the link mesh. |
| **Alternating Rotation** | `bool` | `true` | Rotates alternate links by 90 degrees around the forward axis for classic chain topology. |
| **Link Offset** | `float` | `0.0` | Slides the link pattern along the spline. Essential for animating chains sliding through pulleys. |
| **Use Batching** | `bool` | `false` | Registers with `RopeChainBatcher` to draw all compatible scene chains in a single GPU draw call. |

---

## Algorithmic Features

### 1. Twist Minimization (Temporal Coherence)

As ropes loop, twist, or whip through 3D space, standard parallel-transport frames can experience sudden 180-degree flips. Tensio implements continuous temporal coherence tracking to ensure chain links remain oriented predictably without chaotic spinning.

### 2. Dynamic Link Allocation

When ropes extend or retract (e.g. via winches or grappling hooks), `RopeChainRenderer` calculates required link counts dynamically and resizes instanced matrix buffers on the fly without GC allocations.
