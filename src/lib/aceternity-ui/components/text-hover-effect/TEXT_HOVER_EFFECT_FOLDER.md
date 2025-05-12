```markdown
# Folder: /lib/aceternity-ui/components/text-hover-effect

This folder contains the Svelte implementation of the **Text Hover Effect**. This component renders text using SVG and creates an interactive effect where a colorful gradient reveals itself on the text strokes as the mouse hovers over it, with the reveal area following the cursor.

## Core Components

1.  **`TextHoverComp.svelte`**:
    *   The main component that creates the interactive text hover effect.
    *   It renders text using SVG `<text>` elements for precise control over strokes and fills.
    *   The effect is achieved using SVG masks and gradients:
        *   A base text layer is rendered with a simple stroke (e.g., `stroke-neutral-200 dark:stroke-neutral-800`).
        *   A top text layer is rendered with a colorful gradient stroke (`stroke="url(#textGradient)"`). This layer is masked.
        *   The mask (`<mask id="textMask">`) uses a `<radialGradient id="revealMask">` whose center (`cx`, `cy`) follows the mouse cursor. This makes the colorful gradient on the top text layer visible only in the circular area around the mouse.
        *   The colorful `textGradient` itself is a `<linearGradient>` that becomes active/visible when the component is hovered.
    *   Uses Svelte `writable` stores (`cursor`, `hovered`, `maskPosition`) to manage interactivity.
    *   Mouse events (`mouseenter`, `mouseleave`, `mousemove`) update these stores.
    *   Props:
        *   `text`: (string, default: "") The text string to display.
        *   `duration`: (number, default: 0) This prop is present but not actively used in the provided animation logic for the hover effect itself. It might be a leftover or intended for future enhancements.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/text-hover-effect/TextHoverComp.svelte
    <script lang="ts">
      import { writable } from "svelte/store";
      export let text = "";
      export let duration = 0; // Note: duration prop is not directly used in the hover animation logic shown

      let svgRef: any = null;
      let cursor = writable({ x: 0, y: 0 });
      let hovered = writable(false);
      let maskPosition = writable({ cx: "50%", cy: "50%" }); // Initial mask position

      // Function to update mask position based on cursor
      let cursorChange = () => {
        if (svgRef) {
          let svgRect = svgRef.getBoundingClientRect();
          let cxPercentage = (($cursor.x - svgRect.left) / svgRect.width) * 100;
          let cyPercentage = (($cursor.y - svgRect.top) / svgRect.height) * 100;
          maskPosition.set({
            cx: `${cxPercentage}%`,
            cy: `${cyPercentage}%`,
          });
        }
      };

      function handleMouseEnter() {
        hovered.set(true);
      }

      function handleMouseLeave() {
        hovered.set(false);
      }

      function handleMouseMove(e) {
        cursor.set({ x: e.clientX, y: e.clientY });
      }

      // Reactive statement: when $cursor changes, call cursorChange
      $: $cursor, cursorChange();
    </script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svg
      bind:this={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100" /* Example viewBox, adjust as needed for text size */
      xmlns="http://www.w3.org/2000/svg"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
      on:mousemove={(e) => handleMouseMove(e)}
      class="select-none"
    >
      <defs>
        <!-- Gradient for the text fill on hover -->
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {#if $hovered} <!-- Gradient only active/defined on hover -->
            <stop offset="0%" stop-color="var(--yellow-500)" />
            <stop offset="25%" stop-color="var(--red-500)" />
            <stop offset="50%" stop-color="var(--blue-500)" />
            <stop offset="75%" stop-color="var(--cyan-500)" />
            <stop offset="100%" stop-color="var(--violet-500)" />
          {/if}
        </linearGradient>

        <!-- Radial gradient mask that follows the mouse -->
        <radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%" /* Radius of the reveal circle */
          cy={$maskPosition.cy}
          cx={$maskPosition.cx}
        >
          <stop offset="0%" stop-color="white" /> <!-- Revealed area -->
          <stop offset="100%" stop-color="black" /> <!-- Hidden area -->
        </radialGradient>

        <!-- Mask definition -->
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      <!-- Background text (dimmed stroke, slightly visible on hover for depth) -->
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        stroke-width="0.3"
        class="font-[helvetica] transition-all duration-200 font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-5xl"
        style:opacity={$hovered ? 0.7 : 0}
      >
        {text}
      </text>

      <!-- Base text (main visible stroke) -->
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        stroke-width="0.3"
        class="font-[helvetica] font-bold fill-transparent text-5xl stroke-neutral-200 dark:stroke-neutral-700/60"
      >
        {text}
      </text>

      <!-- Top text with gradient stroke, revealed by the mask -->
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        stroke="url(#textGradient)"
        stroke-width="0.3"
        mask="url(#textMask)"
        class="font-[helvetica] font-bold fill-transparent text-5xl"
      >
        {text}
      </text>
    </svg>
    ```

