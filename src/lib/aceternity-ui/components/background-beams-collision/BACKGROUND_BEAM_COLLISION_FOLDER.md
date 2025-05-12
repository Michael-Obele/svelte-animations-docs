```markdown
# Folder: /lib/aceternity-ui/components/background-beams-collision

This folder contains the Svelte components necessary to create the **Background Beam Collision** effect. This effect features animated beams moving downwards that trigger an "explosion" animation upon hitting a designated boundary at the bottom of the container.

## Core Components

1.  **`BackgroundBeamCollision.svelte`**:
    *   The main container component that orchestrates the entire effect.
    *   It sets up the background gradient and the overall container dimensions.
    *   It iterates through an array of `beams` (configurations) and renders a `CollisionMechanism` for each.
    *   Defines the collision boundary element (`containerRef`) at the bottom, which `CollisionMechanism` uses for detection.
    *   Provides a default `<slot>` for overlaying content (like headings or text) on top of the beams.
    *   Accepts props:
        *   `class`: (string, optional) CSS classes for the main container div.
        *   `beams`: (`BeamConfig[]`, optional) An array of configuration objects for individual beams. If not provided, it uses a default set of beam configurations.

    ```typescript
    // Structure of BeamConfig within BackgroundBeamCollision.svelte props
    type BeamConfig = {
      initialX?: number;    // Initial X position (CSS value, e.g., pixels)
      translateX?: number;  // Target X position (CSS value)
      initialY?: string;    // Initial Y position (CSS value, e.g., "-200px")
      translateY?: string;  // Target Y position (CSS value, e.g., "1800px")
      rotate?: number;      // Rotation angle (degrees)
      duration?: number;    // Animation duration (seconds, default: 8)
      delay?: number;       // Initial animation delay (seconds, default: 0)
      repeatDelay?: number; // Delay between repetitions (seconds, default: 0)
      class?: string;       // Additional CSS classes for the beam's visual style (e.g., height)
    }
    ```

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/background-beams-collision/BackgroundBeamCollision.svelte
    <script lang="ts">
      import CollisionMechanism from "./CollisionMechanism.svelte";
      // ... other imports and type definitions ...

      export let beams: BeamConfig[] = [ /* ... default beam configs ... */ ];
      let _class = "";
      export { _class as class };

      let containerRef: HTMLDivElement | undefined; // Collision boundary
      let parentRef: HTMLDivElement | undefined;    // Main container

      // ... component logic ...
    </script>

    <div
      bind:this={parentRef}
      class={`h-96 md:h-[92vh] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden ${_class}`}
    >
      {#each beams as beam (beam.initialX ?? Math.random())}
        <CollisionMechanism {beam} bind:containerRef bind:parentRef />
      {/each}

      <div class="relative z-10">
        <slot /> {/* Content goes here */}
      </div>

      <!-- Collision Boundary -->
      <div
        bind:this={containerRef}
        class="absolute bottom-0 bg-neutral-100 dark:bg-neutral-900 w-full inset-x-0 pointer-events-none"
        style="box-shadow: ..." /* Shadow styling */
      ></div>
    </div>
    ```

2.  **`CollisionMechanism.svelte`**:
    *   Manages the animation and collision detection for a *single* beam.
    *   Uses `svelte-motion` (`Motion`) to animate the beam's `translateY`, `translateX`, and `rotate` properties based on the `beam` config passed from the parent.
    *   Continuously checks if the beam's bounding box (`beamRef`) intersects with the collision boundary (`containerRef`).
    *   When a collision is detected, it calculates the collision coordinates relative to the `parentRef` and triggers the `Explosion` component at that location.
    *   Resets its own animation by incrementing a `beamKey` after a short delay post-collision.
    *   Accepts props:
        *   `beam`: (`BeamConfigMechanism`) Configuration for this specific beam.
        *   `containerRef`: (bindable `HTMLDivElement`) Reference to the collision boundary.
        *   `parentRef`: (bindable `HTMLDivElement`) Reference to the main parent container.

3.  **`Explosion.svelte`**:
    *   A purely visual component that renders the explosion effect.
    *   Uses `svelte-motion` (`Motion`) to animate multiple small `<span>` elements (particles) radially outwards from a central point with fading opacity.
    *   Includes a central gradient blur effect that also fades.
    *   Positioned absolutely based on the `style` prop provided by `CollisionMechanism` upon collision detection.
    *   Accepts props:
        *   `style`: (string) Inline CSS for absolute positioning (e.g., `left: Xpx; top: Ypx;`).

## Examples

-   **`BBCollisionExample.svelte`**: Demonstrates a typical usage of the `BackgroundBeamCollision` component with slotted heading content. It uses the default beam configurations.

```svelte svelte-animations-docs/src/lib/aceternity-ui/components/background-beams-collision/BBCollisionExample.svelte
<script>
  import BackgroundBeamCollision from "./BackgroundBeamCollision.svelte";
</script>

<BackgroundBeamCollision class='md:h-[70vh] rounded-lg'>
  <h2
    class="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight md:px-24 "
  >
    What&apos;s cooler than Beams?{" "}
    <br />
    <div
      class="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]"
    >
      <!-- Gradient Text Effect -->
      <div
        class="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]"
      >
        <span class="">Exploding beams.</span>
      </div>
      <div
        class="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4"
      >
        <span class="">Exploding beams.</span>
      </div>
    </div>
  </h2>
</BackgroundBeamCollision>
```

## Manifest File (`acetBackgroundBeamCollision.ts`)

-   Defines the component's metadata (ID, title, description, tags).
-   Specifies the preview component (`BBCollisionExample`).
-   Provides installation instructions, including dependencies (`clsx`, `tailwind-merge`, `svelte-motion`), utility function setup, and source code for all three components (`BackgroundBeamCollision.svelte`, `CollisionMechanism.svelte`, `Explosion.svelte`).

## Basic Usage

```svelte /dev/null/MyBeamCollisionUsage.svelte
<script>
  import BackgroundBeamCollision from '$lib/aceternity-ui/components/background-beams-collision/BackgroundBeamCollision.svelte';

  // Optional: Define custom beam configurations
  const customBeams = [
    { initialX: 50, translateX: 50, duration: 5, delay: 1, class: 'h-10 bg-red-500' }, // Example customization
    { initialX: 300, translateX: 300, duration: 7 },
    // ... more custom beams
  ];
</script>

<div class="my-section relative">
  <BackgroundBeamCollision beams={customBeams} class="h-[80vh]">
    <!-- Your content goes here -->
    <div class="flex flex-col items-center justify-center h-full text-center">
      <h1 class="text-4xl font-bold text-white z-20">Content Over Beams</h1>
      <p class="text-neutral-300 mt-2 z-20">This content appears above the beam animation.</p>
    </div>
  </BackgroundBeamCollision>
</div>
```

Refer to `acetBackgroundBeamCollision.ts` for detailed installation steps and dependencies.
```