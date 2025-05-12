```markdown
# Folder: /lib/aceternity-ui/components/Lens

This folder contains the Svelte implementation of the **Lens** component, which provides a magnifying glass effect over its slotted content (images, divs, etc.).

## Core Components

1.  **`Lens.svelte`**:
    *   The main component that implements the magnifying lens effect.
    *   It works by creating a masked overlay that shows a scaled version of the slotted content.
    *   The lens position can follow the mouse (`isStatic = false`) or be fixed (`isStatic = true`).
    *   Uses `svelte/transition` (`scaleTransition`) for the lens appear/disappear animation.
    *   Accepts props for customization:
        *   `zoomFactor`: (number, default: 1.5) The magnification level.
        *   `lensSize`: (number, default: 170) Diameter of the lens circle in pixels.
        *   `isStatic`: (boolean, default: false) If true, lens position is fixed using the `position` prop; otherwise, it follows the mouse.
        *   `position`: ({ x: number, y: number }, default: { x: 200, y: 150 }) The fixed or initial center coordinates of the lens.
        *   `hovering`: (boolean, bindable, default: false) True when the mouse is over the component. Can be bound using `bind:hovering`.
    *   Provides a default `<slot>` for the content to be magnified.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/Lens/Lens.svelte
    <script lang="ts">
      import { scale as scaleTransition } from "svelte/transition"; // Renamed to avoid conflict with transform: scale

      /**
       * @component
       * Lens provides a magnifying glass effect for its slotted content.
       * It can operate in a dynamic mode (following the mouse) or a static mode (fixed lens position).
       * The zoom level and lens size are configurable.
       *
       * @prop zoomFactor - The magnification level for the lens. Default is 1.5.
       * @prop lensSize - The diameter of the lens circle in pixels. Default is 170.
       * @prop isStatic - If true, the lens position is fixed to the `position` prop values.
       *                 If false, the lens follows the mouse cursor. Default is false.
       * @prop position - An object { x, y } specifying the lens center coordinates.
       *                 Used when `isStatic` is true, or as the initial position if `isStatic` is false.
       *                 Defaults to { x: 200, y: 150 }.
       * @prop hovering - A boolean state that is true when the mouse is over the component.
       *                 This prop can be bound to (`bind:hovering`) to get the hover state in the parent.
       *                 Defaults to false.
       *
       * @slot - Default slot for the content to be magnified.
       */
      export let zoomFactor = 1.5;
      export let lensSize = 170;
      export let isStatic = false;
      export let position = { x: 200, y: 150 }; // Initial position, or static position
      export let hovering: boolean = false; // Default to false, parent can bind to it

      // ... (internal logic for mouse tracking and calculating styles) ...

      $: lensCenterX = isStatic ? position.x : mousePositionInternal.x;
      $: lensCenterY = isStatic ? position.y : mousePositionInternal.y;
    </script>

      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="relative overflow-hidden rounded-2xl z-20  cursor-none"
        on:mouseenter={() => (hovering = true)}
        on:mouseleave={() => (hovering = false)}
        on:mousemove={handleMouseMove}
      >
        <slot></slot> {#if hovering}
      <!-- Magnified content overlay with mask -->
      <div
        in:scaleTransition
        out:scaleTransition={{ duration: 400 }}
        class="absolute inset-0 overflow-hidden"
        style="
            mask-image: radial-gradient(circle {lensSize / 2}px at {lensCenterX}px {lensCenterY}px, black 100%, transparent 100%);
            -webkit-mask-image: radial-gradient(circle {lensSize / 2}px at {lensCenterX}px {lensCenterY}px, black 100%, transparent 100%);
            transform-origin: {lensCenterX}px {lensCenterY}px;
            z-index: {isStatic ? 'auto' : 50};
          "
        >
        <!-- Scaled content inside the mask -->
        <div
          class="absolute inset-0"
          style="transform: scale({zoomFactor}); transform-origin: {lensCenterX}px {lensCenterY}px;"
        >
          <slot></slot>
        </div>
      </div>
      {/if}
    </div>
    ```

## Examples Subdirectory (`examples/`)

This subdirectory provides usage examples:

-   **`LensPreview.svelte`**: A basic demonstration showing the lens effect on a static image.
-   **`BaiscWithAnimation.svelte`**: Shows the lens applied to an image within a card, blurring external text on hover.
-   **`LensWholeComp.svelte`**: Demonstrates applying the lens effect to an entire composite component (card with image and text).

```svelte svelte-animations-docs/src/lib/aceternity-ui/components/Lens/examples/LensPreview.svelte
<script>
  import Lens from "../Lens.svelte";

  /**
   * @component
   * LensPreview demonstrates the `Lens` component with a sample image.
   * It binds the `hovering` state, although it's not directly used in this preview's logic.
   */
  let hovering = false;
</script>

  <div class="flex justify-center items-center  w-full">
    <div class="relative z-10">
      <Lens bind:hovering>
          <img
            src="https://i.pinimg.com/564x/d3/0c/84/d30c84f735785bb97b2f502dcfbecd16.jpg"
            alt="Magnified content example"
            class="h-full w-[380px] scale-110 object-cover origin-center"
          />
      </Lens>
    </div>
  </div>
```

## Manifest File (`acetLens.ts`)

The component's metadata, installation instructions, and example configurations for the documentation site are defined centrally in `svelte-animations-docs/src/lib/aceternity-ui/components/allAceternityUI.ts` under the `id: "lens"` entry.

## Basic Usage

```svelte /dev/null/MyLensUsage.svelte
<script>
  import Lens from '$lib/aceternity-ui/components/Lens/Lens.svelte';
  import myImage from '$lib/assets/image-to-magnify.jpg'; // Replace with your image path

  let isHovering = false;
</script>

<div class="w-[400px] h-[300px] mx-auto my-8">
  <Lens
    zoomFactor={2}
    lensSize={150}
    bind:hovering={isHovering}
  >
    <!-- Content to magnify goes here -->
    <img
      src={myImage}
      alt="Magnifiable content"
      class="w-full h-full object-cover"
    />
  </Lens>
</div>

<!-- Optional: Display hover state -->
<p>Currently hovering: {isHovering}</p>
```

Refer to the `allAceternityUI.ts` file for detailed installation steps and dependencies (likely `clsx`, `tailwind-merge`).
```