## Examples

1.  **`TextHoverPreview.svelte`**:
    *   A basic example showing the `TextHoverComp` rendering the word "SVELTE".

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/text-hover-effect/TextHoverPreview.svelte
    <script>
      import TextHoverComp from "./TextHoverComp.svelte";
    </script>

    <div class="h-[20rem] flex items-center justify-center bg-black"> {/* Example wrapper */}
      <TextHoverComp text="SVELTE" />
    </div>
    ```

## Manifest File (`acetTextHover.ts`)

*   Defines the component's metadata (ID: "text-hover-effect", title, description, tags).
*   Specifies the preview component (`TextHoverPreview`).
*   Provides installation instructions:
    *   Dependencies: `clsx`, `tailwind-merge` (primarily for the `cn` utility, if used elsewhere or if the component is extended).
    *   **Crucially**, it highlights the need to add a Tailwind CSS plugin (`addVariablesForColors` from `tailwind.config.ts`) to make Tailwind color palette (e.g., `var(--yellow-500)`) available as CSS variables for the SVG gradients.
    *   Includes the source code for `TextHoverComp.svelte`.

## Basic Usage

To use the `TextHoverComp` component:

1.  **Installation & Setup**:
    *   Ensure `clsx` and `tailwind-merge` are installed if you use the `cn` utility in your project.
    *   **Most importantly**, configure your `tailwind.config.ts` to expose color variables as described in the `acetTextHover.ts` manifest. Without this, the gradient colors like `var(--yellow-500)` will not work.
    *   Copy `TextHoverComp.svelte` into your project (e.g., `$lib/components/`).

    ```typescript // tailwind.config.ts snippet from acetTextHover.ts
    import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
    // ... other imports ...

    const config: Config = {
      // ...
      plugins: [addVariablesForColors /*, ...other plugins */],
    };

    function addVariablesForColors({ addBase, theme }: any) {
      let allColors = flattenColorPalette(theme("colors"));
      let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );
      addBase({ ":root": newVars });
    }

    export default config;
    ```

2.  **Using the Component**:
    Import and use `TextHoverComp` in your Svelte files, providing the `text` prop. Ensure the parent container has defined dimensions for the SVG to fill.

    ```svelte /dev/null/MyPageWithTextHover.svelte
    <script>
      import TextHoverComp from '$lib/components/TextHoverComp.svelte'; // Adjust path as needed
    </script>

    <div class="w-full h-64 flex items-center justify-center bg-neutral-900 p-4 my-8">
      <div class="w-[400px] h-[150px]"> {/* Container to give SVG dimensions */}
        <TextHoverComp text="HOVERME" />
      </div>
    </div>

    <div class="w-full h-48 flex items-center justify-center bg-gray-200 p-4">
       <div class="w-[600px] h-[100px]">
        <TextHoverComp text="Interactive SVG" />
      </div>
    </div>
    ```

**Key Considerations**:

*   **Tailwind Color Variables**: The `addVariablesForColors` plugin in `tailwind.config.ts` is essential for the gradient colors to function.
*   **SVG ViewBox & Sizing**: The `viewBox` in `TextHoverComp.svelte` and the size of its parent container will affect how the text is displayed and scaled. You might need to adjust the `viewBox` or text styling (font size in SVG) for different text lengths or desired visual outcomes.
*   **Font**: The component uses `font-[helvetica]`. Ensure this font is available or change it to your desired font family within the SVG's `<text>` elements.
*   **Styling**: The component uses specific classes for stroke color (e.g., `stroke-neutral-200 dark:stroke-neutral-800`). These are Tailwind classes and should work if Tailwind is set up.

This component offers a sophisticated text animation by leveraging SVG capabilities combined with Svelte's reactivity for mouse interactions.
```