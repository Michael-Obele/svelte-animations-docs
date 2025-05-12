```markdown
# Folder: /lib/aceternity-ui/components/Sparkles

This folder contains the Svelte **Sparkles** component, which creates an animated particle effect, often used for background decoration or visual emphasis.

## Core Components

1.  **`Sparkles.svelte`**:
    *   The main component that renders the particle animation.
    *   It utilizes the `@tsparticles/svelte` library to generate and manage the particles.
    *   The component fades in on mount using `svelte/motion`'s `tweened` store.
    *   Accepts props for extensive customization of the particle effect:
        *   `id`: (string, **required**) A unique ID for the underlying `Particles` component instance. Crucial if using multiple Sparkles components on the same page.
        *   `class`: (string, optional) CSS classes for the main container div.
        *   `background`: (string, default: '#0d47a1') Background color of the particle container.
        *   `minSize`: (number, default: 1) Minimum size of the particles.
        *   `maxSize`: (number, default: 3) Maximum size of the particles.
        *   `speed`: (number, default: 4) Animation speed for particle opacity changes.
        *   `particleColor`: (string, default: '#ffffff') Color of the particles.
        *   `particleDensity`: (number, default: 120) Controls the number of particles relative to the container size.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/Sparkles/Sparkles.svelte
    <script>
        import { onMount } from 'svelte';
        import Particles from "@tsparticles/svelte";
        import { tweened } from 'svelte/motion';
        import { cn } from '$lib/utils';

        /**
         * @component
         * Sparkles creates a particle animation effect using the `@tsparticles/svelte` library.
         * It's configurable for background color, particle size, speed, color, and density.
         * The component fades in on mount.
         *
         * @prop id - A unique ID for the particle container. Essential if using multiple instances on one page.
         * @prop class - Optional CSS class(es) for the main container div.
         * @prop background - Background color of the particle container. Default is '#0d47a1'.
         * @prop minSize - Minimum size of the particles. Default is 1.
         * @prop maxSize - Maximum size of the particles. Default is 3.
         * @prop speed - Animation speed for particle opacity. Default is 4.
         * @prop particleColor - Color of the particles. Default is '#ffffff'.
         * @prop particleDensity - Density of particles. Default is 120.
         */

        export let id: string; // Required: A unique ID for the Particles component instance
        let className = '';
        export { className as class };
        export let background = '#0d47a1';
        export let minSize = 1;
        export let maxSize = 3;
        export let speed = 4;
        export let particleColor = '#ffffff';
        export let particleDensity = 120;

        let init = false;
        const opacity = tweened(0, { duration: 1000 });

        onMount(() => {
          // Initialization logic for tsparticles (potentially async)
          init = true;
          opacity.set(1);
        });

        const particlesLoaded = () => {
          opacity.set(1);
        };
    </script>

    <div class={cn("h-full w-full", className)} style="opacity: {$opacity};">
      {#if init}
        <Particles
          id={id}
          options={{ /* tsparticles configuration based on props */ }}
          on:particlesLoaded={particlesLoaded}
        />
      {/if}
    </div>
    ```

## Manifest File (`acetSparkles.ts` / `allAceternityUI.ts`)

The component's metadata, installation instructions (including the `@tsparticles/svelte` dependency), and example configurations for the documentation site are defined centrally, likely within `svelte-animations-docs/src/lib/aceternity-ui/components/allAceternityUI.ts` under an `id: "sparkles"` entry (or a similar ID).

## Basic Usage

```svelte /dev/null/MySparklesUsage.svelte
<script>
  import Sparkles from '$lib/aceternity-ui/components/Sparkles/Sparkles.svelte';
</script>

<div class="relative h-64 w-full bg-neutral-900 rounded-lg overflow-hidden">
  <!-- Place Sparkles component -->
  <Sparkles
    id="tsparticles-background" <!-- Ensure unique ID -->
    class="absolute inset-0 z-0"
    background="transparent"
    minSize={0.6}
    maxSize={1.4}
    particleDensity={100}
    particleColor="#FFFFFF"
  />

  <!-- Overlay content -->
  <div class="relative z-10 flex flex-col items-center justify-center h-full">
    <h1 class="text-white text-3xl font-bold">Sparkling Content</h1>
    <p class="text-neutral-300 mt-2">This content is above the sparkles.</p>
  </div>
</div>
```

Refer to the central configuration (`allAceternityUI.ts` or similar) for detailed installation steps and dependencies (`clsx`, `tailwind-merge`, `@tsparticles/svelte`). Note that `@tsparticles/svelte` might require specific initialization or engine loading depending on the features used (e.g., `loadFull` or `loadSlim`).
```