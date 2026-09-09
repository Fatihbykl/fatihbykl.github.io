---
title: Rope Audio
description: Procedural physics-driven audio system reacting to rope tension, velocity, wind turbulence, and collision impacts.
slug: docs/tensio/core-components/rope-audio
---

The `RopeAudio` component synthesizes and modulates dynamic sound effects in real time, directly driven by XPBD physics simulation metrics such as stress strain, average particle velocity, and collision impulses.

---

## Setup & Usage

Attach `RopeAudio` to any GameObject hosting a `RopeController`. The component requires a configured `RopeAudioProfile` asset to define audio clips and reaction curves.

---

## Component Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Profile** | `RopeAudioProfile` | — | ScriptableObject asset containing sound clips and tuning thresholds. |
| **Lerp Speed** | `float` | `5.0` | Smoothing rate at which audio volume and pitch adapt to instantaneous physics spikes. |

---

## Rope Audio Profile

To create an audio profile asset:
1. In the Unity Project window, right-click and choose **Create** > **Tensio** > **Rope Audio Profile**.
2. Configure clips according to material properties (e.g. heavy metallic chain clinks vs. creaking hemp fibers):

| Property | Type | Description |
| :--- | :--- | :--- |
| **Tension Loop** | `AudioClip` | Looping audio played when cable undergoes tensile elongation (creaking/groaning). |
| **Wind Loop** | `AudioClip` | Looping sound played when rope whips rapidly through air (whooshing effect). |
| **Impact Clips** | `AudioClip[]` | Sound pool randomly sampled when rope particles hit colliders. |
| **Snap Sound** | `AudioClip` | High-impact one-shot played if the rope snaps due to extreme stretch. |
| **Thresholds** | `FloatSettings` | Minimum velocity and stress values required before audio starts playing. |

---

## Physics Coupling Behavior

* **Tension Creak:** Volume and pitch rise continuously as `CurrentStressRatio` approaches the snapping threshold.
* **Aerodynamic Whoosh:** Modulates volume proportionally to the root-mean-square velocity of all simulated particles.
* **Surface Impacts:** Automatically triggers when `RopeController.OnCollisionImpulse` fires above the noise floor.
