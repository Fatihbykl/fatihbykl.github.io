---
title: "Sample Walkthrough & Tutorials"
description: "Hands-on integration tutorials: demo scene walkthrough, RPG inventory saving, and open-world persistence."
slug: docs/fuzzysave/tutorials
---

## 1. The Interactive Demo Scene Walkthrough

FuzzySave ships with a comprehensive playable demonstration located in:
📁 **`Assets/FuzzyLogicLabs/FuzzySave/Samples/Demo/`**

Open `DemoScene.unity` to test all core systems in action.

```
+-----------------------------------------------------------------------------------------+
|                                    DEMO SCENE LAYOUT                                    |
|                                                                                         |
|       [ Wall ]                          [ Pedestal ]                  [ Wall ]          |
|                                         (Floating Loot)                                 |
|                                                                                         |
|                       [ Player Character ]                                              |
|                       (DemoPlayerController)                                            |
|                                                                                         |
|       [ Chest 1 ]                                              [ Loot Spawner ]         |
|       (DemoChest)                                              (DemoLootSpawner)        |
|                                                                                         |
|                       [ Checkpoint Trigger Zone ]                                       |
|                       (SaveTriggerZone)                                                 |
+-----------------------------------------------------------------------------------------+
```

### 1.1 `DemoPlayerController.cs` (Player State)
* **Source:** `DemoPlayerController.cs`
* Demonstrates character movement via `CharacterController`.
* Uses `[FuzzySave("PlayerGroup")]` with `[SaveField("player_hp")]` and `[SaveField("player_gold")]`.
* Features visual feedback routines (flashing white on damage, particle trails).

### 1.2 `DemoChest.cs` (Static Scene Persistence)
* **Source:** `DemoChest.cs`
* Demonstrates interactive scene objects. Clicking the chest with the mouse smoothly animates the lid open via coroutine and triggers particle effects.
* Decorated with `[FuzzySave("WorldGroup")]` and `[SaveField("is_chest_open")]`.
* When you save the game, exit Play Mode, and return, the chest accurately remembers whether it was opened or closed.

### 1.3 `DemoLootSpawner.cs` & `DemoFloatingItem.cs` (Dynamic Spawning)
* **Source:** `DemoLootSpawner.cs` and `DemoFloatingItem.cs`
* Spawns physical crystal loot items into the world at random intervals.
* Each spawned item has a `DynamicSpawnTracker`.
* Upon loading, all dynamically generated items are automatically purged and cleanly reconstructed in their exact world coordinates with linear and angular physics velocities preserved.

### 1.4 `DemoDataTypes.cs` (Complex Data Models)
* **Source:** `DemoDataTypes.cs`
* Tests every data type supported by FuzzySave:
  * Primitives: `int`, `float`, `bool`, `string`.
  * Unity DTOs: `Vector3DTO`, `ColorDTO`.
  * Collections: `List<int>` (unlocked levels), `Dictionary<string, float>` (NPC reputations).
  * Nested Custom Classes: `CustomWeaponData` (`weaponName`, `damage`, `durability`, `isEnchanted`).

---

## 2. Step-by-Step Tutorial: Integrating FuzzySave into a New Project

Follow these 6 steps to add FuzzySave to any new or existing Unity project:

### Step 1: Reference the Assembly Definition
If your game uses Assembly Definition files (`.asmdef`), open your project's `.asmdef` file in the Inspector and add **`FuzzySave.Runtime`** to the **Assembly Definition References** list.

### Step 2: Open Visual Save Studio
From the top Unity menu, choose:
**`Tools > FuzzySave > Visual Save Studio`**
* The studio will automatically create a default `FuzzySaveSettings.asset` inside `Assets/FuzzyLogicLabs/FuzzySave/Resources/` if one does not already exist.
* In the **Settings** tab, choose your preferred format (`Json` or `Binary`) and toggle **Enable Backup** to `true`.

### Step 3: Track Static Scene Objects
For any door, chest, lever, or pickup placed directly in your scene:
1. Select the GameObject in the Unity Hierarchy.
2. In the Inspector, click **Add Component** and search for **`Save GUID`**.
3. Set the desired **Save Flags** (e.g., check `Position` and `Rotation` for moving platforms, or check `ActiveState` for collectible coins).

### Step 4: Add Drop-In Runtime Components
1. **Auto-Saving:** Create an empty GameObject named `SaveSystem` and attach **`Auto Save Manager`**.
   * Set the save interval (e.g., `300` seconds for 5 minutes).
   * Ensure **Use Rolling Slots** is checked with count `3`.
2. **Visual Feedback:** Create a Canvas and add a UI panel with **`Save Feedback UI`**. Assign a text label and an optional spinner icon to give players instant visual confirmation when saving occurs.

### Step 5: Persist Player Data (Code-First)
In your player controller or game manager script:

```csharp
using UnityEngine;
using FuzzyLogicLabs.FuzzySave;

public class MyGameManager : MonoBehaviour
{
    public int currentLevel = 1;
    public int coinsCollected = 0;

    public async void SaveGame()
    {
        // 1. Assign data to memory container
        FuzzySaveManager.SetData("current_level", currentLevel);
        FuzzySaveManager.SetData("coins", coinsCollected);
        FuzzySaveManager.SetData("player_pos", transform.position);

        // 2. Persist to active slot asynchronously
        bool success = await FuzzySaveManager.SaveAsync();
        if (success)
        {
            Debug.Log("Game saved successfully!");
        }
    }

    public async void LoadGame()
    {
        // 1. Load active slot from disk / cloud
        bool success = await FuzzySaveManager.LoadAsync();
        if (success)
        {
            // 2. Retrieve values with safe defaults
            currentLevel = FuzzySaveManager.GetData<int>("current_level", 1);
            coinsCollected = FuzzySaveManager.GetData<int>("coins", 0);
            transform.position = FuzzySaveManager.GetData<Vector3>("player_pos", Vector3.zero);

            Debug.Log($"Loaded Level {currentLevel} with {coinsCollected} coins.");
        }
    }
}
```

### Step 6: Bake Persistent Code & Verify with Live Debugger
1. In Visual Save Studio's **Dashboard**, click **`Bake Persistent Code`** to generate static bindings and eliminate reflection overhead.
2. Enter Play Mode.
3. Open **`Tools > FuzzySave > Play Mode Live Debugger`** to inspect your variables in real time and test your save/load flow with zero frame stutters.
