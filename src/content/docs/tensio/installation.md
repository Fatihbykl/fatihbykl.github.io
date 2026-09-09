---
title: Installation & Dependencies
description: System requirements, DOTS package dependencies, and step-by-step installation instructions for Tensio.
slug: docs/tensio/installation
---

Getting Tensio up and running in your Unity project is a straightforward process. Follow these requirements and setup steps to ensure high-performance physics execution.

---

## 1. Supported Unity Versions

Tensio relies on modern Unity C# Job System features and compiler optimizations:

* **Minimum Supported Version:** Unity 2022.3 LTS
* **Render Pipelines:** Compatible with **Universal Render Pipeline (URP)**, **High Definition Render Pipeline (HDRP)**, and **Built-in Render Pipeline**.

---

## 2. Package Dependencies (DOTS)

Tensio leverages Unity's Data-Oriented Technology Stack packages for maximum multithreaded performance. These packages are typically resolved automatically upon package import, but can be verified manually in the Unity Package Manager:

| Package Name | Package ID | Purpose |
| :--- | :--- | :--- |
| **Burst** | `com.unity.burst` | Compiles physics simulation jobs to highly optimized vectorized native code. |
| **Collections** | `com.unity.collections` | Provides native memory containers (`NativeArray`, `NativeParallelMultiHashMap`) for multithreaded jobs. |
| **Jobs** | `com.unity.jobs` | Manages worker thread scheduling and asynchronous execution. |
| **Mathematics** | `com.unity.mathematics` | SIMD-optimized math library for vector and matrix calculations. |

:::note[Automatic Resolution]
When importing Tensio via `.unitypackage` or Unity Package Manager, Unity will automatically scan and prompt to install any missing DOTS dependencies.
:::

---

## 3. Installation Steps

### Step 1: Import the Package

Depending on how you acquired Tensio:

* **From Unity Asset Store:**
  1. Open your Unity Project.
  2. Navigate to **Window** > **Package Manager**.
  3. Change the dropdown view to **Packages: My Assets**.
  4. Search for **Tensio**, click **Download**, then click **Import**.
* **From `.unitypackage` Archive:**
  1. Open your Unity Project.
  2. Double-click the `Tensio.unitypackage` file, or select **Assets** > **Import Package** > **Custom Package...**.
  3. Keep all assets selected and click **Import**.

Upon completion, you will see a `Tensio` folder in your project's `Assets/` directory containing all scripts, editor tools, shaders, and demo scenes.

### Step 2: Verify Dependencies in Package Manager

1. Go to **Window** > **Package Manager**.
2. Switch the top dropdown to **Packages: In Project**.
3. Verify that **Burst**, **Collections**, **Jobs**, and **Mathematics** appear in the list.
4. If any are missing, switch to **Packages: Unity Registry**, locate the package, and click **Install**.

### Step 3: Verify Burst Compilation

For peak performance with 0B GC allocation:
* Check **Jobs** > **Burst** > **Enable Compilation** in the top menu bar to ensure Burst compilation is active.
* In Play mode, Tensio jobs will run natively across all available CPU threads.

:::tip[Next Step]
Proceed to the **[Quick Start Guide](/docs/tensio/quick-start/)** to create and simulate your first physics rope!
:::
