---
title: Quick Start Guide
description: Step-by-step guide to creating, configuring, and pinning your first physics rope in Unity under 60 seconds.
slug: docs/tensio/quick-start
---

This guide will walk you through setting up a basic interactive physics rope in your scene in under a minute.

<video autoplay loop muted playsinline class="w-full rounded-xl border border-neutral-800 shadow-md my-4">
  <source src="/images/tensio/quick_start_1.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 1. Creating a Rope

### Step 1: Create the Container GameObject

Create an empty GameObject in your scene to act as the rope container:
1. In the Unity Hierarchy, right-click and choose **Create Empty**.
2. Rename the GameObject to `MyRope`.

### Step 2: Add the Physics Controller

With `MyRope` selected in the Hierarchy:
1. In the Inspector, click **Add Component**.
2. Search for and select **`Rope Controller`**.

The `RopeController` component manages the internal XPBD physics simulation, particle arrays, and constraints.

### Step 3: Add a Visual Renderer

The rope needs a renderer component to be visible in the camera view. Choose one of two rendering styles:

* **Option A: Continuous Tube (`Rope Renderer`)**
  * Generates a procedural smooth 3D mesh along the physics particles.
  * Assign a standard Unity material (e.g. `Default-Material` or one of the materials in `Tensio/Demos/Materials`).
* **Option B: Rigid Chain Links (`Rope Chain Renderer`)**
  * Renders individual chain links via GPU instanced batching.
  * Assign a `Link Mesh` (e.g., chain link FBX) and an instancing-enabled `Material`.

:::tip[Quick Renderer Switching]
You can change the **Type** field on the `Rope Controller` inspector between `Elastic` and `Chain`. Tensio will automatically switch the renderer components for you!
:::

### Step 4: Configure Initial Parameters

Under the **Init Settings** foldout in `Rope Controller`:
* **Length:** Set to `10` (meters).
* **Particle Count:** Set to `20` (higher counts create heavier, smoother curves).

### Step 5: Enter Play Mode

Click the **Play** button in Unity. You will see your rope spawn, drape under realistic gravitational acceleration, and settle smoothly!

---

## 2. Pinning the Rope to Anchors

Anchoring ropes to static environmental points or moving Rigidbodies requires just a couple of clicks:

<video autoplay loop muted playsinline class="w-full rounded-xl border border-neutral-800 shadow-md my-4">
  <source src="/images/tensio/quick_start_2.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

1. Select your `MyRope` GameObject in the Hierarchy.
2. In the Scene View, click any control point along the curve (for example, the top point).
3. In the floating **Point Editor** window, check the **"Pinned"** toggle.
4. Drag and drop the target GameObject you wish to attach to into the **Target** field, or click the **Eye Dropper** tool and select the object directly in the 3D scene view.
5. Press **Play**. The top anchor point will remain pinned while the rest of the cable swings dynamically like a pendulum!

:::note[Static vs Dynamic Pinning]
* If the **Target** field is left empty, the particle is pinned to its initial world-space position.
* If assigned to an object with a **Rigidbody**, Tensio automatically establishes **two-way coupling** — the rope pulls the body and the body pulls the rope!
:::

---

## Next Steps

- Learn about all simulation parameters in the **[Rope Controller Deep Dive](/docs/tensio/core-components/rope-controller/)**.
- Configure procedural tube meshes in **[Rope Renderer](/docs/tensio/core-components/rope-renderer/)**.
- Set up GPU-instanced chain links in **[Rope Chain Renderer](/docs/tensio/core-components/rope-chain-renderer/)**.
