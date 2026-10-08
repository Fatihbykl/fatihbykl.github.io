# 🖼️ FuzzyTypo Dokümantasyon Görselleri Rehberi

Bu klasör (`Assets/Docs/images/`), FuzzyTypo dokümantasyon sayfalarında referans verilen tüm ekran görüntülerinin, diyagramların ve banner'ların toplandığı merkezdir.

Dokümantasyondaki tüm markdown sayfalarında **görsel yer tutucuları (placeholder)** kullanılmıştır. Projenizi ve editör pencerelerinizi fotoğraflayıp bu dizine ilgili isimlerle kaydettiğinizde tüm dokümantasyonunuz otomatik olarak zengin görsellere kavuşacaktır.

---

## 📸 Ekran Görüntüsü Alma İpuçları
* **Çözünürlük:** Editör pencereleri için `1920x1080` veya pencereye göre `1280x720` civarında net ekran görüntüleri önerilir.
* **Format:** Web ve markdown uyumluluğu için tüm görselleri `.png` formatında kaydedin.
* **Editör Teması:** Görsel tutarlılığı açısından Unity Editor **Dark Skin** (Pro Theme) kullanılması önerilir.

---

## 📑 Görsel Yer Tutucuları Kataloğu

Aşağıdaki tabloda dokümantasyonda kullanılan tüm görsel referansları, bulundukları sayfa ve neyin ekran görüntüsü alınması gerektiği listelenmiştir:

