# 01. Giriş ve Kurulum

[← Ana Sayfaya Dön](README.md) | [Sonraki Bölüm: Temel Kavramlar ve Mimari →](02-core-concepts-and-architecture.md)

---

## 🎯 FuzzyTypo Nedir?

**FuzzyTypo**, modern oyun ve UI geliştirme süreçlerinde **TextMeshPro** bileşenlerinin kontrolsüz, dağınık ve birbirinden kopuk şekilde yönetilmesini önlemek amacıyla geliştirilmiş **Merkezi Tipografi ve Tasarım Sistemi (Design Tokens) Yönetim Paketidir**.

Klasik Unity iş akışlarında her UI metni (Button, Title, Subtitle, Tooltip, Chat vb.) kendi font boyutunu, rengini, satır boşluğunu ve materyal preset'ini bağımsız olarak taşır. Bir projenin kurumsal yazı tipini, ana renk paletini veya diller arası ölçekleme kurallarını değiştirmek yüzlerce prefabı ve onlarca sahneyi tek tek gezmeyi gerektirir.

**FuzzyTypo** bu karmaşayı sonlandırır:
1. Web ve tasarım dünyasının endüstri standardı olan **Design Tokens** yaklaşımını Unity dünyasına taşır.
2. Metin bileşenlerini doğrudan stillere bağlayarak **tek merkezden anında güncelleme** imkanı verir.
3. Çalışma zamanında (Runtime) **sıfır bellek ayırma (Zero-GC)** prensibiyle performans kaybı olmadan tema ve dil geçişleri sağlar.

---

## 💻 Sistem Gereksinimleri ve Uyumluluk

FuzzyTypo, modern Unity motor sürümleriyle tam uyumlu olacak şekilde inşa edilmiştir:

| Gereksinim | Minimum Sürüm | Önerilen / Test Edilen |
| :--- | :--- | :--- |
| **Unity Sürümü** | `Unity 2021.3 LTS` | `Unity 2022.3 LTS`, `Unity 2023.2`, `Unity 6 (6000.0+)` |
| **Paket Bağımlılıkları** | `TextMeshPro` (dahili paket) | `com.unity.textmeshpro` 3.0.6+ |
| **Editör Arayüzü** | `UI Toolkit` | Unity yerleşik UI Toolkit motoru |
| **Render Pipeline** | Yerleşik (Built-in) / URP / HDRP | Tüm Render Pipeline'lar desteklenir |
| **Platform Hedefleri** | Tüm platformlar | Windows, macOS, Linux, iOS, Android, WebGL, Konsollar |

> [!NOTE]
> FuzzyTypo, Unity 6 ile gelen `FindObjectsByType` API değişikliklerini ve arka plan worker thread FontEngine güvenlik mekanizmalarını dahili olarak destekler. Konsolda herhangi bir uyarı (deprecation warning) veya çökme yaşanmaz.

---

## 📦 Paket Yapısı ve Klasör Hiyerarşisi

FuzzyTypo projenize eklendiğinde standart olarak şu klasör hiyerarşisinde yapılandırılır:

```text
Assets/
└── FuzzyLogicLabs/
    └── FuzzyTypo/
        ├── DefaultFuzzyTheme.asset          # Projenin varsayılan başlangıç teması
        ├── Resources/
        │   ├── FuzzyTypoSettings.asset      # Global proje ayarları ScriptableObject'i
        │   └── FuzzyLogicLabsBanner.png     # Görsel kimlik varlığı
        ├── Runtime/                         # Oyun derlemesinde (Player) çalışan kodlar
        │   ├── Core/                        # Linker, Manager, RuntimeDemo
        │   ├── Data/                        # Style, Theme, Settings, OverrideFlags
        │   └── Localization/                # Dil yönetimi, profil ve kural sınıfları
        ├── Editor/                          # Sadece editörde çalışan araçlar ve paneller
        │   ├── Dashboard/                   # UI Toolkit UXML/USS ve Master Dashboard
        │   ├── Tools/                       # Auto-Migrator, Glyph Analyzer, Swapper
        │   ├── Analytics/                   # Font & Prefab analitik motorları
        │   ├── Build/                       # Bake & Strip build işlemcisi
        │   └── Utilities/                   # Demo oluşturucu ve doğrulama araçları
        └── Samples/                         # Örnek temalar, profiller ve UI prefabları
```

