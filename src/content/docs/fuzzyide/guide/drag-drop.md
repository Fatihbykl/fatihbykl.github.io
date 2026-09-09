---
title: "Smart Drag & Drop"
description: "Drag assets and hierarchy GameObjects directly into C# scripts to generate serialized fields and references."
slug: docs/fuzzyide/guide/drag-drop
---

One of the most powerful features in FuzzyIDE is the seamless integration with the Unity Editor's asset and hierarchy management via the **Smart Drag & Drop Engine**.

## How to Use
1. **From Project Window**: You can drag any prefab, material, or asset directly into a C# script inside FuzzyIDE. The IDE will automatically generate a serialized field or a resource loading snippet depending on your configuration.
2. **From Hierarchy**: Dragging a GameObject into your script will create an explicit reference field.

This feature drastically reduces boilerplate code and the time spent manually typing variable declarations.
