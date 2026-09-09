---
title: Rendering Optimization & Batching
description: Techniques for aggregating thousands of ropes and chains into minimal draw calls using RopeBatchManager and GPU Instancing.
slug: docs/tensio/advanced/rendering-optimization
---

Rendering hundreds or thousands of individual dynamic ropes in real time can quickly saturate CPU draw-call limits. Tensio provides dedicated batching managers to consolidate geometries into combined draw calls.

---

## 1. Tube Rope Batching (`RopeBatchManager`)

The `RopeBatchManager` merges the dynamic meshes generated across multiple `RopeRenderer` instances into a shared multi-buffer mesh.

### Setup
1. On each `RopeRenderer`, check the **Use Batching** toggle.
2. Ensure the ropes share the exact same **Material** reference.

### How It Operates
* Tensio automatically disables local `MeshRenderer` components on individual ropes.
* A central manager gathers vertex arrays across worker jobs and pushes them into a combined dynamic mesh buffer drawn in a single draw call.

---

## 2. Chain Batching (`RopeChainBatcher`)

For rigid chains, `RopeChainBatcher` leverages hardware **GPU Instancing** (`Graphics.DrawMeshInstanced`) to render thousands of individual links without generating any CPU mesh vertices.

### Requirements
* Enable **Use Batching** on each `RopeChainRenderer`.
* Ropes must share the same **Mesh** and **Material**.
* The material must have **"Enable GPU Instancing"** turned on in the Unity Inspector.

:::note[Hardware Limits]
Standard GPU instancing caps buffers at 1,023 matrices per call. `RopeChainBatcher` transparently handles pagination, dispatching additional batches automatically if your scene exceeds this limit.
:::

---

## 3. Best Practices for Maximum Framerates

1. **Material Atlas Sharing:** Maximize the number of ropes sharing identical materials to ensure batching can merge them.
2. **Combine with LOD:** Pair batching with the **[LOD System](/docs/tensio/advanced/lod-system/)** to automatically downgrade far ropes into inexpensive billboard line renderers.
3. **Shadow Optimization:** Disable shadow casting on thin decorative cables (e.g. distant telephone or suspension wires) to cut shadow-pass draw overhead.
