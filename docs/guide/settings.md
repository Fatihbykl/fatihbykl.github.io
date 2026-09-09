# IDE Settings

FuzzyIDE provides an extensive settings panel built directly into Unity's Preferences window. You can access these settings by navigating to **Edit > Preferences > Fuzzy Logic Labs > Code IDE** (or **Unity > Preferences** on macOS). 

The settings are categorized into five main tabs:

## 1. Editor
This section controls the basic text rendering and layout of the code viewer.
- **Font Family**: Select your preferred coding font (e.g., JetBrainsMono, Consolas). The IDE automatically scans your project for available fonts.
- **Font Size**: Adjusts the base size of the text.
- **Line Height Spacing**: Controls the vertical gap between lines of code to improve readability (default is `1.6`).
- **Tab Width**: Sets the number of spaces that a single tab character represents (default is `4`).

## 2. Theme
Customize the colors of the IDE to match your aesthetic.
- **Theme Preset**: Quickly switch between built-in themes: `Dark`, `Light`, `Monokai`, or `HighContrast`. Choosing `Custom` allows you to define your own palette.
- **UI Elements**: Customize the overall IDE colors such as `Background`, `Gutter Background` (line numbers area), `Active Line Background`, and `Selection Highlight`.
- **Syntax Highlighting**: Fine-tune specific token colors for C# elements like `Keyword`, `Method`, `Variable`, `String`, `Comment`, and `Type`.

## 3. Behaviors
Control how the IDE reacts to your inputs and general usage.
- **Double-Tap Shift Threshold (s)**: The time limit (in seconds) to trigger actions that require pressing Shift twice (e.g., Quick Search).
- **Auto-close Brackets**: Automatically inserts the corresponding closing bracket ( `}`, `)`, `]` ) when you type an opening one.
- **Open Scripts in Fuzzy IDE Default**: If enabled, double-clicking any C# script in Unity will open it in FuzzyIDE instead of an external editor like Visual Studio.
- **Smart Drag & Drop**: Controls what happens when you drag a Unity asset into the code. Options include `ContextMenu` (asks you what to do) or `AutoAssign` (does it automatically).
- **Minimap Visible**: Toggles the code minimap view on the right edge of the editor.
- **Scroll Speed Multiplier**: Adjusts how fast the code viewer scrolls when using the mouse wheel.

## 4. Keybindings
Fully remap the IDE's keyboard shortcuts.
- You can modify the shortcuts for every core action like `SemanticRename`, `FindReferences`, `QuickSearch`, `DuplicateLine`, etc.
- Assign standard `Modifiers` (Ctrl, Shift, Alt, Cmd) alongside any `KeyCode`.
- Use the **Reset to Defaults** button if you want to restore the original FuzzyIDE layout.

## 5. AI Assistant
Configure the integrated AI co-pilot.
- **Active Provider**: Choose your preferred AI engine (`OpenAI`, `Gemini`, or `Claude`).
- **API Key**: Enter the API key for your chosen provider. *(Note: Keys are stored locally and securely in Unity's `EditorPrefs`.)*
