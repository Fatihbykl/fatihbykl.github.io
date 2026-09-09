---
title: "Cloud Synchronization"
description: "Asynchronous, offline-first cloud save architecture with conflict resolution and multi-provider support."
slug: docs/fuzzysave/cloud-sync
---

## 1. Cloud Architecture Overview (`CloudSyncManager.cs`)

Modern cross-platform titles (PC, Console, Mobile, Steam Deck) require save games to synchronize effortlessly across devices. FuzzySave incorporates a decoupled, asynchronous cloud synchronization layer orchestrated by `CloudSyncManager`.

### Key Architectural Characteristics
* **Non-Blocking Background Sync:** Cloud uploads and downloads execute asynchronously. The local game session never freezes waiting for network handshakes.
* **Offline-First Resilience:** If a player has no internet connectivity, saves continue to be written atomically to the local disk. When connectivity is restored, the sync manager resumes synchronization.
* **State Machine:** Emits state change events (`OnSyncStateChanged`) for UI indicators (e.g., spinning cloud sync icons).

```
   +--------+      Upload Triggered       +-----------+      Success      +--------+
   |  Idle  | -------------------------> | Uploading | ----------------> |  Idle  |
   +--------+                            +-----------+                   +--------+
       |                                       |
       | Download Triggered                    | Error
       v                                       v
   +-------------+       Failure         +-----------+
   | Downloading | --------------------> |   Error   |
   +-------------+                       +-----------+
```

---

## 2. Conflict Resolution Policies (`CloudConflictPolicy`)

When a game is played across multiple devices (e.g., PC at home and Steam Deck on the go), conflicts can arise if both devices have un-synced saves. FuzzySave provides three deterministic conflict policies configured in `FuzzySaveSettings`:

```csharp
public enum CloudConflictPolicy
{
    UseNewest,    // (Default) Compares timestamps; the newer file wins
    AlwaysLocal,  // Local device data always overrides the cloud
    AlwaysCloud   // Cloud data always overrides the local device
}
```

### How `UseNewest` Operates
1. During `LoadAsync()`, FuzzySave reads the UTC timestamp of the local file (`FileInfo.LastWriteTimeUtc.Ticks`).
2. Calls `provider.IsCloudNewerAsync(slotName, localTimestamp)`.
3. If the cloud version is newer, FuzzySave downloads the cloud payload first before deserialization.
4. If the local version is newer (or the device is offline), FuzzySave loads the local file immediately.

---

## 3. Supported Cloud Providers

FuzzySave includes modular adapters implementing `ICloudStorageProvider`:

### 3.1 Unity Gaming Services (UGS) Cloud Save
* **Class:** `UGSCloudStorageProvider`
* **Backend:** Unity Gaming Services Cloud Save REST API.
* **Ideal For:** Mobile, WebGL, and multi-platform titles using Unity Authentication.

### 3.2 Steam Cloud (Steamworks)
* **Class:** `SteamCloudStorageProvider`
* **Backend:** Steam Remote Storage API (`ISteamRemoteStorage`).
* **Ideal For:** PC / Mac / Linux distribution on Valve’s Steam platform and Steam Deck.

### 3.3 Microsoft Azure PlayFab
* **Class:** `PlayFabCloudStorageProvider`
* **Backend:** PlayFab Title Data & Player Data APIs.
* **Ideal For:** Live-service games, competitive multiplayer titles, and cross-progression systems.

### 3.4 Google Firebase
* **Class:** `FirebaseCloudStorageProvider`
* **Backend:** Firebase Cloud Firestore & Realtime Database.
* **Ideal For:** Mobile iOS/Android games with Google account sign-ins.

### 3.5 Custom REST API
* **Class:** `RESTCloudStorageProvider`
* **Backend:** Custom backend web server (Node.js, ASP.NET Core, Go, Django).
* **Configuration:** Set `FuzzySaveSettings.restEndpointUrl` to your API URL (e.g., `https://api.mygame.com/saves/sync`).
* **Payload:** Sends HTTP `POST` requests with the raw binary/json payload and receives HTTP `GET` payloads for downloads.

---

## 4. Authoring a Custom Cloud Provider

You can implement `ICloudStorageProvider` to connect FuzzySave to any proprietary server or custom backend:

```csharp
using System.Threading.Tasks;
using FuzzyLogicLabs.FuzzySave;

public class CustomCompanyCloudProvider : ICloudStorageProvider
{
    public bool IsAuthenticated { get; private set; }

    public async Task<bool> AuthenticateAsync()
    {
        // Authenticate with your proprietary backend
        IsAuthenticated = true;
        return true;
    }

    public async Task<bool> UploadAsync(string slotName, byte[] payload)
    {
        // Upload payload to your custom server
        return true;
    }

    public async Task<byte[]> DownloadAsync(string slotName)
    {
        // Download raw payload from your custom server
        return null;
    }

    public async Task<bool> IsCloudNewerAsync(string slotName, long localTimestamp)
    {
        // Query remote timestamp and compare
        return false;
    }
}
```

To register your custom provider at runtime:
```csharp
CloudSyncManager.Provider = new CustomCompanyCloudProvider();
await CloudSyncManager.Provider.AuthenticateAsync();
```
