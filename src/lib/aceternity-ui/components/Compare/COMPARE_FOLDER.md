# Folder: /lib/aceternity-ui/components/Compare

This folder contains the Svelte **Compare** component, which allows users to visually compare two images side-by-side using an interactive slider.

## Core Components

1.  **`Compare.svelte`**:
    *   The main component that renders the two images and the comparison slider.
    *   Uses `svelte/motion`'s `tweened` store to smoothly animate the slider position.
    *   Supports two interaction modes: `"hover"` (slider follows mouse) and `"drag"` (slider is draggable).
    *   Includes optional autoplay functionality where the slider moves back and forth automatically.
    *   Handles mouse and touch events for interaction.
    *   Accepts props for customization:
        *   `firstImage`: (string) Path/URL to the first image.
        *   `secondImage`: (string) Path/URL to the second image.
        *   `class`: (string, optional) CSS classes for the main container.
        *   `firstImageClass`: (string, optional) CSS classes for the first image container.
        *   `secondImageClass`: (string, optional) CSS classes for the second image container.
        *   `initialSliderPercentage`: (number, default: 50) Initial slider position (0-100).
        *   `slideMode`: ('hover' | 'drag', default: 'hover') Interaction mode.
        *   `showHandlebar`: (boolean, default: true) Whether to display the drag handle.
        *   `autoplay`: (boolean, default: false) Enable automatic slider animation.
        *   `autoplayDuration`: (number, default: 5000) Duration (ms) for one autoplay cycle.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/Compare/Compare.svelte
    <script lang="ts">
      import { onMount } from "svelte";
      import { tweened } from "svelte/motion";

      // ... (props definition as in the component file) ...
      export let firstImage: string = "";
      export let secondImage: string = "";
      let className: string = "";
      export { className as class };
      export let firstImageClass: string = "";
      export let secondImageClass: string = "";
      export let initialSliderPercentage: number = 50;
      export let slideMode: "hover" | "drag" = "hover";
      export let showHandlebar: boolean = true;
      export let autoplay: boolean = false;
      export let autoplayDuration: number = 5000;

      let sliderXPercent = tweened(initialSliderPercentage, { duration: 0 });
      // ... (rest of the component logic) ...
    </script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      bind:this={sliderRef}
      class="w-[400px] h-[400px] overflow-hidden {className}"
      style="position: relative; cursor: {slideMode === 'drag'
        ? isDragging ? 'grabbing': 'grab'
        : 'col-resize'};"
      on:mousemove={handleMouseMove}
      on:mouseleave={mouseLeaveHandler}
      on:mouseenter={mouseEnterHandler}
      on:mousedown={handleMouseDown}
      on:mouseup={handleMouseUp}
      on:touchstart={handleTouchStart}
      on:touchend={handleTouchEnd}
      on:touchmove={handleTouchMove}
    >
      <!-- Handlebar -->
      {#if showHandlebar}
      <div
        class="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
        style="left: {$sliderXPercent}%; top: 0; z-index: 40;"
      >
          <div
            class="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]"
          >
             <!-- Handle icon SVG -->
          </div>
      </div>
      {/if}

      <!-- First Image (clipped) -->
      <div class="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        {#if firstImage}
          <div
            class="absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none overflow-hidden {firstImageClass}"
            style="clip-path: inset(0 {100 - $sliderXPercent}% 0 0);"
          >
            <img
              alt="first image"
              src={firstImage}
              class="absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none {firstImageClass}"
              draggable="false"
            />
          </div>
        {/if}
      </div>

      <!-- Second Image (base) -->
      {#if secondImage}
        <img
          class="absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none {secondImageClass}"
          alt="second image"
          src={secondImage}
          draggable="false"
        />
      {/if}
    </div>
    ```

2.  **`ComparePreview.svelte`**:
    *   An example component demonstrating the usage of `Compare.svelte`.
    *   It imports images (`Svelte4Syntax`, `Svelte5Syntax`) and passes them to the `Compare` component along with other configuration props.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/Compare/ComparePreview.svelte
    <script>
      /**
       * @component
       * ComparePreview demonstrates a basic usage of the `Compare` component,
       * showcasing a comparison between Svelte 4 and Svelte 5 syntax images.
       */
      import Svelte4Syntax from "$lib/svg/svelte4Syntax.png";
      import Svelte5Syntax from "$lib/svg/svelte5syntax.png";
      import Compare from "./Compare.svelte";
    </script>

    <div
      class="p-4 mx-auto border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 px-4"
    >
      <Compare
        firstImage={Svelte4Syntax}
        secondImage={Svelte5Syntax}
        firstImageClass="object-contain object-center"
        secondImageClass="object-contain object-center"
        class="h-[250px] w-[200px] md:h-[350px] md:w-[580px]"
        slideMode="hover"
      />
    </div>
    ```

3.  **`acetCompare.ts`**:
    *   The manifest file for the Compare component.
    *   Defines the `AceternityUI` object containing metadata (id, title, description, tags), preview component (`ComparePreview`), and installation instructions (dependencies, utility function, source code).

## Basic Usage

```svelte /dev/null/MyCompareUsage.svelte
<script>
  import Compare from '$lib/aceternity-ui/components/Compare/Compare.svelte';
  import beforeImage from '$lib/assets/before.jpg'; // Replace with actual image paths
  import afterImage from '$lib/assets/after.jpg';
</script>

<div class="my-8">
  <Compare
    firstImage={beforeImage}
    secondImage={afterImage}
    class="h-[300px] w-[500px] mx-auto"
    firstImageClass="object-cover"
    secondImageClass="object-cover"
    slideMode="drag"
    initialSliderPercentage={30}
    showHandlebar={true}
    autoplay={false}
  />
</div>
```

Refer to `acetCompare.ts` for detailed installation steps and dependencies (`clsx`, `tailwind-merge`, `svelte-motion`).