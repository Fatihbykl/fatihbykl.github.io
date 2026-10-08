---
title: "01. Introduction & Setup"
description: "System requirements, package installation, Welcome window, and Project Settings."
slug: docs/fuzzytypo/introduction-and-setup
---

[← Back to Main](/docs/fuzzytypo/) | [Next: Core Concepts & Architecture →](/docs/fuzzytypo/core-concepts-and-architecture/)

---

## What is FuzzyTypo?

**FuzzyTypo** is a **Centralized Typography and Design Tokens Management Suite** engineered to eliminate disjointed, inconsistent, and manually maintained **TextMeshPro** components across modern game and UI development pipelines.

In conventional Unity workflows, each UI text instance (buttons, titles, subtitles, tooltips, chat logs, HUD gauges) stores its own font size, color, character/line spacing, and material presets locally. Modifying a game's corporate typography branding, accent palette, or cross-language scaling rules often requires opening and re-saving hundreds of prefabs across dozens of scenes.

**FuzzyTypo** solves this challenge:
1. Brings the web and design industry standard **Design Tokens** methodology into the Unity ecosystem.
2. Bridges text components directly to central tokens, enabling **instant single-source updates**.
3. Enforces a **Zero-GC Allocation** runtime architecture, delivering smooth theme and language changes with zero performance penalties.

---

## System Requirements & Compatibility

FuzzyTypo is engineered and tested for full compatibility with modern Unity versions:

| Requirement | Minimum Version | Recommended / Verified |
| :--- | :--- | :--- |
| **Unity Version** | `Unity 2021.3 LTS` | `Unity 2022.3 LTS`, `Unity 2023.2`, `Unity 6 (6000.0+)` |
| **Package Dependencies** | `TextMeshPro` (builtin package) | `com.unity.textmeshpro` 3.0.6+ |
| **Editor Interface** | `UI Toolkit` | Unity Builtin UI Toolkit Engine |
| **Render Pipelines** | Built-in / URP / HDRP | Compatible across all render pipelines |
| **Target Platforms** | All platforms | Windows, macOS, Linux, iOS, Android, WebGL, Consoles |

> [!NOTE]
> FuzzyTypo natively supports Unity 6's updated `FindObjectsByType` APIs and background worker thread FontEngine safety constraints. No deprecation warnings or editor crashes will occur in your console.

---

## Package Structure & Folder Hierarchy

When imported into your project, FuzzyTypo organizes its assets within the following directory hierarchy:

```text
Assets/
└── FuzzyLogicLabs/
    └── FuzzyTypo/
        ├── DefaultFuzzyTheme.asset          # Default starter theme asset
        ├── Resources/
        │   ├── FuzzyTypoSettings.asset      # Global project settings ScriptableObject
        │   └── FuzzyLogicLabsBanner.png     # Visual branding asset
        ├── Runtime/                         # Scripts compiled into standalone Player builds
        │   ├── Core/                        # Linker, Manager, RuntimeDemo HUD
        │   ├── Data/                        # Style, Theme, Settings, OverrideFlags
        │   └── Localization/                # Language management, profiles, and rule models
        ├── Editor/                          # Editor-only tools, windows, and processors
        │   ├── Dashboard/                   # UI Toolkit UXML/USS and Master Dashboard
        │   ├── Tools/                       # Auto-Migrator, Glyph Analyzer, Material Swapper
        │   ├── Analytics/                   # Font & Prefab analytics engines
        │   ├── Build/                       # Bake & Strip build processors
        │   └── Utilities/                   # Demo generators and validation utilities
        └── Samples/                         # Starter themes, localization profiles, and UI prefabs
```

---

## Project Settings Configuration

FuzzyTypo seamlessly integrates into Unity's standard `Project Settings` window.

To inspect or adjust project-wide settings:
1. Open **Edit > Project Settings** from the Unity menu.
2. Select **FuzzyTypo** from the left-hand category list.


### Configuration Parameters:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Active Theme** | `FuzzyTheme` | `DefaultFuzzyTheme` | The active theme asset referenced by all connected text instances across scenes and runtime sessions. |
| **Fallback Theme** | `FuzzyTheme` | `None` | Recovery theme consulted if a requested Style ID cannot be located in the active theme. |
| **Available Themes** | `List<FuzzyTheme>` | Auto | Registered theme assets eligible for runtime dynamic theme switches. |
| **Default Locale** | `string` | `"default"` | Fallback locale identifier used when no culture-specific style overrides apply (e.g., `en`, `tr`). |
| **Localization Profile** | `FuzzyLocalizationProfile` | `None` | Global profile containing language-specific font remapping and line spacing scaling rules. |
| **Auto Live Sync in Editor** | `bool` | `true` | Instantly updates scene text instances whenever a token or style is modified inside the Dashboard. |
| **Log Missing Glyphs** | `bool` | `true` | Outputs diagnostic console warnings whenever rendered strings contain characters absent from the font atlas. |
| **Strip Linkers on Build (Pro)** | `bool` | `false` | When enabled, bakes typography values permanently into text meshes and strips linker scripts during Player builds. |

---

## Initial Setup Checklist

After importing FuzzyTypo, verify these three essential setup checkpoints:

1. [x] **Settings Asset:** Confirm that `Assets/FuzzyLogicLabs/FuzzyTypo/Resources/FuzzyTypoSettings.asset` is present.
2. [x] **Starter Themes:** If needed, open the **Settings & Pro** tab and click *"Generate Starter Themes"* to populate your project with sample themes.
3. [x] **TextMeshPro Essentials:** Ensure the TMP Essential Resources package is imported (`Window > TextMeshPro > Import TMP Essential Resources`).

---

[← Back to Main](/docs/fuzzytypo/) | [Next: Core Concepts & Architecture →](/docs/fuzzytypo/core-concepts-and-architecture/)
