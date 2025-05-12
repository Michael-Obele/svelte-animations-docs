```markdown
# Folder: /lib/aceternity-ui/components/hover-border-gradient

This folder contains the Svelte implementation of the **Hover Border Gradient** component. This component creates an element (button, div, etc.) with a gradient border that animates or changes on hover, giving a distinct visual feedback.

## Core Components

1.  **`HoverBorderGradient.svelte`**:
    *   The main component that renders an element (specified by the `as` prop, defaulting to `"button"`) with an animated gradient border.
    *   It uses `svelte/motion`'s `tweened` store and `svelte/easing` functions (`linear`, `cubicOut`) to manage the animation of the gradient.
    *   The border effect is achieved by layering multiple divs:
        *   An outer container for positioning and event handling.
        *   A `div` for the main content (passed via slot), with a solid background.
        *   A `div` for the animated gradient effect, using `radial-gradient`. Its `background` style is dynamically updated based on hover state and a timed interval.
        *   Another `div` with a solid background (e.g., black) inset slightly to create the "border" appearance from the gradient layer underneath.
    *   On hover, the gradient animation might change (e.g., a highlight appears or the movement changes).
    *   When not hovered, the gradient border has a subtle, continuous animation (defaulting to a clockwise movement of a radial gradient spot).
    *   Accepts props:
        *   `containerClassName`: (string, optional) CSS classes for the main outer container.
        *   `className`: (string, optional) CSS classes for the inner content container.
        *   `duration`: (number, default: 1) Duration in seconds for one cycle of the default border animation.
        *   `clockwise`: (boolean, default: true) Direction of the default border animation.
        *   `as`: (string, default: "button") The HTML element type to render for the main component (e.g., "button", "div", "a").

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/hover-border-gradient/HoverBorderGradient.svelte
    <script lang="ts">
      import { onMount } from "svelte";
      import { tweened } from "svelte/motion";
      import { cubicOut, linear } from "svelte/easing";

      export let containerClassName = "";
      export let className = "";
      export let duration = 1; // seconds
      export let clockwise = true;
      export let as = "button"; // Can be 'div', 'a', etc.

      let hovered = false;

      // Gradient positions for the animated border effect
      const movingMap = { /* ... pre-defined radial gradient strings ... */ };
      let values1 = [20.7, 50, 50, 0, 0, 0, 100];
      // ... other value sets for different positions ...
      let allValues = [values1, /* values2, values3, values4 */];

      // Tweened values for animating gradient parameters
      let t1 = tweened(0, { duration: 1000, easing: linear });
      // ... t2, t3, t4 for border animation ...

      // Tweened values for hover highlight effect
      let hl1 = tweened(0, { duration: 1000, easing: cubicOut });
      let hl2 = tweened(0, { duration: 1000, easing: cubicOut });
      const highlightGradientParams = [75, 181.15942028985506]; // Example parameters

      let index = 0; // Current position index for border animation

      onMount(() => {
        let interval;
        if (!hovered) {
          interval = setInterval(() => {
            // Logic to cycle through 'index' for border animation
            // Update t1, t2, t3, t4 based on allValues[index]
          }, duration * 1000);
        }
        return () => clearInterval(interval);
      });
    </script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svelte:element
      this={as}
      on:mouseenter={() => {
        hovered = true;
        hl1.set(highlightGradientParams[0]);
        hl2.set(highlightGradientParams[1]);
      }}
      on:mouseleave={() => {
        hovered = false; // Reset hover state
        hl1.set(0); // Reset highlight
        hl2.set(0);
      }}
      class={`relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit ${containerClassName}`}
      {...$$restProps}
    >
      <!-- Inner content container -->
      <div
        class={`w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit] ${className}`}
      >
        <slot />
      </div>
      <!-- Animated gradient layer -->
      <div
        class="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style="filter: blur(2px); position: absolute; width: 100%; height: 100%;
            background : {hovered
          ? `radial-gradient(${$t1}% ${$t2}% at ${$t3}% ${$t4}%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(${$hl2}% ${$hl1}% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)`
          : `radial-gradient(${$t1}% ${$t2}% at ${$t3}% ${$t4}%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)`};
          "
      ></div>
      <!-- Background to create the border illusion from the gradient above -->
      <div
        class="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]"
      ></div>
    </svelte:element>
    ```

## Examples

1.  **`HBGPreview.svelte`**:
    *   A simple example showcasing the `HoverBorderGradient` component rendered as a button with text content.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/hover-border-gradient/HBGPreview.svelte
    <script>
      import HoverBorderGradient from "./HoverBorderGradient.svelte";
    </script>

    <div class="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center px-6"
      >
        <span> Svelte Aceternity UI</span>
      </HoverBorderGradient>
    </div>
    ```

## Manifest File (`acetHoverBorderGradient.ts`)

*   Defines the component's metadata (ID, title, description, tags).
*   Specifies the preview component (`HBGPreview`).
*   Provides installation instructions, including dependencies (`clsx`, `tailwind-merge`, `svelte-motion`), utility function setup, and source code for `HoverBorderGradient.svelte`.

## Basic Usage

```svelte /dev/null/MyHoverBorderUsage.svelte
<script>
  import HoverBorderGradient from '$lib/aceternity-ui/components/hover-border-gradient/HoverBorderGradient.svelte';
</script>

<div class="flex flex-col items-center space-y-6 p-10">
  <HoverBorderGradient
    containerClassName="rounded-lg"
    as="button"
    className="dark:bg-slate-900 bg-slate-100 text-slate-900 dark:text-slate-100 px-8 py-3"
    duration={2}
    clockwise={false}
  >
    Custom Button
  </HoverBorderGradient>

  <HoverBorderGradient
    containerClassName="rounded-md w-64 h-32"
    as="div"
    className="bg-neutral-800 text-neutral-100 flex flex-col items-center justify-center"
    duration={1.5}
  >
    <h3 class="text-lg font-semibold">Info Card</h3>
    <p class="text-sm text-neutral-400">Hover for effect</p>
  </HoverBorderGradient>

  <HoverBorderGradient
    containerClassName="rounded-full"
    as="a"
    href="https://example.com"
    target="_blank"
    className="bg-green-700 text-white px-10 py-2 text-lg"
  >
    Link with Border
  </HoverBorderGradient>
</div>
```

Refer to `acetHoverBorderGradient.ts` for detailed installation steps and dependencies. The core of the effect relies on careful layering and dynamic CSS `background` properties animated with Svelte Motion.
```