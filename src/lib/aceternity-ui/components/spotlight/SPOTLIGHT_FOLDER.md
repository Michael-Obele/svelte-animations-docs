```markdown
# Folder: /lib/aceternity-ui/components/spotlight

This folder contains the Svelte implementation of the **Spotlight** component, designed to create a visual spotlight effect that draws attention to a section of a page.

## Core Components

1.  **`Spotlight.svelte`** (Main Component):
    *   This component renders an SVG element that creates the spotlight visual.
    *   The spotlight effect is achieved using an SVG `<ellipse>` with a blur filter (`<feGaussianBlur>`).
    *   The SVG is positioned absolutely and uses a CSS animation (`animate-spotlight`) defined in `tailwind.config.ts` to control its appearance (opacity and transform/scale).
    *   It's typically placed within a container that has `position: relative` and `overflow: hidden`.
    *   Accepts props:
        *   `class`: (string, optional) Additional CSS classes to apply to the SVG element, allowing for custom positioning (e.g., `-top-40 left-0 md:left-40 md:-top-8`).
        *   `fill`: (string, optional) The fill color for the spotlight ellipse. Defaults to "white" if not provided, affecting the `fill-opacity` which is set to `0.21`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/spotlight/Spotlight.svelte
    <script lang="ts">
      import { cn } from "$lib/utils";

      /**
       * @component
       * Spotlight creates a visual spotlight effect using an animated SVG ellipse
       * with a blur filter. It's typically positioned absolutely within a container.
       *
       * @prop class - Optional CSS classes for positioning and styling the SVG.
       * @prop fill - The fill color of the spotlight ellipse.
       */
      let _class: string = "";
      export let fill: string = ""; // Default fill is handled in the SVG if this is empty
      export { _class as class };
    </script>

    <svg
      class={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0", // Base classes including animation trigger
        _class // User-provided classes for positioning
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"} // Uses fill prop or defaults to white
          fill-opacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" // Blur effect
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
    ```

## Examples

1.  **`ExampleSpotlight.svelte`**:
    *   Demonstrates how to use the `Spotlight` component within a full-width section with a background grid and text content.
    *   The parent `div` has `position: relative` and `overflow: hidden` to properly contain and clip the absolutely positioned spotlight.
    *   Shows an example of positioning the spotlight using the `class` prop.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/spotlight/ExampleSpotlight.svelte
    <script>
      import Spotlight from "./Spotlight.svelte";
    </script>

    <div
      class="h-[30rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden"
    >
      {/* Spotlight positioned using class prop */}
      <Spotlight
        class="-top-40 left-0 md:left-40 md:-top-8"
        fill="white"
      />
      <div class=" max-w-7xl mx-auto relative z-10 w-full p-4"> {/* Content is z-10 to be above spotlight (z-[1]) */}
        <h1
          class="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
        >
          Spotlight <br /> is the new trend.
        </h1>
        <p
          class="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto"
        >
          Spotlight effect is a great way to draw attention to a specific part of
          the page. Here, we are drawing the attention towards the text section of
          the page. I don&apos;t know why but I&apos;m running out of copy.
        </p>
      </div>
    </div>
    ```

## Manifest File (`acetSpotlight.ts`)

*   Defines the component's metadata (ID: "spotlight", title, description, tags).
*   Specifies the preview component (`ExampleSpotlight`).
*   Provides installation instructions:
    *   Dependencies (`clsx`, `tailwind-merge` for the `cn` utility).
    *   Utility function (`cn`) setup.
    *   **Crucially, it includes the necessary Tailwind CSS configuration for the `animate-spotlight` animation.** This involves adding `animation` and `keyframes` to the `theme.extend` section of `tailwind.config.ts`.

    ```javascript
    // Example tailwind.config.ts excerpt from acetSpotlight.ts
    // theme: {
    //   extend: {
    //     animation: {
    //       spotlight: "spotlight 2s ease .75s 1 forwards",
    //     },
    //     keyframes: {
    //       spotlight: {
    //         "0%": {
    //           opacity: 0,
    //           transform: "translate(-72%, -62%) scale(0.5)",
    //         },
    //         "100%": {
    //           opacity: 1,
    //           transform: "translate(-50%,-40%) scale(1)",
    //         },
    //       },
    //     },
    //   },
    // }
    ```
    *   Source code for `Spotlight.svelte`.

## Basic Usage

To use the `Spotlight` component:

1.  **Installation**:
    *   Ensure `clsx` and `tailwind-merge` are installed (if using the `cn` utility, which is good practice with Tailwind).
    *   Set up the `cn` utility function (e.g., in `$lib/utils.ts`).
    *   Copy `Spotlight.svelte` into your project.
    *   **Most importantly**: Add the `spotlight` animation and keyframes to your `tailwind.config.ts` as specified in `acetSpotlight.ts`. Without this, the spotlight will not animate into view.

2.  **Using the Component**:
    *   Create a container element that will hold the content and the spotlight. This container should have `position: relative;` and usually `overflow: hidden;` to clip the spotlight SVG.
    *   Place the `<Spotlight />` component inside this container.
    *   Use the `class` prop on `<Spotlight />` to position it as desired (e.g., `class="-top-20 -left-20"`).
    *   Use the `fill` prop to set the color of the spotlight.
    *   Ensure your main content within the container has a `z-index` higher than the spotlight (spotlight uses `z-[1]`) if they overlap.

```svelte /dev/null/MySpotlightPage.svelte
<script>
  import Spotlight from '$lib/components/Spotlight.svelte'; // Adjust path as needed
  // Ensure $lib/utils.ts with cn function exists
</script>

<div class="my-10 p-8 bg-gray-900 rounded-xl relative overflow-hidden shadow-2xl">
  <!-- Position the spotlight. It will animate in. -->
  <Spotlight
    class="absolute -top-1/4 -left-1/4 md:-left-1/2 md:-top-1/2 h-[200%] w-[200%]"
    fill="rgba(100, 180, 255, 0.5)"
  />

  <!-- Your content, make sure it's above the spotlight if needed -->
  <div class="relative z-10 text-center">
    <h2 class="text-5xl font-bold text-white mb-4">
      Look at This!
    </h2>
    <p class="text-lg text-neutral-300 max-w-md mx-auto">
      This section is highlighted with a beautiful spotlight effect,
      drawing your attention right where it's needed.
    </p>
    <button class="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
      Learn More
    </button>
  </div>
</div>

<style>
  /* Ensure your tailwind.config.ts has the 'spotlight' animation keyframes! */
</style>
```

The `animate-spotlight` class in `Spotlight.svelte` triggers the animation defined in your Tailwind config, making the spotlight appear and scale into place.
```