---
title: Interaction Tools (Winch & Cutter)
description: Runtime mechanics for dynamic rope extension/retraction with RopeWinch and real-time mouse-based rope slicing with RopeCutter.
slug: docs/tensio/core-components/interaction-tools
---

Tensio includes production-ready interaction components allowing players or gameplay systems to manipulate ropes dynamically in real time.

---

## 1. Rope Winch

The `RopeWinch` component dynamically spools rope out or reels it in, accurately mimicking hoists, crane cables, elevator lifts, and motorized winches.

<video autoplay loop muted playsinline class="w-full rounded-xl border border-neutral-800 shadow-md my-4">
  <source src="/images/tensio/winch.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Winch Speed** | `float` | `2.0` | Retraction/extension speed in meters per second. |
| **Min Length** | `float` | `0.5` | Minimum limit preventing negative lengths or solver compression crashes. |
| **Max Length** | `float` | `50.0` | Maximum limit for total deployed cable. |
| **Extend Key** | `KeyCode` | `DownArrow` | Test hotkey for feeding cable out. |
| **Retract Key** | `KeyCode` | `UpArrow` | Test hotkey for reeling cable in. |

### Visual Synchronization

Instead of unnaturally stretching or compressing geometry, `RopeWinch` automatically scrolls the **UV Offset** (for tube meshes) or **Link Offset** (for chain links). This produces an authentic visual illusion of cable feeding continuously into or out of a reel mechanism.

---

## 2. Rope Cutter

The `RopeCutter` utility enables players to slice ropes dynamically during gameplay using mouse rays, laser cutters, or melee weapon sweeps.

<video autoplay loop muted playsinline class="w-full rounded-xl border border-neutral-800 shadow-md my-4">
  <source src="/images/tensio/cutter.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### Usage

1. Attach `RopeCutter` to your player camera or an input manager GameObject.
2. (Optional) Assign a Unity `LineRenderer` to render a cutting slash visual trail.

### Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Mouse Button** | `int` | `0` | Mouse button index to initiate cut (`0` = Left Click, `1` = Right Click). |
| **Max Distance** | `float` | `100.0` | Maximum camera raycast distance for targeting ropes. |
| **Min Cut Interval** | `float` | `0.15` | Cooldown period between cuts in seconds to prevent spamming. |
| **Trail Settings** | `TrailConfig` | — | Controls the width, color gradient, and fade duration of the cursor slash. |

### How Slicing Works Internally

When a cut ray intersects a rope segment:
1. `RopeCutter` calls `ropeController.Split(segmentIndex, segmentFraction)`.
2. The original rope shrinks to retain particles before the cut point.
3. A brand new `RopeController` GameObject is instantiated on the fly to take ownership of particles after the cut point, inheriting identical physics and rendering materials.
4. Both severed halves swing and react independently according to their respective momentum.
