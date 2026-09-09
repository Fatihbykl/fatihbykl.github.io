---
title: Case Study — Grappling Hook Mechanic
description: Architectural breakdown of dynamic rope creation, anchor pinning, motorized winching, and pendulum swinging for gameplay mechanics.
slug: docs/tensio/advanced/grappling-hook
---

Tensio includes a fully playable Grappling Hook demo in the `Tensio/Demos/GrapplingHook` folder, demonstrating how to dynamically instantiate, anchor, winch, and swing from ropes during gameplay.

<video autoplay loop muted playsinline class="w-full rounded-xl border border-neutral-800 shadow-md my-4">
  <source src="/images/tensio/grappling_hook.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Key Gameplay Concepts

1. **Object Pooling:** Rather than calling `Instantiate` per hook projectile, the demo pre-allocates a pooled `RopeController` GameObject and re-initializes it on demand.
2. **Dynamic Pinning:** Pins index `0` to the player's weapon tip and index `N` to the raycast hit point on the wall or ceiling.
3. **Tensile Retraction:** Continuously decrements `rope.SetCurrentLength()` while applying directional propulsion forces to the player's `Rigidbody`.
4. **Natural Pendulum Motion:** Setting `Compliance = 0.0f` creates a rigid tether, enabling physics-driven swinging without artificial spring bounce.

---

## Core C# Implementation Breakdown

### 1. Firing & Anchor Attachment

```csharp
public void FireHook(RaycastHit hit)
{
    rope.gameObject.SetActive(true);
    
    // Position rope root at launcher muzzle
    rope.transform.position = muzzleTransform.position;

    float hitDistance = Vector3.Distance(muzzleTransform.position, hit.point);
    rope.InitSettings.Length = hitDistance;
    rope.InitializeRope();

    // Anchor Start to Player & End to Contact Point
    rope.PinParticle(0, playerTransform, muzzleTransform.position);
    rope.PinParticle(rope.ParticleCount - 1, hit.transform, hit.point);
}
```

### 2. Motorized Winch Pulling

While the player holds the grapple reel button, cable length is retracted and tensile impulse is imparted to the player body:

```csharp
void UpdateGrapplePull()
{
    // Retract resting cable length
    float newLength = rope.CurrentLength - pullSpeed * Time.deltaTime;
    rope.SetCurrentLength(Mathf.Max(minGrappleLength, newLength));

    // Calculate pull vector towards anchor
    Vector3 pullDirection = (hitPoint - playerRb.position).normalized;
    float currentDistance = Vector3.Distance(playerRb.position, hitPoint);

    if (currentDistance > 1.5f)
    {
        playerRb.AddForce(pullDirection * pullForce, ForceMode.Acceleration);
    }
}
```

### 3. Detachment & Release

Releasing the grapple instantly unpins both anchors and deactivates the rope game object back into the pool:

```csharp
public void ReleaseHook()
{
    rope.gameObject.SetActive(false);
}
```
The player preserves their exit momentum, smoothly transitioning into airborne trajectories!
