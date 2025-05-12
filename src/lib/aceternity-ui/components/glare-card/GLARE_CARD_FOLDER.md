```markdown
# Folder: /lib/aceternity-ui/components/glare-card

This folder contains the Svelte implementation of the **Glare Card** component. This effect, inspired by designs like Linear's website, creates a card that has a dynamic, reflective "glare" or "foil" effect that responds to mouse movement, along with a subtle 3D tilt.

## Core Components

1.  **`GlareCard.svelte`** (Main Component):
    *   The primary component that orchestrates the glare and tilt effect.
    *   It uses CSS custom properties (variables) to control the glare position (`--m-x`, `--m-y`), background position (`--bg-x`, `--bg-y`), rotation (`--r-x`, `--r-y`), and other visual aspects like opacity and transition duration.
    *   On mouse move (`handlePointerMove`), it calculates the mouse position relative to the card and updates these CSS variables to create the interactive effect.
    *   The card has a layered structure:
        *   A base slot for content (`<slot />`).
        *   A glare layer (`mix-blend-soft-light`) whose `background` (a radial gradient) position is controlled by `--m-x` and `--m-y`.
        *   A "foil" layer (`mix-blend-color-dodge`) that uses a combination of background images/gradients (including an SVG referenced by `--foil-svg`) to create the colorful, reflective sheen. Its appearance is also tied to mouse position via `--bg-x` and `--bg-y`.
    *   The entire card tilts based on mouse position using `transform: rotateY(var(--r-x)) rotateX(var(--r-y))`.
    *   Props:
        *   `class`: (string, optional) Additional CSS classes for the content wrapper div inside the card.
    *   **Important CSS Variable**: `--foil-svg` is expected to be defined globally (or within the component's style scope if adjusted) and should point to an SVG file used for the foil pattern. The provided `GlareCard.svelte` defines a fallback in its `<style>` block: `:global(:root) { --foil-svg: url('./svelte.svg'); }`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/glare-card/GlareCard.svelte
    <script lang="ts">
      import { cn } from "$lib/utils";
      // import svelte from "./svelte.svg"; // Path to the SVG for the foil effect

      let _class;
      export { _class as class };
      let refElement: HTMLElement;
      let isPointerInside = false;
      // ... (state for glare, background, rotate)

      const updateStyles = () => {
        if (refElement) {
          // ... (set CSS custom properties like --m-x, --r-x, etc.)
        }
      };

      const handlePointerMove = (event) => {
        // ... (calculate percentages, deltas, and update state)
        updateStyles();
      };

      const handlePointerEnter = () => { /* ... */ };
      const handlePointerLeave = () => { /* ... */ };
    </script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      style="
      --m-x:50%; /* Mouse X for glare */
      --m-y:50%; /* Mouse Y for glare */
      --r-x:0deg; /* Rotate X */
      --r-y:0deg; /* Rotate Y */
      --bg-x:50%; /* Background X for foil */
      --bg-y:50%; /* Background Y for foil */
      --duration:300ms;
      --foil-size:100%;
      --opacity:0; /* Initial glare opacity */
      --radius:48px; /* Card border radius */
      --easing:ease;
      --transition: var(--duration) var(--easing);
      "
      class="relative isolate [contain:layout_style] [perspective:600px] w-[320px] [aspect-ratio:17/21] ..."
      bind:this={refElement}
      on:mousemove={handlePointerMove}
      on:mouseenter={handlePointerEnter}
      on:mouseleave={handlePointerLeave}
    >
      <div
        class="h-full grid will-change-transform origin-center transition-transform ... [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] border ..."
      >
        <!-- Base Content Layer -->
        <div class="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div class={cn("h-full w-full bg-slate-950", _class)}>
            <slot />
          </div>
        </div>
        <!-- Glare Overlay Layer -->
        <div
          class="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] ... [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]"
        ></div>
        <!-- Foil Effect Layer -->
        <div
          class="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] ... after:bg-[inherit] after:mix-blend-exclusion ..."
          style="--step: 5%;
          --pattern: var(--foil-svg) center/100% no-repeat; /* Uses --foil-svg */
          --rainbow: repeating-linear-gradient(...);
          --diagonal: repeating-linear-gradient(...);
          --shade: radial-gradient(...);
          background-blend-mode: hue, hue, hue, overlay;"
        ></div>
      </div>
    </div>

    <style>
      /* Default --foil-svg if not provided globally, expects svelte.svg in the same dir */
      :global(:root) {
        --foil-svg: url('./svelte.svg'); /* Make sure this path is correct or override globally */
      }
    </style>
    ```

