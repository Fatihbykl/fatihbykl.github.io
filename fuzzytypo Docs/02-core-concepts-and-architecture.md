# 02. Temel Kavramlar ve Mimari

[← Önceki Bölüm: Giriş ve Kurulum](01-introduction-and-setup.md) | [Ana Sayfa](README.md) | [Sonraki Bölüm: FuzzyTypoLinker Bileşeni →](03-fuzzytypo-linker.md)

---

## 🏛️ Mimari Katmanlar (Architecture Overview)

FuzzyTypo, birbirine gevşek bağlı (loosely coupled), yüksek performanslı ve sürdürülebilir üç ana katmandan oluşur:

```mermaid
graph TD
    subgraph DataLayer["1. Veri Katmanı (Data Layer - ScriptableObjects)"]
        Theme["FuzzyTheme (ScriptableObject)"]
        Style["FuzzyTextStyle (Tokens)"]
        LocProf["FuzzyLocalizationProfile"]
        Theme --> Style
    end

    subgraph RuntimeLayer["2. Çalışma Zamanı (Runtime Layer - Zero GC)"]
        Manager["FuzzyTypoManager (Static Service)"]
        Linker["FuzzyTypoLinker (Bridge MonoBehaviour)"]
        TMPText["TMP_Text (TextMeshProUGUI / 3D)"]
        Manager -->|Events| Linker
        Linker -->|Applies Values| TMPText
        Theme -.->|O(1) Token Lookup| Manager
    end

    subgraph EditorLayer["3. Editör Katmanı (Editor Layer - UI Toolkit)"]
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

## 🎨 Tasarım Sistemi ve Design Tokens Yaklaşımı

Geleneksel oyun geliştirmede her metin kutusu kendi parametrelerini yerel olarak saklar:
* Bir buton metninin font boyutu `18`, rengi `#FFFFFF` ve fontu `LiberationSans` olarak doğrudan bileşen üzerine yazılır.
* Oyunun ilerleyen safhalarında buton yazılarını `20` piksel yapmak ve marka rengi olarak `#FFD700` (Altın Sarısı) kullanmak istendiğinde, yüzlerce prefabı tek tek açıp düzenlemek gerekir.

**FuzzyTypo Design Tokens çözümü:**
Metin bileşenleri ham değerler taşımak yerine anlamsal bir **Token (Belirteç)** referansı tutar (Örn: `Buttons / Button Label`).
Değer değiştiğinde, o belirteci dinleyen tüm metinler tek bir merkezden anında güncellenir.

![Tasarım Belirteçleri (Design Tokens) Şeması](images/05-design-tokens-concept.png)

---

## 📋 Veri Modelleri (Data Models)

### 1. `FuzzyTextStyle` (Stil Belirteci)
Tek bir tipografik stil tanımını temsil eden zengin veri sınıfıdır.

```csharp
[Serializable]
public class FuzzyTextStyle
{
    // Tanımlayıcılar
    public string Id { get; }            // Benzersiz ve değişmez GUID
    public string StyleName { get; set; } // Örn: "Heading 1", "Body Regular"
    public string Category { get; set; }  // Örn: "Headings", "Body", "Buttons"
    public string Description { get; set; }

    // Tipografi & Materyal
    public TMP_FontAsset FontAsset { get; set; }
    public Material MaterialPreset { get; set; }

    // Boyutlandırma
    public float FontSize { get; set; }
    public bool EnableAutoSizing { get; set; }
    public float FontSizeMin { get; set; }
    public float FontSizeMax { get; set; }

    // Görsel Stil & Renk
    public Color Color { get; set; }
    public FontStyles FontStyle { get; set; } // Bold, Italic, UpperCase vb.

    // Hizalama ve Boşluklar
    public TextAlignmentOptions Alignment { get; set; }
    public float CharacterSpacing { get; set; }
    public float LineSpacing { get; set; }
    public float ParagraphSpacing { get; set; }
    public float WordSpacing { get; set; }

    // Çok Dilli Ezmeler
    public List<LocaleOverride> LocaleOverrides { get; }
}
```

### 2. `FuzzyTheme` (ScriptableObject)
Bir temayı temsil eder (Örn: `SampleDarkTheme`, `SampleLightTheme`, `CyberpunkTheme`).
İçerisinde `FuzzyTextStyle` koleksiyonunu barındırır ve çalışma zamanında **$O(1)$** hızında arama yapabilmek için dahili bir Dictionary önbelleği (`m_StyleLookupCache`) yönetir.

```csharp
[CreateAssetMenu(fileName = "NewFuzzyTheme", menuName = "FuzzyTypo/Fuzzy Theme")]
public class FuzzyTheme : ScriptableObject
{
    public string ThemeId { get; }
    public string ThemeName { get; set; }
    public List<FuzzyTextStyle> Styles { get; }

    public FuzzyTextStyle GetStyleById(string styleId);   // O(1) önbellekli arama
    public FuzzyTextStyle GetStyleByName(string styleName);
    public void AddStyle(FuzzyTextStyle style);
    public bool RemoveStyle(string styleId);
    public FuzzyTextStyle DuplicateStyle(string styleId);
}
```

---

## 🔑 Neden GUID Tabanlı Eşleşme? (Immutable GUID)

FuzzyTypo'da her stil oluşturulduğunda arkada kalıcı bir **GUID** atanır (Örn: `c7e48b9a-12d4-4f90-a3bc-91e847c2a110`).

> [!IMPORTANT]
> **İsim Tabanlı Eşleşmenin Tehlikesi:**  
> Eğer stiller `Heading 1` gibi düz isimlerle eşleştirilseydi, tasarım ekibi stili `H1 / Hero Display` olarak yeniden adlandırdığı anda sahnelerdeki ve prefab varyantlarındaki tüm referanslar kopardı (Missing Reference).
> 
> **FuzzyTypo GUID Çözümü:**  
> Stilin adı, kategorisi veya parametreleri dilediğiniz kadar değişebilir. GUID değişmediği için sahneleriniz ve prefablarınız asla bozulmaz. Ayrıca farklı temalar arasında (Dark vs Light) aynı GUID kullanılarak temalar arası kusursuz geçiş sağlanır.

---

## ⚡ Sıfır Çöp Bellek (Zero-GC) Prensipleri

Mobil, VR/AR ve konsol oyunlarında bellek çöpü (Garbage Collection Spikes) doğrudan kare atlamalarına (stutter) yol açar. FuzzyTypo, çalışma zamanı motorunu sıfır GC felsefesiyle inşa etmiştir:

1. **Hiçbir `Update()` Döngüsü Yoktur:**  
   `FuzzyTypoLinker` bileşeninde `Update` metodu bulunmaz. Kod sadece bileşen sahneye girdiğinde (`OnEnable`) veya tema/dil değiştiğinde (`event invocation`) çalışır.
2. **Çalışma Zamanında LINQ ve String Boxing Yoktur:**  
   Runtime arama algoritmalarında LINQ `Where`, `FirstOrDefault` gibi heap alloc üreten metotlar yerine önceden dizinlenmiş Dictionary ve ilkel döngüler kullanılır.
3. **Statik C# Action Delegeleri:**  
   `FuzzyTypoManager` olayları statik referanslarla tetiklenir, `UnityEvent` gibi heap tahsisi oluşturan yapılar runtime çekirdeğinde yer almaz.

---

[← Önceki Bölüm: Giriş ve Kurulum](01-introduction-and-setup.md) | [Ana Sayfa](README.md) | [Sonraki Bölüm: FuzzyTypoLinker Bileşeni →](03-fuzzytypo-linker.md)
