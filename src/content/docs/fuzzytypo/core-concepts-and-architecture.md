---
title: "02. Core Concepts & Architecture"
description: "Design Tokens architecture, FuzzyTheme, FuzzyTextStyle, immutable GUID mapping, and Zero-GC vision."
slug: docs/fuzzytypo/core-concepts-and-architecture
---

[← Previous: Introduction & Setup](/docs/fuzzytypo/introduction-and-setup/) | [Main Overview](/docs/fuzzytypo/) | [Next: FuzzyTypoLinker Component →](/docs/fuzzytypo/fuzzytypo-linker/)

---

## Architectural Layers

FuzzyTypo is structured into three loosely coupled, high-performance, and maintainable architectural layers:

```mermaid
graph TD
    subgraph DataLayer["1. Data Layer (ScriptableObjects)"]
        Theme["FuzzyTheme (ScriptableObject)"]
        Style["FuzzyTextStyle (Tokens)"]
        LocProf["FuzzyLocalizationProfile"]
        Theme --> Style
    end

    subgraph RuntimeLayer["2. Runtime Layer (Zero GC)"]
        Manager["FuzzyTypoManager (Static Service)"]
        Linker["FuzzyTypoLinker (Bridge MonoBehaviour)"]
        TMPText["TMP_Text (TextMeshProUGUI / 3D)"]
        Manager -->|Events| Linker
        Linker -->|Applies Values| TMPText
        Theme -.->|O(1) Token Lookup| Manager
    end

    subgraph EditorLayer["3. Editor Layer (UI Toolkit)"]
        Dashboard["Master Dashboard (5 Tabs)"]
        Linter["FuzzyTypographyLinter"]
        Analytics["Font & Prefab Analytics"]
        Tools["Auto-Migrator & Glyph Analyzer"]
        BakeStrip["Bake & Strip Processor"]
        Dashboard --> Theme
        Linter --> Linker
    end
```

---

## Design Systems & Design Tokens Philosophy

In traditional game development workflows, individual text components store their typographic properties in isolation:
* A button's font size is hardcoded to `18`, its color to `#FFFFFF`, and its font asset to `LiberationSans` directly on the component.
* If design decides late in production to enlarge button fonts to `20px` and shift brand accents to `#FFD700` (Gold), artists and programmers must manually open and edit hundreds of prefabs.

**The FuzzyTypo Design Tokens Solution:**
Text components do not store raw typographic values; they reference a semantic **Design Token** (e.g., `Buttons / Button Label`).
When token properties change, every connected text element across your project updates synchronously from a single source of truth.

![Design Tokens Architectural Concept](/images/fuzzytypo/05-design-tokens-concept.png)

---

## Data Models

### 1. `FuzzyTextStyle` (Style Token)
A comprehensive data container representing a singular typographic token definition.

```csharp
[Serializable]
public class FuzzyTextStyle
{
    // Identifiers
    public string Id { get; }            // Immutable unique GUID
    public string StyleName { get; set; } // e.g., "Heading 1", "Body Regular"
    public string Category { get; set; }  // e.g., "Headings", "Body", "Buttons"
    public string Description { get; set; }

    // Typography & Materials
    public TMP_FontAsset FontAsset { get; set; }
    public Material MaterialPreset { get; set; }

    // Sizing
    public float FontSize { get; set; }
    public bool EnableAutoSizing { get; set; }
    public float FontSizeMin { get; set; }
    public float FontSizeMax { get; set; }

    // Styling & Appearance
    public Color Color { get; set; }
    public FontStyles FontStyle { get; set; } // Bold, Italic, UpperCase, etc.

    // Alignment & Metrics
    public TextAlignmentOptions Alignment { get; set; }
    public float CharacterSpacing { get; set; }
    public float LineSpacing { get; set; }
    public float ParagraphSpacing { get; set; }
    public float WordSpacing { get; set; }

    // Multilingual Culture Overrides
    public List<LocaleOverride> LocaleOverrides { get; }
}
```

### 2. `FuzzyTheme` (ScriptableObject)
Represents a complete visual theme profile (e.g., `SampleDarkTheme`, `SampleLightTheme`, `CyberpunkTheme`).
It encapsulates collections of `FuzzyTextStyle` definitions and maintains an internal cached dictionary (`m_StyleLookupCache`) to ensure **$O(1)$** lookups during runtime execution.

```csharp
[CreateAssetMenu(fileName = "NewFuzzyTheme", menuName = "FuzzyTypo/Fuzzy Theme")]
public class FuzzyTheme : ScriptableObject
{
    public string ThemeId { get; }
    public string ThemeName { get; set; }
    public List<FuzzyTextStyle> Styles { get; }

    public FuzzyTextStyle GetStyleById(string styleId);   // O(1) cached lookup
    public FuzzyTextStyle GetStyleByName(string styleName);
    public void AddStyle(FuzzyTextStyle style);
    public bool RemoveStyle(string styleId);
    public FuzzyTextStyle DuplicateStyle(string styleId);
}
```

---

## Why GUID-Based Identity? (Immutable GUID)

Every style generated in FuzzyTypo receives an immutable **GUID** identifier (e.g., `c7e48b9a-12d4-4f90-a3bc-91e847c2a110`).

> [!IMPORTANT]
> **The Risk of Name-Based Matching:**  
> If styles were linked via string names like `Heading 1`, renaming a style to `H1 / Hero Display` would immediately sever references across scenes and prefabs, causing catastrophic missing references.
> 
> **FuzzyTypo's GUID Architecture:**  
> A style's display name, category, or values can change freely without ever breaking existing scene or prefab bindings. Furthermore, matching GUIDs across parallel themes (Dark vs. Light) allows seamless 1-click theme swaps with zero reference reassignment.

---

## Zero Garbage Collection (Zero-GC) Principles

In mobile, console, and VR/AR titles, runtime GC allocations lead to abrupt CPU spikes and frame rate stutter. FuzzyTypo's runtime layer is engineered from the ground up under strict Zero-GC constraints:

1. **No `Update()` Loops:**  
   `FuzzyTypoLinker` contains no `Update()` routine. Execution occurs strictly on lifecycle hooks (`OnEnable`) or during broadcast events (`OnThemeChanged`, `OnLocaleChanged`).
2. **Zero LINQ & Boxing at Runtime:**  
   Runtime style lookups avoid LINQ queries (`Where`, `FirstOrDefault`) and string formatting boxing, utilizing pre-indexed collections and primitive loops instead.
3. **Static C# Action Delegates:**  
   `FuzzyTypoManager` broadcasts notifications through lightweight static C# delegates rather than memory-heavy UnityEvents.

---

[← Previous: Introduction & Setup](/docs/fuzzytypo/introduction-and-setup/) | [Main Overview](/docs/fuzzytypo/) | [Next: FuzzyTypoLinker Component →](/docs/fuzzytypo/fuzzytypo-linker/)