2.  **`svelte.svg`** (or your custom SVG for the foil pattern):
    *   This SVG is used by the foil effect layer. Its pattern contributes to the reflective, colorful sheen.
    *   The default one provided features the Svelte logo. You can replace this with any SVG pattern.

    ```svg svelte-animations-docs/src/lib/aceternity-ui/components/glare-card/svelte.svg
    <svg stroke-width="5" ... viewBox="0 0 256 308" ...>
        <path d="..." fill="#FF3E00" /> <!-- Svelte orange -->
        <path d="..." fill="#FFF" />    <!-- Svelte white part -->
    </svg>
    ```
    *(SVG content is truncated for brevity)*

3.  **`glare.svg`**:
    *   This SVG is **not directly used** by the `GlareCard.svelte` component in the provided code. It might be a leftover asset or intended for a different variation. The glare effect in `GlareCard.svelte` is achieved using CSS radial gradients.

## Examples

-   **`GlareExampleCard.svelte`**:
    *   Demonstrates a simple usage of `GlareCard` by placing an SVG (Svelte logo) and some text inside it.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/glare-card/GlareExampleCard.svelte
    <script>
      import GlareCard from "./GlareCard.svelte";
    </script>

    <div class="flex items-center justify-center h-screen bg-neutral-900"> {/* Example wrapper */}
      <GlareCard class="flex flex-col items-center justify-center p-6">
        <svg viewBox="0 0 256 308" width="66" height="65" ...> {/* Svelte Logo SVG */}
          <path d="..." fill="#FF3E00"/>
          <path d="..." fill="#FFF"/>
        </svg>
        <p class="text-white font-bold text-xl mt-4">Svelte 5</p>
      </GlareCard>
    </div>
    ```

## Manifest File (`acetGlareCard.ts`)

-   Defines the component's metadata (ID, title, description, tags).
-   Specifies the preview component (`GlareExampleCard`).
-   Provides installation instructions:
    *   Dependencies (`clsx`, `tailwind-merge`).
    *   Utility function (`cn`).
    *   Source code for `GlareCard.svelte`.
    *   Crucially, the instruction to **add the SVG file** (e.g., `svelte.svg`) that will be used for the foil effect (referenced by the `--foil-svg` CSS variable).

## Basic Usage

To use the `GlareCard` component:

1.  **Installation**:
    *   Install dependencies: `npm install clsx tailwind-merge`.
    *   Set up the `cn` utility function in `$lib/utils.ts`.
    *   Copy `GlareCard.svelte` to your project.
    *   Place your chosen SVG for the foil effect (e.g., `my-foil-pattern.svg`) in a location accessible by CSS `url()`. Ensure the `--foil-svg` CSS variable points to it. You can set this globally in your `app.html` or main CSS file, or modify the `<style>` block in `GlareCard.svelte` if keeping it local.

    ```css /* In app.html or global.css */
    :root {
      --foil-svg: url('/path/to/your/my-foil-pattern.svg');
    }
    ```

2.  **Using the Component**:

    ```svelte /dev/null/MyGlarePage.svelte
    <script>
      import GlareCard from '$lib/components/GlareCard.svelte'; // Adjust path as needed
    </script>

    <div class="flex justify-center items-center min-h-screen bg-gray-900 p-10">
      <GlareCard class="p-8 bg-neutral-800 text-center">
        <img src="/images/my-product.png" alt="Product" class="w-32 h-32 mx-auto mb-4 rounded-lg" />
        <h3 class="text-2xl font-bold text-white">Amazing Product</h3>
        <p class="text-neutral-300 mt-2">
          This product will change your life with its glare effect!
        </p>
      </GlareCard>
    </div>
    ```

**Key Considerations**:

*   **`--foil-svg` Variable**: The correct setup of the `--foil-svg` CSS variable is critical for the foil effect to work. Make sure the path to your SVG is correct.
*   **Performance**: The multiple background layers and blend modes can be somewhat performance-intensive. Test on target devices.
*   **Customization**: The card's appearance (size, aspect ratio, border radius, initial background) can be customized by modifying the inline styles in the `div` with `class="relative isolate..."` or by passing classes to affect the slotted content area.

Refer to `acetGlareCard.ts` for specific file contents to copy and exact installation guidance.
```