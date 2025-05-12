```markdown
# Folder: /lib/aceternity-ui/components/SvgMaskEffect

This folder contains the Svelte implementation of the **SVG Mask Effect**, a component that creates a reveal effect where content in one layer is shown through a circular mask that follows the mouse cursor over another layer.

## Core Components

1.  **`SvgMaskEffect.svelte`**:
    *   The main component that orchestrates the mask reveal effect.
    *   It uses two named slots: `def` for the content *to be revealed* (typically the top layer, initially hidden except within the mask) and `reveal` for the *base content* (initially visible).
    *   It tracks the mouse position relative to its container.
    *   Applies an SVG mask (`mask-image: var(--mask-svg)`) to the `def` slot's container.
    *   The `mask-position` and `mask-size` CSS properties are updated dynamically based on mouse position and hover state.
    *   The mask size smoothly transitions between `size` (default state) and `revealSize` (hover state).
    *   Requires a CSS variable `--mask-svg` to be defined, typically pointing to `mask.svg`. The component includes a fallback style definition, but it's often set globally or via the build process as indicated in `acetSvgMask.ts`.
    *   Accepts props:
        *   `size`: (number, default: 50) Initial diameter of the circular mask in pixels.
        *   `revealSize`: (number, default: 300) Diameter of the mask when hovered.
        *   `class`: (string, optional) CSS classes for the main container.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/SvgMaskEffect/SvgMaskEffect.svelte
    <script lang="ts">
      import { onMount, onDestroy } from "svelte";
      import { writable } from "svelte/store";
      import { cn } from "$lib/utils";

      /**
       * @component SvgMaskEffect ... (rest of component docs)
       * @prop size - Initial mask size.
       * @prop revealSize - Mask size on hover.
       * @prop class - Optional CSS classes.
       * @slot def - Content to be revealed.
       * @slot reveal - Base content.
       */

      export let size = 50;
      export let revealSize = 300;
      let className = "";
      export { className as class };

      let isHovered = false;
      const mousePosition = writable({ x: 0, y: 0 });
      let containerRef: HTMLDivElement | undefined;

      // ... (event handling and lifecycle logic) ...

      $: maskSize = isHovered ? revealSize : size;
    </script>

    <div bind:this={containerRef} class={cn("relative bg-white", className)}
      on:mouseenter={() => (isHovered = true)}
      on:mouseleave={() => (isHovered = false)}
      on:mousemove={updateMousePosition}
    >
      <!-- Revealed Layer (Top) -->
      <div
        class="w-full h-full flex items-center justify-center text-6xl absolute bg-black text-white bg-grid-white/[0.2]"
        style="
            mask-position: {$mousePosition.x - maskSize / 2}px {$mousePosition.y - maskSize / 2}px;
            -webkit-mask-position: {$mousePosition.x - maskSize / 2}px {$mousePosition.y - maskSize / 2}px;
            mask-image: var(--mask-svg);
            -webkit-mask-image: var(--mask-svg);
            mask-size: {maskSize}px;
            -webkit-mask-size: {maskSize}px;
            mask-repeat: no-repeat;
            -webkit-mask-repeat: no-repeat;
            transition: mask-size 0.2s ease-out, -webkit-mask-size 0.2s ease-out;
          "
      >
        <!-- Optional overlay/content within the revealed layer -->
        <div class="absolute inset-0 bg-black h-full w-full z-0 opacity-50" />
        <div
          class="max-w-4xl mx-auto text-center text-white text-4xl font-bold relative z-20"
        >
          <slot name="def"></slot>
        </div>
      </div>

      <!-- Base Layer (Bottom) -->
      <div class="w-full h-full flex items-center justify-center text-black dark:text-white">
        <slot name="reveal"></slot>
      </div>
    </div>

    <style>
      /* Fallback definition for --mask-svg */
      :global(:root) {
        --mask-svg: url("./mask.svg");
      }
    </style>
    ```

2.  **`SvgMaskPreview.svelte`**:
    *   An example component demonstrating the usage of `SvgMaskEffect.svelte`.
    *   It provides content for both the `def` (revealed text) and `reveal` (base text) slots.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/SvgMaskEffect/SvgMaskPreview.svelte
    <script>
      import SvgMaskEffect from "./SvgMaskEffect.svelte";

      /**
       * @component
       * SvgMaskPreview demonstrates the `SvgMaskEffect` component.
       * It shows two pieces of text, one revealed on hover via the mask.
       */
    </script>

    <SvgMaskEffect class="h-[30rem] w-[60rem]">
      <div slot="def" class="px-36 py-20">
        Svelte is <span class="text-sky-500">Easy</span> & Everyone
        <span class="text-emerald-400">Loves</span> it.
      </div>
      <div
        slot="reveal"
        class="max-w-4xl mx-auto text-slate-800 text-center text-4xl font-bold"
      >
        React is <span class="text-red-600"> Hard </span> & Everyone Uses it.
      </div>
    </SvgMaskEffect>
    ```

3.  **`mask.svg`**:
    *   A simple SVG file containing a black circle. This SVG is used as the `mask-image` by the `SvgMaskEffect` component. The black area defines where the `def` content will be visible.

    ```svg svelte-animations-docs/src/lib/aceternity-ui/components/SvgMaskEffect/mask.svg
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="100" fill="black" />
    </svg>
    ```

4.  **`acetSvgMask.ts`**:
    *   The manifest file for the SvgMaskEffect component.
    *   Defines the `AceternityUI` object containing metadata (id, title, description, tags), preview component (`SvgMaskPreview`), and installation instructions. Critically, it includes the step to add the `mask.svg` file and potentially configure the `--mask-svg` CSS variable.

## Basic Usage

```svelte /dev/null/MyMaskUsage.svelte
<script>
  import SvgMaskEffect from '$lib/aceternity-ui/components/SvgMaskEffect/SvgMaskEffect.svelte';
</script>

<div class="relative w-full h-96 my-8">
  <SvgMaskEffect
    class="h-full w-full"
    revealSize={400}
    size={60}
  >
    <!-- Content to be revealed goes in the 'def' slot -->
    <div slot="def" class="flex items-center justify-center h-full bg-blue-500">
      <p class="text-white text-4xl font-bold text-center">
        Revealed Content! <br /> (Appears on hover)
      </p>
    </div>

    <!-- Base content goes in the 'reveal' slot -->
    <div slot="reveal" class="flex items-center justify-center h-full bg-neutral-200 dark:bg-neutral-800">
      <p class="text-neutral-600 dark:text-neutral-300 text-2xl font-medium text-center">
        Base Content <br /> (Hover over me)
      </p>
    </div>
  </SvgMaskEffect>
</div>

<!-- Ensure mask.svg is accessible and --mask-svg is defined, typically via acetSvgMask.ts instructions -->
```

Refer to `acetSvgMask.ts` for detailed installation steps, including adding the `mask.svg` file and dependencies (`clsx`, `tailwind-merge`, `svelte-motion`).
```