---
title: "09. Cloud Synchronization"
description: "CloudSyncManager, conflict resolution policies, UGS Cloud Save, Steam Cloud, PlayFab, Firebase, and REST API."
slug: docs/fuzzysave/cloud-sync
---

## Overview

In cross-platform and live-service gaming, players expect their progress to sync across devices (e.g., PC Steam, mobile devices, and consoles).

FuzzySave features a provider-agnostic **Cloud Synchronization Architecture** that decouples game logic from specific cloud backends.

---

![Cloud Synchronization Workflow](/images/fuzzysave/cloud_sync_architecture.png)
*Architectural diagram showing local file writes triggering asynchronous uploads through CloudSyncManager to UGS, Steam, PlayFab, Firebase, or Custom REST endpoints.*

---

## Architecture: `ICloudStorageProvider`

All cloud providers implement a unified interface:

```csharp
public interface ICloudStorageProvider
{
    bool IsAuthenticated { get; }
    Task<bool> AuthenticateAsync();
    Task<bool> UploadAsync(string slotName, byte[] payload);
    Task<byte[]> DownloadAsync(string slotName);
    Task<bool> IsCloudNewerAsync(string slotName, long localTimestamp);
}
```

### Sync Lifecycle States (`CloudSyncState`):
`CloudSyncManager.OnSyncStateChanged` notifies your game UI of active sync states:
- `Idle`: No active cloud network operations.
- `Uploading`: Sending save bytes to the remote server.
- `Downloading`: Fetching latest cloud data.
- `Conflict`: Cloud and local timestamps diverge, requiring resolution.
- `Error`: Network timeout, authentication failure, or invalid payload.

---

## Conflict Resolution Policies

When a player plays offline on their laptop and then switches to their desktop, local and remote save versions may conflict:

| Conflict Policy | Behavior | Best Used For |
|---|---|---|
| **`UseNewest`** (Default) | Compares UTC timestamp ticks of local and cloud saves; the newer save wins. | Casual & story-driven single-player games. |
| **`AlwaysLocal`** | Local save always overwrites the remote file upon upload. | Offline-first mobile games with local priority. |
| **`AlwaysCloud`** | Cloud save always takes precedence if remote changes exist. | Competitive or cheat-sensitive titles with server authority. |

---

## Supported Cloud Providers

### 1. Unity Gaming Services (UGS) Cloud Save
- **Class:** `UGSCloudStorageProvider`
- Integrates directly with Unity's official Cloud Save package (`#if UNITY_SERVICES_CORE && UNITY_SERVICES_CLOUDSAVE`).
- Saves binary or JSON payloads directly to the authenticated player's cloud profile.

### 2. Steam Cloud (Steamworks)
- **Class:** `SteamCloudStorageProvider`
- Compatible with both **Steamworks.NET** and **Facepunch.Steamworks**.
- Uses Steam's Remote Storage API (`SteamRemoteStorage.FileWrite` and `SteamRemoteStorage.FileRead`).
- Seamlessly synchronizes save files across different Steam client installations without requiring custom web infrastructure.

### 3. Microsoft Azure PlayFab
- **Class:** `PlayFabCloudStorageProvider`
- Interfaces with PlayFab Client API user data entries (`UpdateUserData` / `GetUserData`).
- Excellent for cross-platform progression between PC, iOS, and Android.

### 4. Google Firebase
- **Class:** `FirebaseCloudStorageProvider`
- Uploads compressed and encrypted save payloads to Firebase Storage or Realtime Database.

### 5. Custom REST API
- **Class:** `RESTCloudStorageProvider`
- Built for studios with custom backend web servers using `UnityWebRequest`:
  - **Upload:** `POST {restEndpointUrl}/upload?slot={slotName}`
  - **Download:** `GET {restEndpointUrl}/download?slot={slotName}`
  - **Metadata Check:** `GET {restEndpointUrl}/metadata?slot={slotName}`

---

## Manual Cloud Sync Code Example

While cloud sync triggers automatically after local saves when enabled in `FuzzySaveSettings`, you can also trigger synchronization manually:

```csharp
using UnityEngine;
using FuzzyLogicLabs.FuzzySave;
using System.Threading.Tasks;

public class CloudSaveController : MonoBehaviour
{
    private async void Start()
    {
        // Listen to sync events
        CloudSyncManager.OnSyncStateChanged += HandleSyncStateChanged;

        // Ensure cloud provider is authenticated
        if (CloudSyncManager.Provider != null && !CloudSyncManager.Provider.IsAuthenticated)
        {
            bool authed = await CloudSyncManager.Provider.AuthenticateAsync();
            Debug.Log($"Cloud Authenticated: {authed}");
        }
    }

    private void HandleSyncStateChanged(CloudSyncState state, string slot)
    {
        Debug.Log($"[CloudSync] Slot: {slot} -> Status: {state}");
    }
}
```

---

## Next Chapter

Proceed to [10. Schema Migrations & Versioning](/docs/fuzzysave/schema-migrations/) to learn how to update game data structures without breaking older player save files.
