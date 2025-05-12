```markdown
# Folder: /lib/aceternity-ui/components/aurora-background

This folder contains the Svelte implementation of the **Aurora Background** component, designed to create a dynamic, visually appealing background effect resembling the aurora borealis.

## Core Components

1.  **`AuroraBackground.svelte`**:\
    *   The main component that generates the animated aurora effect using complex CSS gradients and animations defined in Tailwind configuration (`@keyframes aurora`).
    *   It uses multiple background layers with `repeating-linear-gradient` and applies blur and blending modes to achieve the effect.
    *   Provides a default slot (`<slot>`) to overlay content on top of the background. The component uses flexbox to center the slotted content by default.
    *   Accepts props:
        *   `class`: (string, optional) CSS classes to apply to the main container, useful for setting height, padding, etc.
        *   `showRadialGradient`: (boolean, default: true) Applies an additional radial gradient mask for a vignetting effect.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/aurora-background/AuroraBackground.svelte
    <script lang="ts">
      import { cn } from "$lib/utils";

      /**
       * @component
       * AuroraBackground creates a visually appealing, animated background effect reminiscent of an aurora.
       * It uses complex CSS gradients and animations to achieve this effect.
       * The component centers its slotted content by default.
       *
       * @prop class - Optional CSS class(es) to apply to the main container div, allowing for custom height, etc.
       * @prop showRadialGradient - If true, applies a radial gradient mask for an additional visual effect. Default is true.
       * @slot - Default slot for content to be overlaid on the aurora background.
       */

      let _class: string = "";
      export { _class as class };
      export let showRadialGradient: boolean = true;

      // Note: The core aurora effect is achieved through complex Tailwind CSS arbitrary properties
      // and CSS variables defined in the `tailwind.config.ts` (animation keyframes for 'aurora').
    </script>

    <div
      class={cn(
        "relative flex flex-col h-[90vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg", // Default styling
        _class
      )}
      {...$$restProps}
    >
      <div class="absolute inset-0 overflow-hidden -z-10"> {/* Aurora container */}
        <div
          class={cn(
            `
        [--white-gradient:repeating-linear-gradient(...)] /* Definition for light mode */
        [--dark-gradient:repeating-linear-gradient(...)] /* Definition for dark mode */
        [--aurora:repeating-linear-gradient(...)] /* Core aurora gradient */
        [background-image:var(--white-gradient),var(--aurora)]
        dark:[background-image:var(--dark-gradient),var(--aurora)]
        [background-size:300%,_200%]
        [background-position:50%_50%,50%_50%]
        filter blur-[10px] invert dark:invert-0
        after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
        after:dark:[background-image:var(--dark-gradient),var(--aurora)]
        after:[background-size:200%,_100%]
        after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
        pointer-events-none
        absolute -inset-[10px] opacity-50 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      <div class="z-10 text-center relative"> {/* Content slot container */}
        <slot></slot>
      </div>
    </div>
    ```

2.  **`AurorabgExample.svelte`**:\
    *   An example demonstrating the usage of `AuroraBackground.svelte`.
    *   It places text and a button inside the default slot to show content overlaid on the effect.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/aurora-background/AurorabgExample.svelte
    <script>
      import AuroraBackground from "./AuroraBackground.svelte";

      /**
       * @component
       * AurorabgExample demonstrates the `AuroraBackground` component with sample
       * text content and a call-to-action button.
       */
    </script>

    <AuroraBackground class="px-4 md:px-28">
      <div class="text-3xl md:text-6xl font-bold text-white/90 dark:text-white/80 text-center">
        Svelte is Fast & Amazing 🚀
      </div>
      <div class="font-extralight text-base md:text-4xl text-neutral-200 dark:text-neutral-200 py-4 my-2">
        web development for the rest of us
      </div>
      <a
        class="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 hover:opacity-90 transition-opacity"
        href="https://svelte.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Docs
      </a>
    </AuroraBackground>
    ```

3.  **`acetAuroraBackground.ts`**:\
    *   The manifest file for the Aurora Background component.
    *   Contains metadata (id, title, description, tags), the preview component (`AurorabgExample`), and crucial installation instructions.
    *   **Important**: The installation steps include necessary modifications to `tailwind.config.ts` to define the `aurora` animation keyframes and potentially the CSS color variables plugin (`addVariablesForColors`). Without these Tailwind configurations, the animation will not work.

## Basic Usage

```svelte /dev/null/MyAuroraUsage.svelte
<script>
  import AuroraBackground from '$lib/aceternity-ui/components/aurora-background/AuroraBackground.svelte';
</script>

<div class="relative">
  <AuroraBackground class="h-screen">
    <!-- Your content goes here -->
    <h1 class="text-4xl font-bold text-white text-center">My Awesome Page</h1>
    <p class="text-neutral-200 mt-4 text-center">Content overlaid on the aurora.</p>
  </AuroraBackground>
</div>

<!--
Ensure your tailwind.config.ts includes the 'aurora' keyframes animation
and potentially the addVariablesForColors plugin as specified in
acetAuroraBackground.ts or the main installation guide.
-->
```

Refer to `acetAuroraBackground.ts` for detailed installation steps, dependencies (`clsx`, `tailwind-merge`), and the required Tailwind configuration changes.
```