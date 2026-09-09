---
title: Make Colliders Rope-Ready
description: One-click editor utility to convert standard Unity primitive colliders into analytical Burst-compiled Proxy Colliders.
slug: docs/tensio/toolbars/make-colliders-rope-ready
---

Tensio includes automated editor utilities to accelerate scene setup and ensure colliders are optimized for high-performance physics interaction.

---

## Menu Location

Navigate to **Tools** > **Tensio** > **Make Colliders Rope-Ready** in the top menu bar of the Unity Editor.

---

## How to Use

1. In the Hierarchy or Scene View, select one or more GameObjects equipped with standard Unity colliders (`BoxCollider`, `SphereCollider`, or `CapsuleCollider`).
2. Run **Tools** > **Tensio** > **Make Colliders Rope-Ready**.

![Make Colliders Rope-Ready Utility](/images/tensio/make_colliders_rope_ready.gif)

---

## What It Does

The utility scans all selected GameObjects and nested children:
* Identifies existing primitive colliders (`BoxCollider`, `SphereCollider`, `CapsuleCollider`).
* Automatically attaches the matching analytical proxy component (`RopeBoxProxy`, `RopeSphereProxy`, `RopeCapsuleProxy`) without removing or affecting the original collider.
* Registers these primitives with Tensio's **Proxy Collision System**.

:::tip[Performance Advantage]
Proxy Colliders evaluate distance and penetration natively inside Burst jobs using pure mathematical Signed Distance Fields (SDFs). They are **up to 10x faster** than standard `Physics.SphereCast` ray tests and completely eliminate surface snagging and tunneling!
:::
