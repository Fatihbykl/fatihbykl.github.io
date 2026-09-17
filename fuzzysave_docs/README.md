# 🎮 FuzzySave Documentation

> **Next-Generation, High-Performance, Zero-Hitch, Fail-Safe Save & Load System for Unity**
> Engineered by **Fuzzy Logic Labs** | Version 1.0.0 | Compatible with Unity 2022.3 LTS & Unity 6+

---

> [!TIP]
> **HERO BANNER / DEMO SHOWCASE GIF:**
> ![FuzzySave Hero Showcase](media/hero_showcase.gif)
> *Recommended Resolution: 1920x1080 (16:9) | Format: High-Quality GIF / WebM*
> *Caption: High-level demonstration showcasing Visual Save Studio, 60 FPS asynchronous saving with 500+ physics items, and Play Mode Live Debugger variable injection.*

---

## 📖 Welcome to FuzzySave

**FuzzySave** is an enterprise-grade serialization, persistence, and game state management framework engineered specifically for Unity. It solves the chronic issues found in conventional Unity save systems—such as main-thread lag spikes, corrupted save files, tedious manual boilerplate coding, lack of security, and difficult schema updates.

Whether you are building an indie roguelike requiring rapid RAM snapshots, an open-world RPG managing thousands of dynamic scene entities, or a cross-platform title with cloud synchronization, FuzzySave provides both **no-code visual workflow tools** and **code-first developer APIs**.

---

## 📑 Documentation Structure

The documentation is organized into focused, comprehensive chapters. Navigate through the topics below:

| # | Chapter | Key Topics Covered |
|---|---|---|
| **01** | [Architecture & Philosophy](01_architecture_overview.md) | Design principles, `.asmdef` modular structure, dependency installer, zero-reflection concept. |
| **02** | [Asynchronous Pipeline & Zero-Hitch](02_async_pipeline.md) | 3-Phase async pipeline, main-thread vs worker thread, time-sliced restoration, cross-scene async loads. |
| **03** | [Storage, Security & Data Integrity](03_storage_security.md) | Atomic file swaps (`.tmp` → `.bak` → target), AES-256-CBC, GZip compression, HMAC-SHA256 checksum, custom converters. |
| **04** | [Visual Save Studio](04_visual_save_studio.md) | Full UI Toolkit suite: Dashboard, Drag-and-Drop mapping, Save Explorer (Tree/Raw JSON editor), Events, Slots, Settings, Code Bake. |
| **05** | [Play Mode Live Debugger](05_playmode_live_debugger.md) | Runtime inspection, live variable injection (cheats/god mode), instant RAM snapshots / time-travel, scene pinging, live graveyard controls. |
| **06** | [Tracking Engine, Dynamic Spawns & Graveyard](06_tracking_engine_and_graveyard.md) | `SaveGuid`, duplicate detection, `DynamicSpawnTracker`, runtime prefab re-instantiation, `GraveyardRegistry` destroy & revive, `CodeRewriter`. |
| **07** | [No-Code Runtime Components](07_no_code_components.md) | `AutoSaveManager` (rolling slots, pause-aware), `SaveTriggerZone` (2D/3D checkpoints), `SaveButtonBinding`, `SaveKeyBinding`, `SaveFeedbackUI`, `SaveActionTrigger`. |
| **08** | [Slot Metadata & GPU Thumbnails](08_slot_metadata_and_thumbnails.md) | `SaveSlotMetadata`, summary field keys (Level, Gold, Health), zero-stall `AsyncGPUReadback` thumbnail screenshots, save slot UI cards. |
| **09** | [Cloud Synchronization](09_cloud_synchronization.md) | `CloudSyncManager`, conflict resolution policies, UGS Cloud Save, Steam Cloud, PlayFab, Firebase, Custom REST API. |
| **10** | [Schema Migrations & Versioning](10_schema_migrations.md) | Safe schema evolution, `SaveMigrationManager`, chained migrations (v1 → v2 → v3), backwards compatibility. |
| **11** | [Attributes & Code-First Development](11_attributes_code_first.md) | `[FuzzySave]`, `[SaveField]`, `[SaveGroup]`, `[SaveEvent]`, selective persistence without editor tooling. |
| **12** | [Samples & Stress Benchmark Suite](12_samples_and_benchmarks.md) | 3D interactive demo scene (`DemoScene`), 500+ physics item benchmark suite, `PerformanceSceneBuilder`, Golden Baseline Audit, `PerformanceMetricsHUD`. |
| **13** | [Complete C# API Reference](13_api_reference.md) | Exhaustive method-by-method reference for `FuzzySaveManager`, event delegates, signatures, parameters, return values, and code samples. |
| **14** | [Troubleshooting & FAQ](14_troubleshooting_faq.md) | Benchmark comparison table (vs PlayerPrefs, EasySave, JsonUtility), common questions, mobile storage guidelines, edge-case solutions. |

---

## 🚀 Quick Glance: Code-First vs No-Code

### 1. Minimal Code Example
```csharp
using UnityEngine;
using FuzzyLogicLabs.FuzzySave;

public class PlayerProgress : MonoBehaviour
{
    public int currentHealth = 100;
    public int goldCoins = 450;

    // Asynchronous Save
    public async void QuickSaveGame()
    {
        FuzzySaveManager.SetData("player_hp", currentHealth);
        FuzzySaveManager.SetData("player_gold", goldCoins);
        FuzzySaveManager.SetData("player_position", transform.position);

        bool success = await FuzzySaveManager.SaveAsync();
        Debug.Log($"Game saved successfully: {success}");
    }

    // Asynchronous Load
    public async void QuickLoadGame()
    {
        bool success = await FuzzySaveManager.LoadAsync();
        if (success)
        {
            currentHealth = FuzzySaveManager.GetData<int>("player_hp", defaultValue: 100);
            goldCoins = FuzzySaveManager.GetData<int>("player_gold", defaultValue: 0);
            transform.position = FuzzySaveManager.GetData<Vector3>("player_position", defaultValue: Vector3.zero);
        }
    }
}
```

### 2. No-Code Visual Workflow
1. Open **`Tools > FuzzySave > Visual Save Studio`**.
2. Select your component and drag your fields into a **Save Group**.
3. Click **Bake Code** to generate zero-reflection direct accessors.
4. Attach `SaveTriggerZone` to a 3D collider checkpoint in the scene.
5. Hit **Play**—progress is captured without writing a single line of code!

---

> [!NOTE]
> All code examples in this documentation are verified against Unity 2022.3 LTS and Unity 6.
