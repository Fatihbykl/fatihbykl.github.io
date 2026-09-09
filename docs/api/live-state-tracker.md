# Live State Tracker API

The `LiveStateTracker` is a lightweight, thread-safe tracking system designed for capturing real-time state of variables while running in Play Mode.

## Namespace
`FuzzyLogicLabs`

## Struct: `TrackedVariableContext`
Stores the state and metadata of a tracked variable.

```csharp
public struct TrackedVariableContext
{
    public string Id;           // Unique identifier for the tracked instance
    public string ScriptPath;   // The path of the script containing the variable
    public string VariableName; // The name of the variable being tracked
    public string CurrentValue; // The string representation of the current value
}
```

## Class: `LiveStateTracker` (Static)
Maintains a concurrent dictionary of all tracked variables.

### Fields
```csharp
public static readonly ConcurrentDictionary<string, TrackedVariableContext> State;
```
A thread-safe dictionary holding the current states of all tracked variables, keyed by their `Id`.

### Methods

#### `Track`
Records the current value of a variable.

```csharp
public static void Track(string id, string scriptPath, string variableName, object value)
```
- **`id`**: Unique string identifying this tracking point.
- **`scriptPath`**: Path of the script where tracking occurs.
- **`variableName`**: Name of the variable to display.
- **`value`**: The actual value of the variable (will be converted to string, handles nulls safely).

#### `Track` (Legacy)
```csharp
public static void Track(string id, object value)
```
A fallback for trackers injected before version 17.5. It infers the `scriptPath` and `lineNumber` by parsing the `id`.

## Usage Example

```csharp
using FuzzyLogicLabs;

public class PlayerController : MonoBehaviour
{
    public float health = 100f;

    void Update()
    {
        // ... game logic ...
        
        // Push the value to the Live Tracker
        LiveStateTracker.Track("player_hp", "Assets/PlayerController.cs", "health", health);
    }
}
```
You can view these values dynamically inside the **Watch Panel** of the FuzzyIDE.
