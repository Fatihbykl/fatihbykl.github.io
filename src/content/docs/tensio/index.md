---
title: Tensio — High-Performance DOTS Rope & Chain Physics
description: Production-ready XPBD tension, rope, cable, and chain simulation library built for Unity with Job System and Burst Compiler.
slug: docs/tensio
---

**Tensio** is a high-performance, physics-based rope and chain simulation framework engineered specifically for the Unity game engine. Built on **Extended Position Based Dynamics (XPBD)**, Tensio delivers rock-solid, physically accurate, and interactive flexible-body simulations suitable for everything from indie titles to AAA games and industrial simulations.

By leveraging Unity's **Data-Oriented Technology Stack (DOTS)** — including the **C# Job System**, **Burst Compiler**, and **Mathematics (SIMD)** library — Tensio executes all core physics, collision detection, and procedural mesh generation asynchronously across worker threads, maintaining a smooth 60+ FPS main game loop with **Zero Garbage Collection (`0B GC Alloc`)** allocations per frame.

:::tip[Unity Discussions & Support]
Have questions, feature requests, or want to discuss integration strategies? Visit the [Tensio Unity Forum Official Thread](https://discussions.unity.com/t/released-tensio-high-performance-dots-rope-chain-physics/1715020) or email `devbayk@gmail.com`.
:::

---

## 🚀 Why Tensio?

Simulating flexible objects like ropes, cables, winches, and chains has historically challenged real-time graphics and physics engines. Traditional mass-spring systems frequently suffer from "super-elasticity" (excessive stretchiness) or explosive instability when stiffness parameters are dialed up.

Tensio solves this fundamental constraint problem using **XPBD (Extended Position Based Dynamics)**:

* **Infinite Stiffness:** Simulate totally inextensible steel cables and railway chains without jitter or numerical drift.
* **Physical Compliance:** Accurately model elastic materials such as bungee cords, suspension tethers, and rubber bands.
* **Unconditional Stability:** Geometric distance and attachment constraints are solved unconditionally, preventing mesh explosions even under extreme gravitational or kinetic stress.
* **Predictable Time Steps:** Physics sub-stepping handles high-speed dynamic motions seamlessly without clipping through geometry.

---

## ⚡ Core Capabilities

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
  <div class="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
    <h4 class="text-sm font-semibold text-white mb-1">⚛️ Multi-Threaded Physics</h4>
    <p class="text-xs text-neutral-400">PBD constraint solver running in parallel on worker threads via Unity's Job System & Burst Compiler.</p>
  </div>
  <div class="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
    <h4 class="text-sm font-semibold text-white mb-1">🔗 Dual Rendering Pipeline</h4>
    <p class="text-xs text-neutral-400">Procedural Catmull-Rom tube meshing (`RopeRenderer`) and GPU-instanced rigid links (`RopeChainRenderer`).</p>
  </div>
  <div class="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
    <h4 class="text-sm font-semibold text-white mb-1">💥 3-Tier Collision System</h4>
    <p class="text-xs text-neutral-400">Standard World SphereCast, ultra-fast analytical SDF Proxy Colliders, and spatial hash Inter-Rope self collisions.</p>
  </div>
  <div class="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
    <h4 class="text-sm font-semibold text-white mb-1">✂️ Real-time Interaction</h4>
    <p class="text-xs text-neutral-400">Interactive slicing and splitting (`RopeCutter`), dynamic motor winches (`RopeWinch`), and anchor pinning.</p>
  </div>
</div>

---

## 🧭 Documentation Map

Explore the detailed documentation chapters:

1. **[Installation & Dependencies](/docs/tensio/installation/)** — Unity version requirements (2022.3+ LTS), package dependencies, and Burst settings.
2. **[Quick Start Guide](/docs/tensio/quick-start/)** — Create and simulate your first rope in under 60 seconds with interactive pinning.
3. **Core Components**:
   - **[Rope Controller](/docs/tensio/core-components/rope-controller/)** — Master component for simulation, particles, and physics parameters.
   - **[Rope Renderer](/docs/tensio/core-components/rope-renderer/)** — Continuous 3D procedural tube mesh generation and UV tiling.
   - **[Rope Chain Renderer](/docs/tensio/core-components/rope-chain-renderer/)** — High-performance GPU-instanced rigid chains.
   - **[Interaction Tools](/docs/tensio/core-components/interaction-tools/)** — Winching systems, mouse cutting, and real-time tearing.
   - **[Rope Audio](/docs/tensio/core-components/rope-audio/)** — Physics-reactive procedural audio loops and impact triggers.
4. **Editor Toolbars**:
   - **[Bezier Point Window](/docs/tensio/toolbars/bezier-point-window/)** — Scene View floating toolbar, relaxation solver, and shape modifiers.
   - **[Make Colliders Rope-Ready](/docs/tensio/toolbars/make-colliders-rope-ready/)** — One-click Unity Collider to Tensio Proxy Collider conversion.
5. **Advanced Topics**:
   - **[Rendering Optimization & Batching](/docs/tensio/advanced/rendering-optimization/)** — Single-draw-call batching for thousands of ropes.
   - **[Collision Systems](/docs/tensio/advanced/collision-system/)** — World SphereCast vs. Analytical SDF Proxy vs. Spatial Hash.
   - **[LOD System](/docs/tensio/advanced/lod-system/)** — Distance-based CullingGroup switching between 3D Mesh, Line, and Suspended states.
   - **[Grappling Hook Case Study](/docs/tensio/advanced/grappling-hook/)** — Complete player grappling hook implementation breakdown.
6. **[C# Scripting API Reference](/docs/tensio/api-reference/)** — Public methods, properties, and events for runtime scripting.
7. **[Frequently Asked Questions (FAQ)](/docs/tensio/faq/)** — Performance tuning, mobile tips, and jitter troubleshooting.
