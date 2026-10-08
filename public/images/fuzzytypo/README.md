# 🖼️ FuzzyTypo Documentation Media Guide

This folder (`public/images/fuzzytypo/`) stores all screenshots, diagrams, and banner assets referenced throughout the FuzzyTypo documentation.

The documentation markdown pages make use of **image placeholders**. By capturing screenshots of your project windows and placing them here with matching filenames, the documentation pages will automatically render rich visuals.

---

## 📸 Screenshot Capture Guidelines
* **Resolution:** Recommended resolution is `1920x1080` (or `1280x720` for standalone sub-windows) for crisp readability.
* **Format:** Save all visuals as `.png` files.
* **Editor Theme:** For visual consistency, capturing in Unity Editor **Dark Skin** (Pro Theme) is recommended.

---

## 📑 Media Asset Catalog

The table below lists all image references, their host chapters, and what editor view they represent:

| Filename | Document Page | Recommended Size | Description / What to Capture |
| :--- | :--- | :--- | :--- |
| `fuzzytypo-banner.png` | `index.md` | `1200 x 400` | FuzzyTypo primary hero showcase banner. |
| `01-dashboard-tokens-overview.png` | `index.md` | `1280 x 720` | Full view of the Master Dashboard window. |
| `02-linker-inspector-overview.png` | `index.md` | `600 x 400` | Inspector view of a text GameObject with FuzzyTypoLinker attached. |
| `03-welcome-window.png` | `01-introduction-and-setup.md` | `650 x 850` | FuzzyTypo Welcome Window shown upon initial Unity launch. |
| `04-project-settings.png` | `01-introduction-and-setup.md` | `800 x 600` | `Edit > Project Settings > FuzzyTypo` settings view. |
| `05-design-tokens-concept.png` | `02-core-concepts-and-architecture.md` | `1000 x 500` | Architectural diagram connecting design tokens to text components. |
| `06-linker-inspector-details.png` | `03-fuzzytypo-linker.md` | `600 x 500` | FuzzyTypoLinker Inspector UI with style selector dropdown. |
| `07-local-overrides-checkboxes.png` | `03-fuzzytypo-linker.md` | `600 x 300` | Local Overrides checkbox section on the Linker component. |
| `08-master-dashboard-tokens-tab.png` | `04-master-dashboard-tokens-studio.md` | `1280 x 720` | Master Dashboard Tokens Studio tab (all 3 columns visible). |
| `09-tokens-left-column.png` | `04-master-dashboard-tokens-studio.md` | `400 x 600` | Left pane showing search, category chips, and style items. |
| `10-modular-scale-modal.png` | `04-master-dashboard-tokens-studio.md` | `600 x 400` | Modular Type Scale generator modal opened from the "⚡ Scale" button. |
| `11-style-inspector-form.png` | `04-master-dashboard-tokens-studio.md` | `700 x 800` | Middle pane showing the Style Inspector form and Live Preview Canvas. |
| `12-usage-explorer-drawer.png` | `04-master-dashboard-tokens-studio.md` | `400 x 600` | Right drawer showing the Usage Explorer reference list. |
| `13-scene-governance-overview.png` | `05-master-dashboard-scene-governance.md` | `1280 x 720` | Full view of the Scene Governance tab with scanned objects. |
| `14-context-roles-badges.png` | `05-master-dashboard-scene-governance.md` | `800 x 400` | Close-up of context badges (`[Button]`, `[InputField]`, etc.). |
| `15-batch-selection-toolbar.png` | `05-master-dashboard-scene-governance.md` | `900 x 200` | Batch selection toolbar with Assign and Auto-Link actions. |
| `16-drawer-material-swapper.png` | `05-master-dashboard-scene-governance.md` | `900 x 300` | Integrated Material Swapper drawer expanded. |
| `17-health-autofix-overview.png` | `06-health-and-autofix-studio.md` | `1280 x 720` | Health & Auto-Fix Studio tab showing the 100% health gauge. |
| `18-linter-issues-list.png` | `06-health-and-autofix-studio.md` | `900 x 500` | Linter issue cards and category filter chips. |
| `19-insights-analytics-overview.png` | `07-insights-and-analytics.md` | `1280 x 720` | Insights & Analytics Studio two-column audit view. |
| `20-font-analytics-column.png` | `07-insights-and-analytics.md` | `600 x 600` | Left column showing font atlas sizes and VRAM footprint. |
| `21-prefab-matrix-column.png` | `07-insights-and-analytics.md` | `600 x 600` | Right column showing prefab typography coverage ratios (`100%`). |
| `22-drawer-font-replacer.png` | `07-insights-and-analytics.md` | `900 x 300` | Safe Font Replacer utility drawer expanded. |
| `23-role-distribution-bar.png` | `07-insights-and-analytics.md` | `900 x 150` | Bottom UI context role distribution meter. |
| `24-settings-pro-grid.png` | `08-settings-and-pro-features.md` | `1280 x 720` | 4 configuration cards in the Settings & Pro tab. |
| `25-bake-strip-card.png` | `08-settings-and-pro-features.md` | `600 x 350` | Build Optimization (Bake & Strip) configuration card. |
| `26-json-tokens-card.png` | `08-settings-and-pro-features.md` | `600 x 350` | Tokens Interoperability (Figma / JSON) card. |
| `27-quick-setup-card.png` | `08-settings-and-pro-features.md` | `600 x 350` | Quick Setup & Utilities card. |
| `28-localization-profiles-card.png` | `08-settings-and-pro-features.md` | `900 x 400` | Smart Localization Profiles management panel. |
| `29-localization-profile-inspector.png` | `09-localization-and-multilingual.md` | `700 x 500` | Inspector view of a `FuzzyLocalizationProfile` asset. |
| `30-style-locale-override.png` | `09-localization-and-multilingual.md` | `600 x 350` | Style Inspector view showing a culture-specific LocaleOverride. |
| `31-auto-migrator-window.png` | `10-standalone-tools.md` | `800 x 600` | Standalone FuzzyAutoMigrator window. |
| `32-glyph-analyzer-window.png` | `10-standalone-tools.md` | `800 x 600` | Standalone FuzzyGlyphAnalyzer window with character audit results. |
| `33-material-swapper-window.png` | `10-standalone-tools.md` | `800 x 600` | Standalone FuzzyMaterialSwapper window. |
| `34-runtime-demo-controller.png` | `11-runtime-api-and-scripting.md` | `500 x 600` | FuzzyTypoRuntimeDemo floating HUD active in Play Mode. |

---

> [!TIP]
> Place corresponding `.png` files in this directory with the exact filenames listed above. They will immediately render throughout your documentation.
