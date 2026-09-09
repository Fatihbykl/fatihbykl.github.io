---
title: Frequently Asked Questions (FAQ)
description: Troubleshooting common physics jitter, collision tunneling, performance tuning, mobile optimization, and interaction questions.
slug: docs/tensio/faq
---

Here are solutions to the most common questions encountered when simulating ropes and chains with Tensio.

---

## ⚛️ Physics & Simulation

<details>
<summary><strong>Why is my rope vibrating or jittering?</strong></summary>

* **Root Cause:** Extremely low compliance (`Compliance = 0.0`) combined with few solver iterations (`SubSteps < 6`) or massive mass ratios can introduce numerical oscillation.
* **Resolution:**
  1. Increase **Sub Steps** from `8` to `12` or `16` in `Physics Settings`.
  2. Add a microscopic amount of compliance (e.g. `0.0001`) instead of absolute zero.
  3. Ensure that pinned GameObjects are updated during `FixedUpdate()` rather than `Update()`.
</details>

<details>
<summary><strong>My rope passes through objects without colliding. Why?</strong></summary>

* **Root Cause:** Fast movement (tunneling), insufficient particle radius, or layer mask exclusion.
* **Resolution:**
  1. Verify the collider's layer is checked in `RopeController` > **Collision Mask**.
  2. Slightly increase **Particle Radius** in `Physics Settings`.
  3. For critical obstacles (poles, characters, boxes), use Tensio's **[Proxy Colliders](/docs/tensio/advanced/collision-system/)** (`RopeBoxProxy`, `RopeCapsuleProxy`), which are mathematically immune to tunneling.
</details>

<details>
<summary><strong>How do I make the rope completely rigid like a steel rod or pipe?</strong></summary>

* Set **Compliance** to `0.0` and increase **Sub Steps** to `16`.
* Note that XPBD is specifically tuned for flexible dynamic bodies. For completely immovable steel bars, Unity's standard Rigidbody joints or kinematic colliders may be more suitable.
</details>

---

## ⚡ Performance & Mobile

<details>
<summary><strong>I have hundreds of ropes and framerates are dropping. What should I optimize?</strong></summary>

1. **Enable Batching:** Check **Use Batching** on all `RopeRenderer` and `RopeChainRenderer` components. This collapses hundreds of draw calls into single batches.
2. **Add `RopeLODController`:** This provides the single highest performance gain by swapping distant 3D meshes for lightweight 2D billboard lines and suspending off-screen physics.
3. **Tune Particle Counts:** Background cables typically look great with only `8 – 12` particles rather than `40`.
</details>

<details>
<summary><strong>Does Tensio work on Mobile (iOS / Android) and standalone VR (Quest)?</strong></summary>

* **Yes.** Because the core XPBD constraint solver is multi-threaded and compiled using Unity's **Burst Compiler**, it runs with 0B GC allocation natively on ARM64 architectures.
* Recommended mobile settings: Keep `Particle Count` between `15 – 25`, use Proxy Colliders, and enable `RopeLODController`.
</details>

---

## 🎮 Gameplay & Interaction

<details>
<summary><strong>Can I attach a rope to a moving character or Ragdoll?</strong></summary>

* **Yes.** Call `rope.PinParticle(index, characterBoneTransform, contactPoint)`.
* If the attached GameObject has a `Rigidbody`, Tensio automatically calculates reciprocal forces, allowing players to swing, climb, or pull attached objects.
</details>

<details>
<summary><strong>How do I tether two separate objects together?</strong></summary>

* Pin index `0` to Object A using `rope.PinParticle(0, objectA.transform, objectA.transform.position)`.
* Pin index `ParticleCount - 1` to Object B using `rope.PinParticle(rope.ParticleCount - 1, objectB.transform, objectB.transform.position)`.
* The rope will physically constrain the distance between both objects according to its resting length.
</details>

---

## 🎨 Visuals & Rendering

<details>
<summary><strong>The rope texture appears stretched when winching. How do I fix it?</strong></summary>

* When changing rope length dynamically via code or `RopeWinch`, adjust the **UV Offset** property on `RopeRenderer` proportionally to simulate continuous sliding across pulleys.
</details>

<details>
<summary><strong>Can I save or bake the dynamic rope mesh into a permanent asset?</strong></summary>

* **Yes.** Because `RopeRenderer` writes into a standard Unity `Mesh`, you can call `AssetDatabase.CreateAsset(meshFilter.sharedMesh, "Assets/BakedRope.asset")` in an editor script to save the resting posture as static scene geometry.
</details>
