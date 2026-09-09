# Core Classes & Architecture

This document provides a high-level overview of the main classes powering the Virtual IDE and code virtualization logic in FuzzyIDE.

## VirtualIDEWindow
**Namespace:** `FuzzyLogicLabs.FuzzyIDE.Editor.UI`

This is the primary `EditorWindow` that acts as the container for the IDE. It integrates multiple sub-systems:
- **UI Toolkit layout:** Replaces standard `OnGUI` calls with performant VisualElements.
- **Split Views:** Supports multi-pane layout for file comparison and parallel editing.
- **Toolbars:** Injects native Unity icons and provides quick actions (Save, Recompile, Find).

### Extending the IDE Window
The `VirtualIDEWindow` is a standard Unity `EditorWindow`. You can inject additional panels using `rootVisualElement`.
```csharp
var myCustomPanel = new VisualElement();
// Customize and add to the window's root
VirtualIDEWindow.Instance.rootVisualElement.Add(myCustomPanel);
```

## VirtualizedCodeViewer
**Namespace:** `FuzzyLogicLabs.FuzzyIDE.Editor.UI`

This class handles the core text editing capabilities. Because standard Unity text fields struggle with thousands of lines of code, `VirtualizedCodeViewer` implements **UI Virtualization**:
- Only renders the lines of code currently visible in the scroll view viewport.
- Handles custom text interactions (cursor placement, syntax highlighting, selection).
- Maps keyboard events to specific actions using `CodeIDESettings.Current.Keybindings`.

### Registering Custom Actions
Inside `VirtualizedCodeViewer`, UI buttons can trigger shortcut actions dynamically. The internal method structure maps `IDEAction` enums to user actions:
```csharp
// Example internal action binding structure
addButton("Custom Action", "Ctrl+K", () => {
    // Perform custom logic here
});
```

## CodeIDESettings
**Namespace:** `FuzzyLogicLabs.FuzzyIDE.Editor.Core`

A configuration class that holds global settings for the IDE environment, including:
- Keyboard shortcuts and keybindings mapping (`IDEAction`).
- Color themes and font settings.
- Integration flags for Language Services (like OmniSharp or Roslyn).

## TextHistoryManager
**Namespace:** `FuzzyLogicLabs.FuzzyIDE.Editor.Core`

Handles the Undo/Redo stack for the text editor, keeping memory overhead low by diffing changes efficiently.

## LanguageServices
**Namespace:** `FuzzyLogicLabs.FuzzyIDE.Editor.Core`

Responsible for providing semantic code intelligence:
- Parsing syntax trees.
- Providing completion items (Auto-complete).
- Resolving symbol references for actions like **Semantic Rename** and **Find All References**.
