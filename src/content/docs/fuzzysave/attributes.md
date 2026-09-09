---
title: "Attributes & Code-First Architecture"
description: "Declarative C# attribute annotations for save fields, groups, and custom serialization callbacks."
slug: docs/fuzzysave/attributes
---

While FuzzySave includes visual no-code tools, it equally champions a **Code-First Architecture**. Developers who prefer expressive, declarative C# code can annotate their scripts with custom attributes to integrate seamlessly with the save engine.

---

## 1. Declarative Attribute Set (`FuzzySaveAttributes.cs`)

All attributes reside in the `FuzzyLogicLabs.FuzzySave` namespace.

```csharp
using FuzzyLogicLabs.FuzzySave;
```

### 1.1 `[FuzzySave]`

Marks a class or struct as savable by the FuzzySave engine.
* **Target:** `AttributeTargets.Class | AttributeTargets.Struct`
* **Parameters:**
  * `groupName` *(optional)*: The default Save Group this class belongs to (e.g., `"PlayerGroup"`, `"Inventory"`, `"WorldData"`).

```csharp
[FuzzySave("PlayerGroup")]
public class PlayerController : MonoBehaviour
{
    // ...
}
```

### 1.2 `[SaveField]`

Marks a field or property to be included in saves, with an optional custom key alias.
* **Target:** `AttributeTargets.Field | AttributeTargets.Property`
* **Parameters:**
  * `alias` *(optional)*: A clean, persistent key name for serialization. If omitted, the C# variable name is used.
* **Visibility:** Works with both `public` and `private` / `protected` fields.

```csharp
public class PlayerStats : MonoBehaviour
{
    [SaveField("player_hp")]
    public int currentHP = 100;

    [SaveField("player_gold")]
    public int gold = 250;

    [SaveField("mana_pool")]
    private float m_Mana = 50.0f;

    // Unmarked fields are automatically ignored by default
    public float temporarySpeedBuff = 0f;
}
```

### 1.3 `[SaveGroup]`

Provides inline group-level configuration overrides directly above a class or field.
* **Target:** `AttributeTargets.Class | AttributeTargets.Struct | AttributeTargets.Field`
* **Properties:**
  * `Name` (`string`): The group identifier.
  * `Encrypted` (`bool`): Forces AES-256 encryption specifically for this group.
  * `Compressed` (`bool`): Forces GZip compression specifically for this group.

```csharp
[SaveGroup("SecureFinancialData", Encrypted = true, Compressed = true)]
public class BankAccount : MonoBehaviour
{
    [SaveField] public int gems;
    [SaveField] public string secretToken;
}
```

### 1.4 `[SaveEvent]`

Attaches to a C# event or `Action` delegate to automatically trigger a save of a target group when the event fires.
* **Target:** `AttributeTargets.Event | AttributeTargets.Field`
* **Parameters:**
  * `targetGroup` (`string`): The name of the group to persist upon invocation.

```csharp
public class QuestManager : MonoBehaviour
{
    [SaveEvent("QuestLog")]
    public event System.Action OnQuestCompleted;

    public void CompleteQuest(string id)
    {
        // Completing the quest automatically triggers SaveGroupAsync("QuestLog")
        OnQuestCompleted?.Invoke();
    }
}
```

---

## 2. Complete Code-First Example

Here is an example showing how attributes, custom data classes, and C# collections integrate cleanly:

```csharp
using System;
using System.Collections.Generic;
using UnityEngine;
using FuzzyLogicLabs.FuzzySave;

[Serializable]
public class InventoryItem
{
    public string itemId;
    public int quantity;
    public float durability;
}

[FuzzySave("InventorySystem")]
public class PlayerInventory : MonoBehaviour
{
    [SaveField("wallet_coins")]
    public int coins = 100;

    [SaveField("items_list")]
    public List<InventoryItem> items = new List<InventoryItem>();

    [SaveField("equipped_slots")]
    public Dictionary<string, string> equippedGear = new Dictionary<string, string>
    {
        { "Head", "IronHelmet" },
        { "Weapon", "SteelBroadsword" }
    };

    [SaveField("last_saved_position")]
    public Vector3DTO lastCampfirePosition;

    public void AddItem(string id, int qty)
    {
        items.Add(new InventoryItem { itemId = id, quantity = qty, durability = 100f });
    }
}
```

---

## 3. CodeMod: The Automated Refactoring Tool (`CodeRewriter.cs`)

When adopting FuzzySave in an existing codebase, scripts often contain standard Unity mathematical types (`Vector3`, `Quaternion`, `Color`) that could benefit from zero-allocation DTO structs.

FuzzySave includes an automated C# source-code refactoring tool: `CodeRewriter`.

### Capabilities

* **Target Types:** `Vector2`, `Vector3`, `Vector4`, `Quaternion`, `Color`, `Color32`, `Rect`, `Bounds`.
* **Regex AST Transformation:** Accurately identifies variable declarations and converts them to their corresponding DTO types (e.g., `Vector3 playerPos;` -> `Vector3DTO playerPos;`).
* **Non-Destructive Reversion:** Provides bidirectional conversion (`ConvertFieldToDTO` and `RevertFieldFromDTO`).
* **Unity Asset Pipeline Integration:** Automatically re-imports modified scripts via `AssetDatabase.ImportAsset(filePath, ImportAssetOptions.ForceUpdate)`.
