---
title: "12. Samples & Stress Benchmark Suite"
description: "3D interactive demo scene walkthrough, 500+ physics item benchmark suite, and performance auditing."
slug: docs/fuzzysave/tutorials
---

## Overview

FuzzySave ships with two production-ready test scenes:
1. **Interactive 3D Demo Scene (`DemoScene.unity`):** A polished, stylized third-person environment showcasing player controls, interactive chests, dynamic loot spawning, and UI slot cards.
2. **Performance & Stress Benchmark Arena (`PerformanceBenchmarkScene.unity`):** An extreme stress-testing environment capable of spawning and verifying 500+ physics items, 100+ AI agents, graveyard destruction tracking, and automated golden baseline audits.

---

> [!NOTE]
> **3D Demo Scene Walkthrough**
> ![FuzzySave 3D Demo Scene](/images/fuzzysave/demo_scene_walkthrough.gif)
> *Recommended Resolution: 1280x720 | Format: Animated GIF*  
> *Caption: Controlling the player, opening chests, spawning dynamic crystal loot with L, and testing instant Slot 1/2/3 saves with toast notifications.*

---

## 1. Interactive 3D Demo Scene

Located in: `Assets/FuzzyLogicLabs/FuzzySave/Samples/Demo/DemoScene.unity`

### Gameplay Components:
- **`DemoPlayerController`:**
  Character movement built on `CharacterController` with smooth camera follow, footsteps, and damage/heal effects. Decorated with `[FuzzySave("PlayerGroup")]`.
- **`DemoChest`:**
  Smoothly opens using `Mathf.SmoothStep`. Features hybrid raycasting input that seamlessly supports both Unity's **Legacy Input Manager** and the **New Input System** package. Monitored via `SaveGuid`.
- **`DemoLootSpawner` & `DemoFloatingItem`:**
  Press **L** or click the UI button to spawn rotating crystal loot. Each crystal uses `DynamicSpawnTracker` to record its world position, bobbing speed, and rotational velocity. Upon loading, all scattered crystals respawn in their exact positions.
- **`DemoDataTypes`:**
  A validation component demonstrating full persistence across:
  - Primitives (`int`, `float`, `bool`, `string`)
  - Unity Types (`Vector3DTO`, `ColorDTO`)
  - Collections (`List<int>`, `Dictionary<string, float>`)
  - Nested Custom Classes (`CustomWeaponData`)
- **`DemoUIManager`:**
  Dynamic HUD displaying player health bars, gold count, toast popups (`DemoToastNotification`), and 3 active slot buttons that update their date and file status dynamically.

---

> [!NOTE]
> **Stress Benchmark HUD**
> ![500+ Objects Stress Benchmark HUD](/images/fuzzysave/stress_benchmark_hud.png)
> *Recommended Resolution: 1280x720 | Format: PNG*  
> *Caption: Stress testing FuzzySave with 500 active physics items, 100 roaming agents, and the PerformanceMetricsHUD showing 0.8ms gather time at 60 FPS.*

---

## 2. Performance & Stress Benchmark Arena

Located in: `Assets/FuzzyLogicLabs/FuzzySave/Samples/PerformanceBenchmark/`

### Automatic Arena Builder (`PerformanceSceneBuilder.cs`)
You do not need to manually configure the benchmark scene. Open:
**`Tools > FuzzySave > Build Performance Benchmark Scene`**

The builder automatically:
1. Generates stylized materials and lighting.
2. Constructs the arena walls, floor, and drop origin.
3. Instantiates 100 roaming `BenchmarkAgent` entities.
4. Generates monument structures with `SaveGuid` components.
5. Builds the physics prefab in `Resources/` and registers it inside `FuzzySaveSettings.registeredPrefabs`.
6. Configures the complete UI canvas and binds all stress test buttons.

---

## Benchmark Stress Testing Controls

| UI Button | Action Executed | What It Tests |
|---|---|---|
| **`Spawn 50 / 250 / 500`** | Spawns dynamic physics cubes into the arena. | `DynamicSpawnTracker` throughput and time-sliced instantiation. |
| **`Wipe Spawns`** | Destroys all spawned physics items. | Dynamic object cleanup and garbage collection stability. |
| **`Destroy 5 / Destroy All`** | Destroys monument props in the scene. | `GraveyardRegistry` tracking and scene object persistence. |
| **`Revive Graveyard`** | Clears destruction records and revives props. | Real-time object revival and save container synchronization. |
| **`Randomize / Scramble Agents`** | Randomly mutates agent stats and positions. | Bulk memory state gathering across 100+ entities. |
| **`Run Audit`** | Audits live state against saved baseline. | **100.0% Cryptographic Data Fidelity Verification.** |

---

## The Golden Baseline Audit System

To prove mathematical correctness and data integrity, `StressBenchmarkManager` includes an automated **Golden Baseline Audit**:

```
[AUDIT VERIFICATION REPORT]
1. Dynamic Spawns Count: Expected 500, Restored 500. [PASS]
2. Graveyard Dead Entities: Expected 12, Suppressed 12. [PASS]
3. Agent Position Tolerances: All within 0.001f deviation. [PASS]
4. Custom Data Variables: 100% hash match. [PASS]
OVERALL STATUS: AUDIT PASSED (0 ERRORS DETECTED)
```

1. **Before Saving:** FuzzySave records a deep mathematical snapshot of every entity's position, velocity, variable hash, and graveyard status.
2. **After Loading:** It scans the entire restored scene and validates every single object against the baseline.
3. If an object is missing, floating, wrongly oriented, or if a destroyed entity leaked through, the audit alerts the developer immediately.

---

## Next Chapter

Proceed to [13. Complete C# API Reference](/docs/fuzzysave/api-reference/) for the definitive programmatic reference for `FuzzySaveManager`.