| Dosya Adı | Bulunduğu Sayfa | Önerilen Çözünürlük | Açıklama / Ne Çekilmeli? |
| :--- | :--- | :--- | :--- |
| `fuzzytypo-banner.png` | `README.md` | `1200 x 400` | FuzzyTypo ana tanıtım afişi veya `FuzzyLogicLabsBanner.png` görseli. |
| `01-dashboard-tokens-overview.png` | `README.md` | `1280 x 720` | Master Dashboard penceresinin genel açık görünümü. |
| `02-linker-inspector-overview.png` | `README.md` | `600 x 400` | Bir metin nesnesine ekli FuzzyTypoLinker Inspector görünümü. |
| `03-welcome-window.png` | `01-introduction-and-setup.md` | `650 x 850` | Unity ilk açıldığında gelen FuzzyTypo Welcome Window. |
| `04-project-settings.png` | `01-introduction-and-setup.md` | `800 x 600` | `Edit > Project Settings > FuzzyTypo` ayarlar sekmesi. |
| `05-design-tokens-concept.png` | `02-core-concepts-and-architecture.md` | `1000 x 500` | Design Tokens mimarisi veya stiller ile metinlerin bağlantısını anlatan şema. |
| `06-linker-inspector-details.png` | `03-fuzzytypo-linker.md` | `600 x 500` | FuzzyTypoLinker Inspector detayları ve stil seçim açılır menüsü. |
| `07-local-overrides-checkboxes.png` | `03-fuzzytypo-linker.md` | `600 x 300` | Linker üzerindeki Local Overrides onay kutuları (Color, Size vb.). |
| `08-master-dashboard-tokens-tab.png` | `04-master-dashboard-tokens-studio.md` | `1280 x 720` | Master Dashboard'un Tokens Studio sekmesi (3 sütun açık). |
| `09-tokens-left-column.png` | `04-master-dashboard-tokens-studio.md` | `400 x 600` | Sol sütundaki stiller listesi, arama ve kategori filtre çipleri. |
| `10-modular-scale-modal.png` | `04-master-dashboard-tokens-studio.md` | `600 x 400` | "⚡ Scale" butonuna basıldığında açılan modüler skala sihirbazı. |
| `11-style-inspector-form.png` | `04-master-dashboard-tokens-studio.md` | `700 x 800` | Orta sütundaki Style Inspector formu ve canlı önizleme tuvali. |
| `12-usage-explorer-drawer.png` | `04-master-dashboard-tokens-studio.md` | `400 x 600` | Sağ taraftan açılan Usage Explorer referans çekmecesi. |
| `13-scene-governance-overview.png` | `05-master-dashboard-scene-governance.md` | `1280 x 720` | Scene Governance sekmesinin genel taranmış nesneler görünümü. |
| `14-context-roles-badges.png` | `05-master-dashboard-scene-governance.md` | `800 x 400` | Listede `[Button]`, `[InputField]`, `[Toggle]` rozetlerinin göründüğü yakın çekim. |
| `15-batch-selection-toolbar.png` | `05-master-dashboard-scene-governance.md` | `900 x 200` | Toplu seçim butonları ve Batch Assign / Smart Auto-Link araç çubuğu. |
| `16-drawer-material-swapper.png` | `05-master-dashboard-scene-governance.md` | `900 x 300` | Entegre Batch Material Swapper çekmecesinin açık hali. |
| `17-health-autofix-overview.png` | `06-health-and-autofix-studio.md` | `1280 x 720` | Health & Auto-Fix Studio sekmesi ve yeşil Sağlık Skoru göstergesi (%100). |
| `18-linter-issues-list.png` | `06-health-and-autofix-studio.md` | `900 x 500` | Linter tarafından bulunan sorun kartları ve filtreleme çipleri. |
| `19-insights-analytics-overview.png` | `07-insights-and-analytics.md` | `1280 x 720` | Insights & Analytics Studio iki sütunlu genel görünümü. |
| `20-font-analytics-column.png` | `07-insights-and-analytics.md` | `600 x 600` | Fontların atlas boyutlarını ve MB bellek ağırlığını gösteren sol sütun. |
| `21-prefab-matrix-column.png` | `07-insights-and-analytics.md` | `600 x 600` | Prefabların kapsama oranlarını (`100%`) gösteren sağ sütun. |
| `22-drawer-font-replacer.png` | `07-insights-and-analytics.md` | `900 x 300` | Safe Font Replacer çekmecesinin açık hali. |
| `23-role-distribution-bar.png` | `07-insights-and-analytics.md` | `900 x 150` | Pencere altındaki UI Hiyerarşik Rol Dağılımı çubuğu. |
| `24-settings-pro-grid.png` | `08-settings-and-pro-features.md` | `1280 x 720` | Settings & Pro sekmesindeki 4 yapılandırma kartı. |
| `25-bake-strip-card.png` | `08-settings-and-pro-features.md` | `600 x 350` | Build Optimization (Bake & Strip) kartının yakın çekimi. |
| `26-json-tokens-card.png` | `08-settings-and-pro-features.md` | `600 x 350` | Tokens Interoperability (Figma / JSON) kartının yakın çekimi. |
| `27-quick-setup-card.png` | `08-settings-and-pro-features.md` | `600 x 350` | Quick Setup & Utilities kartının yakın çekimi. |
| `28-localization-profiles-card.png` | `08-settings-and-pro-features.md` | `900 x 400` | Smart Localization Profiles alt panelinin açık hali. |
| `29-localization-profile-inspector.png` | `09-localization-and-multilingual.md` | `700 x 500` | Bir `FuzzyLocalizationProfile` varlığının Inspector görünümü. |
| `30-style-locale-override.png` | `09-localization-and-multilingual.md` | `600 x 350` | Stil içindeki LocaleOverride (Japonca boyut çarpanı) alanı. |
| `31-auto-migrator-window.png` | `10-standalone-tools.md` | `800 x 600` | Bağımsız FuzzyAutoMigrator penceresi. |
| `32-glyph-analyzer-window.png` | `10-standalone-tools.md` | `800 x 600` | Bağımsız FuzzyGlyphAnalyzer penceresi ve Türkçe karakter raporu. |
| `33-material-swapper-window.png` | `10-standalone-tools.md` | `800 x 600` | Bağımsız FuzzyMaterialSwapper penceresi. |
| `34-runtime-demo-controller.png` | `11-runtime-api-and-scripting.md` | `500 x 600` | Play Mode'da ekranda beliren FuzzyTypoRuntimeDemo paneli. |

---

> [!TIP]
> Projenizde `Assets/FuzzyLogicLabs/FuzzyTypo/Resources/FuzzyLogicLabsBanner.png` dosyası mevcuttur. Dilerseniz bunu doğrudan `images/fuzzytypo-banner.png` olarak kopyalayabilirsiniz!
