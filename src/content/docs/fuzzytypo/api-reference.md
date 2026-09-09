---
title: C# API Reference
description: Core classes, editor events, and custom drawer extension guide for Hierarchy Decorator.
slug: docs/fuzzytypo/api-reference
---

This reference details the public C# API architecture, extensible drawer interfaces, and editor lifecycle hooks provided by **Hierarchy Decorator & Organizer**.

---

## 1. `HierarchyDecoratorAPI` (Static Core)

All hierarchy rendering routines and event subscriptions are orchestrated through the static `HierarchyDecoratorAPI` class.

```csharp
namespace Fatih.HierarchyDecorator
{
    public static class HierarchyDecoratorAPI
    {
        /// <summary>
        /// Registers a custom visual style for GameObjects matching a specific prefix.
        /// </summary>
        public static void RegisterCustomStyle(string prefix, HierarchyStyle style);

        /// <summary>
        /// Event fired whenever an individual item in the scene hierarchy is rendered.
        /// </summary>
        public static event Action<int, Rect> OnHierarchyItemDrawn;

        /// <summary>
        /// Invalidates all cached drawer instances and forces an editor repaint.
        /// </summary>
        public static void InvalidateCache();
    }
}
```

:::note[Garbage Collection Warning]
Because `OnHierarchyItemDrawn` fires hundreds of times per frame in busy scenes, avoid heap allocations (`new`, string concatenation) within event handlers.
:::

---

## 2. Implementing Custom Hierarchy Drawers

You can render custom icons, health bars, or status badges next to specific GameObjects by hooking into Unity's editor drawing pipeline.

### Example: Component Health Status Drawer

```csharp
#if UNITY_EDITOR
using UnityEditor;
using UnityEngine;
using Fatih.HierarchyDecorator.Editor;

[InitializeOnLoad]
public static class HealthComponentDrawer
{
    static HealthComponentDrawer()
    {
        EditorApplication.hierarchyWindowItemOnGUI += HandleHierarchyGUI;
    }

    private static void HandleHierarchyGUI(int instanceID, Rect selectionRect)
    {
        // Resolve GameObject reference from instanceID
        GameObject go = EditorUtility.InstanceIDToObject(instanceID) as GameObject;
        if (go == null) return;

        // Check if GameObject contains character stats
        if (go.TryGetComponent<ICharacterStats>(out var stats))
        {
            // Compute right-aligned badge rectangle
            Rect badgeRect = new Rect(
                selectionRect.xMax - 65,
                selectionRect.y + 1,
                60,
                selectionRect.height - 2
            );

            // Dynamic color tint based on health threshold
            Color badgeColor = stats.CurrentHealth > 50 
                ? new Color(0.1f, 0.8f, 0.4f, 0.25f) 
                : new Color(0.9f, 0.2f, 0.2f, 0.35f);
            
            EditorGUI.DrawRect(badgeRect, badgeColor);

            GUIStyle labelStyle = new GUIStyle(EditorStyles.miniLabel)
            {
                alignment = TextAnchor.MiddleCenter,
                normal = { textColor = Color.white },
                fontSize = 9
            };

            GUI.Label(badgeRect, $"HP: {stats.CurrentHealth:F0}", labelStyle);
        }
    }
}
#endif
```

---

## 3. Provided C# Attributes

### `[HierarchyHeader]`
Assigns custom color tints, font styling, and horizontal separator lines to a GameObject header.

```csharp
using UnityEngine;
using Fatih.HierarchyDecorator;

public class SpawnerGroup : MonoBehaviour
{
    [HierarchyHeader("ENEMY WAVES", ColorHex = "#8b5cf6", ShowSeparator = true)]
    [SerializeField] private int maxWaveCount = 10;
}
```

#### Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `HeaderTitle` | `string` | `""` | Title text displayed in the hierarchy |
| `ColorHex` | `string` | `"#06b6d4"` | Accent highlight hex color |
| `ShowSeparator`| `bool` | `true` | Whether to draw a bottom separator line |

---

### `[HierarchyIcon]`
Draws a designated icon on the left side of the GameObject entry in the hierarchy.

```csharp
using UnityEngine;
using Fatih.HierarchyDecorator;

[HierarchyIcon("Assets/Gizmos/QuestObjectiveIcon.png")]
public class QuestObjective : MonoBehaviour
{
    public bool isCompleted;
}
```

:::tip[Recommended Texture Resolution]
The optimal resolution for hierarchy icons is **32x32 pixels** PNG. In Unity texture import settings, set `Texture Type: Editor GUI and Legacy GUI`.
:::

---

## 4. Performance Guidelines

The Unity Hierarchy window receives dozens of repaint cycles per second. Please adhere to the following best practices:

1. **`GetComponent<T>()` Frequency:** Instead of invoking `GetComponent` every frame inside `hierarchyWindowItemOnGUI`, utilize a lightweight `Dictionary<int, Component>` cache keyed by instance ID.
2. **String Allocations:** Avoid string interpolation `$"Object: {go.name}"`. Use static constants or pooled `StringBuilder` instances.
3. **GUIStyle Instantiation:** Do not instantiate `new GUIStyle()` within repaint loops; declare static readonly style references.
