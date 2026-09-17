# 11. Attributes & Code-First Development

## 🏷️ Overview

While Visual Save Studio provides a visual workflow for technical designers, programmers often prefer **Code-First Architecture**.

FuzzySave provides declarative C# attributes that allow developers to tag classes, properties, fields, and events directly in script files.

---

## 📋 Attribute Reference Table

| Attribute | Valid Targets | Purpose |
|---|---|---|
| **`[FuzzySave]`** | `Class`, `Struct` | Registers the type with FuzzySave. Accepts an optional default Save Group name. |
| **`[SaveField]`** | `Field`, `Property` | Explicitly includes a variable in the save container. Accepts an optional key alias. |
| **`[SaveGroup]`** | `Class`, `Field` | Binds a class or field to a specific group, with optional encryption and compression flags. |
| **`[SaveEvent]`** | `Event`, `Action` | Automatically triggers an asynchronous save of the target group whenever this event fires. |
| **`[SaveExclude]`** | `Field`, `Property` | Explicitly excludes a public or serialized field from being saved. |

---

## 💻 Code-First Example: Player Character & Events

```csharp
using System;
using System.Collections.Generic;
using UnityEngine;
using FuzzyLogicLabs.FuzzySave;

[FuzzySave("PlayerGroup")]
public class PlayerHero : MonoBehaviour
{
    // Custom key alias saves disk space in JSON
    [SaveField("hp")]
    public int currentHealth = 100;

    [SaveField("mana")]
    public float currentMana = 50.0f;

    [SaveField("coins")]
    private int m_GoldCoins = 250;

    // Complex types are fully supported
    [SaveField("inventory")]
    public List<string> equippedGear = new List<string> { "Iron_Sword", "Leather_Boots" };

    // Explicitly ignored
    [SaveExclude]
    public float temporarySpeedBoost = 1.0f;

    // Event-Driven Auto Save:
    // Whenever OnLevelCompleted is invoked, "PlayerGroup" is automatically saved!
    [SaveEvent("PlayerGroup")]
    public event Action OnLevelCompleted;

    public void FinishLevel()
    {
        currentHealth = 100;
        m_GoldCoins += 500;
        
        // Invoking this automatically triggers a background save of PlayerGroup!
        OnLevelCompleted?.Invoke();
    }
}
```

---

## 🔒 Group-Specific Encryption via Attributes

You can isolate sensitive game values (like in-game currency or microtransaction unlocks) into an encrypted group while leaving regular gameplay settings unencrypted:

```csharp
[SaveGroup("SecuritySensitive", Encrypted = true, Compressed = true)]
public class PlayerWallet : MonoBehaviour
{
    [SaveField("premium_gems")]
    public int premiumGems = 100;

    [SaveField("vip_status")]
    public bool isVip = true;
}
```

---

## 🤝 Seamless Harmony with Visual Save Studio

Attributes and Visual Save Studio are not mutually exclusive:
- If a class is decorated with `[FuzzySave]`, Visual Save Studio's discovery scanner recognizes the attributes and flags the fields automatically.
- Any manual overrides configured in Visual Save Studio seamlessly take precedence when code is baked.

---

## 🧭 Next Chapter

Proceed to [12. Samples & Stress Benchmark Suite](12_samples_and_benchmarks.md) to explore the interactive 3D demo world and 500+ physics item stress test suite.