---

## 🚀 Karşılama Penceresi (Welcome Window)

Paket içe aktarıldığında veya Unity ilk kez açıldığında geliştiricileri karşılamak için şık bir **Welcome Window** belirir.

Bu pencereye dilediğiniz zaman şu menüden ulaşabilirsiniz:  
**Window > Fuzzy Logic Labs > FuzzyTypo > Welcome Window**

![FuzzyTypo Karşılama Penceresi (Welcome Window)](images/03-welcome-window.png)

### Karşılama Penceresi Yetenekleri:
* **Hızlı Aksiyon:** *"Open Master Dashboard"* butonu ile doğrudan ana kontrol merkezine yönlendirir.
* **Topluluk ve Destek:** Discord kanalına, dokümantasyon sayfasına ve destek e-postasına tek tıkla erişim.
* **Sürüm Kontrolü:** Projenizde yüklü olan FuzzyTypo sürümünü ve son güncellemeleri gösterir.
* **Otomatik Gösterim Tercihi:** İsteğe bağlı olarak ilk açılışta tekrar gösterilmesi engellenebilir.

---

## ⚙️ Proje Ayarları (Project Settings Yapılandırması)

FuzzyTypo, Unity'nin standart `Project Settings` penceresine sorunsuz bir şekilde entegre olur.

Ayarlara erişmek için:
1. Unity menüsünden **Edit > Project Settings** penceresini açın.
2. Sol menü listesinden **FuzzyTypo** sekmesini seçin.

![FuzzyTypo Project Settings Görünümü](images/04-project-settings.png)

### Yapılandırma Parametreleri Açıklaması:

| Parametre | Tip | Varsayılan | Açıklama |
| :--- | :--- | :--- | :--- |
| **Active Theme** | `FuzzyTheme` | `DefaultFuzzyTheme` | Sahnedeki ve çalışma zamanındaki tüm bağlı metinlerin varsayılan olarak referans alacağı aktif tema varlığı. |
| **Fallback Theme** | `FuzzyTheme` | `None` | Aktif temada bir stil ID'si bulunamazsa (örneğin tema güncellenirken bir stil henüz eklenmemişse) başvurulacak kurtarma teması. |
| **Available Themes** | `List<FuzzyTheme>` | Otomatik | Projede kayıtlı olan ve çalışma zamanında dinamik olarak geçiş yapılabilecek temaların listesi. |
| **Default Locale** | `string` | `"default"` | Dil bazlı özel stil ezmesi yapılmadığında kullanılan varsayılan dil kodu (Örn: `en`, `tr`). |
| **Localization Profile** | `FuzzyLocalizationProfile` | `None` | Dil bazında genel font ve satır aralığı ölçeklendirme kurallarını barındıran küresel profil. |
| **Auto Live Sync in Editor** | `bool` | `true` | Dashboard'da veya tema varlığında bir stil değiştirildiği anda sahnedeki metinlerin anında güncellenmesini sağlar. |
| **Log Missing Glyphs** | `bool` | `true` | Bir font varlığında ihtiyaç duyulan karakterler eksik olduğunda konsola açıklayıcı uyarılar basar. |
| **Strip Linkers on Build (Pro)** | `bool` | `false` | Etkinleştirildiğinde, oyun derlemesi (Build) sırasında sahnelerdeki linker bileşenlerini kalıcı olarak sıyırır (Bake & Strip). |

---

## 🔄 İlk Kurulum Kontrol Listesi

FuzzyTypo'yu projenize başarıyla kurduktan sonra şu üç adımı doğrulayın:

1. [x] **Settings Varlığı:** `Assets/FuzzyLogicLabs/FuzzyTypo/Resources/FuzzyTypoSettings.asset` dosyasının mevcut olduğunu kontrol edin.
2. [x] **Örnek Temalar:** İhtiyaç duyarsanız **Settings & Pro** sekmesinden *"Generate Starter Themes"* butonuna basarak örnek temaları yükleyin.
3. [x] **TextMeshPro:** TextMeshPro Essential Resources paketinin projenize import edilmiş olduğundan emin olun (`Window > TextMeshPro > Import TMP Essential Resources`).

---

[← Ana Sayfaya Dön](README.md) | [Sonraki Bölüm: Temel Kavramlar ve Mimari →](02-core-concepts-and-architecture.md)
