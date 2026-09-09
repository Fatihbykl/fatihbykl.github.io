---
title: Bezier Point Window & Scene Toolbar
description: In-editor spline sculpting, live physics relaxation, shape modifiers, and interactive Scene View controls.
slug: docs/tensio/toolbars/bezier-point-window
---

Tensio creates an interactive spline authoring environment directly in the Unity Scene View whenever a GameObject with a `RopeController` is selected. This includes a floating scene overlay toolbar and a context-sensitive Point Editor window.

---

## 1. Scene View Floating Toolbar

The floating toolbar docks directly inside the Scene View, giving instant access to common spline shaping and simulation commands:

### A. Live Physics Simulation
* **Relax:** Runs a momentary editor-time physics simulation letting the rope drape and settle naturally under gravity. This eliminates the need to manually shape sagging curves!
* **Reset:** Instantly straightens the rope into a linear path between start and end anchors.

![Editor Physics Relaxation](/images/tensio/simulation.gif)

### B. Spline Shape Modifiers
* **Smooth:** Automatically computes continuous Bezier tangents across all selected points.
* **Straight:** Re-aligns selected points into a strict line segment.
* **Align:** Distributes spacing between intermediate points evenly.
* **Flatten Y Axis:** Normalizes all selected points to their average Y elevation.

![Spline Shape Modifiers](/images/tensio/shape_modifiers.gif)

### C. Editor Productivity Settings
* **Tangents Toggle:** Shows or hides Bezier handle vectors across all control points.
* **Box Select:** Activates marquee selection for editing clusters of control points simultaneously.
* **Magnet Snapping:** Snaps dragged points to adjacent collider surfaces in the scene.

![Scene Editor Settings](/images/tensio/editor_settings.gif)

---

## 2. Point Editor Window

Clicking on any individual control point opens a detailed contextual inspector window:

![Point Editor Window](/images/tensio/point_editor_window.gif)

* **Pinning Controls:**
  * **Pinned Checkbox:** Toggles fixed constraint status for this point.
  * **Target Field:** Assigns the anchor GameObject or Rigidbody.
  * **Eye Dropper:** Interactive ray-picker to select anchor objects directly in the 3D scene.
  * **Offset Vector:** Local spatial offset from the anchor's pivot point.
* **Curve Tangent Modes:**
  * **Mirrored:** Both tangents remain opposite and equal in magnitude (smooth curve).
  * **Aligned:** Tangents share direction but can have independent lengths.
  * **Free:** Tangents operate completely independently, creating sharp angles.
* **Utility Actions:**
  * **Focus:** Re-centers the Scene View camera on the active control point.
  * **Delete:** Removes the point and welds adjacent curve segments.

---

## 3. Mouse Shortcuts

Tensio makes editing ropes in the Scene View rapid and intuitive:

![Mouse Shortcuts in Scene View](/images/tensio/shortcuts.gif)

| Shortcut | Action |
| :--- | :--- |
| **Left Click** | Selects an individual control point. |
| **Ctrl + Left Click (on curve)** | Subdivides the segment and inserts a new point at cursor location. |
| **Ctrl + Left Click (on empty space)** | Appends an additional control point extending the end of the rope. |
| **Shift + Left Click** | Adds or removes control points from the current multi-selection. |
| **Delete / Backspace** | Removes currently selected control points. |
