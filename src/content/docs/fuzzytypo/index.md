---
title: Hierarchy Decorator & Organizer
description: Complete guide and installation manual for the Hierarchy Decorator & Organizer Unity editor extension.
slug: docs/fuzzytypo
---

**Hierarchy Decorator & Organizer** is a lightweight, high-performance Unity Editor extension designed to structure complex scene hierarchies with visual headers, component icons, layer tags, and instant active toggles.

:::tip[Performance Guarantee]
This package operates strictly within the Unity Editor domain (wrapped under `UNITY_EDITOR`). It incurs **Zero GC Alloc** and zero runtime overhead in production builds.
:::

---

## 1. Installation Methods

You can import this package into your Unity project using one of three standard approaches:

### Method A: Unity Package Manager (UPM Git URL - Recommended)

1. In the Unity Editor, navigate to **Window** > **Package Manager**.
2. Click the **`+`** icon in the top-left corner and choose **"Add package from git URL..."**.
3. Paste the following Git repository URL and click **Add**:

```bash
https://github.com/fatih/unity-hierarchy-decorator.git#v1.4.2
```

### Method B: Directly via `manifest.json`

Open your project's `Packages/manifest.json` file and add the following entry to the `dependencies` object:

```json
{
  "dependencies": {
    "com.fatih.hierarchydecorator": "https://github.com/fatih/unity-hierarchy-decorator.git#v1.4.2"
  }
}
```

### Method C: Manual `.unitypackage` Import

Drag and drop the downloaded `.unitypackage` archive into an active Unity Editor project window and choose **Import All**.

---

## 2. Quick Start

Once installed, organizing your scene GameObjects takes seconds.

### Creating Visual Headers

To create a categorized header in the Hierarchy window, create a new empty GameObject and prefix its name with `---` or `==`:

```text
=== [SYSTEMS & MANAGERS] ===
  ├── AudioManager
  ├── GameManager
  └── SaveSystem
```

:::note[Automatic Styling]
The hierarchy renderer automatically locks the `Transform` component of header objects to prevent accidental positioning changes.
:::

### Code-Level Attributes

You can decorate your custom `MonoBehaviour` scripts using the provided C# attributes:

```csharp
using UnityEngine;
using Fatih.HierarchyDecorator;

[DisallowMultipleComponent]
[HierarchyIcon("Assets/Icons/CombatSystem.png")]
public class CombatManager : MonoBehaviour
{
    [HierarchyHeader("Combat Settings", ColorHex = "#06b6d4")]
    [SerializeField] private float baseDamage = 25f;

    [SerializeField] private LayerMask enemyLayer;

    private void Awake()
    {
        Debug.Log("[CombatManager] Initialized successfully.");
    }
}
```

---

## 3. Editor Preferences & Theme Profiles

Customize colors, fonts, and icon dimensions directly in project settings:

1. Navigate to **Edit** > **Project Settings** > **Hierarchy Decorator**.
2. Select from curated presets (*Dark Slate*, *Cyberpunk Neon*, *Minimalist Monochrome*).
3. Changes are hot-reloaded across all active scene hierarchies immediately.

:::caution[Unity Version Support]
Tested on Unity 2021.3 LTS, Unity 2022.3 LTS, and Unity 6. Legacy Unity versions (< 2021) are not supported.
:::

---

## Next Steps

- Explore the [C# API Reference & Editor Scripting Guide](/docs/sample-tool/api-reference/) for custom element drawers and event subscriptions.
- Report bugs or submit feature requests on our [GitHub Issues](https://github.com) page.
