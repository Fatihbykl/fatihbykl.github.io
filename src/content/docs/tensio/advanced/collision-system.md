---
title: Collision System Architecture
description: Comparison and configuration of Tensio's 3 collision tiers — World SphereCast, Analytical SDF Proxies, and Spatial Hash Inter-Rope collisions.
slug: docs/tensio/advanced/collision-system
---

Tensio offers three distinct collision modes tailored for different scene scales and performance budgets:

---

## 1. World Collision (Standard Unity Colliders)

The most flexible method, allowing ropes to interact with the broader game world (static terrain, complex architecture, arbitrary convex/concave mesh colliders, and dynamic objects).

* **Mechanism:** Dispatches parallel `Physics.SphereCast` ray sweeps along particle trajectories.
* **Setup:** On `RopeController`, set the **Collision Mask** to your target layers (e.g. `Default`, `Ground`, `Obstacles`).

:::tip[Pros & Cons]
* **Pros:** Works out of the box with all standard Unity colliders without scene modification.
* **Cons:** Higher CPU overhead with high particle counts; sharp triangular mesh edges can cause slight jitter if substeps are low.
:::

---

## 2. Proxy Collision (Analytical Geometric Primitives)

An ultra-fast, zero-allocation collision system running entirely within Burst jobs that bypasses Unity's PhysX engine completely.

* **Mechanism:** Solves analytical **Signed Distance Fields (SDF)** inside Burst C# jobs for mathematical spheres, boxes, capsules, and infinite planes.
* **Setup:** Attach a proxy component to your target GameObject:
  * `RopeSphereProxy`
  * `RopeBoxProxy`
  * `RopeCapsuleProxy`
  * `RopePlaneProxy`
  *(Or use the automated [Make Colliders Rope-Ready](/docs/tensio/toolbars/make-colliders-rope-ready/) tool).*

:::tip[Pros & Cons]
* **Pros:** Up to 10x faster than PhysX raycasts; perfectly smooth surface gliding; mathematically immune to tunneling.
* **Cons:** Restricted to analytical primitive shapes.
:::

---

## 3. Inter-Rope Collision (Rope-on-Rope)

Prevents ropes from passing through themselves or other ropes, essential for tying knots, tangled cable piles, nets, or whip-cracking mechanics.

* **Mechanism:** Global uniform **Spatial Hashing** executed across all registered particles.
* **Setup:**
  1. Add a single `RopeInteractionManager` component to a persistent manager in your scene.
  2. On each `RopeController`, check **Support Inter Rope Collision**.

### Configuration Parameters
* **Cell Size:** Diameter of spatial hash buckets. Set slightly larger than your thickest rope's diameter (default `~0.25m`).
* **Stiffness:** Repulsion force pushing intersecting strands apart (`0.5` recommended for maximum numerical stability).
