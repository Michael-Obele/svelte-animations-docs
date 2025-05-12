```markdown
# Folder: /lib/aceternity-ui/components/wobble-card

This folder contains the Svelte implementation of the **Wobble Card** component. This component creates a card that exhibits a "wobble" or slight 3D tilting effect that responds to mouse movement when hovered over.

## Core Components

1.  **`WobbleCard.svelte`** (Main Component):
    *   The primary component that implements the interactive wobble effect.
    *   It tracks mouse movement (`handleMouseMove`) within its bounds and updates `mousePosition` (x, y offsets from the center).
    *   When the mouse is hovering (`isHovering` is true), it applies CSS `transform: translate3d(...) scale3d(...)` to itself and an inner div.
        *   The outer card section moves slightly *with* the mouse (e.g., `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`).
        *   An inner content wrapper moves slightly in the *opposite* direction of the mouse (e.g., `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0)`) and scales up slightly (`scale3d(1.03, 1.03, 1)`), creating the parallax/wobble effect.
    *   CSS transitions (`transition: transform 0.1s ease-out;`) are used for smooth animation as the mouse moves and enters/leaves the card.
    *   Props:
        *   `containerClass`: (string, optional) CSS classes for the outermost `section` element, useful for grid placement or overall sizing.
        *   `class`: (string, optional) CSS classes for the inner content `div`, allowing styling of the content area itself.
    *   Provides a default `<slot>` for the card's content.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/wobble-card/WobbleCard.svelte
    <script lang="ts">
      import { cn } from "$lib/utils";

      /**
       * @component
       * WobbleCard creates an interactive card that tilts and shifts slightly
       * in response to mouse movement when hovered, creating a "wobble" effect.
       *
       * @prop containerClass - Optional CSS classes for the main card container (section element).
       * @prop class - Optional CSS classes for the inner content wrapper div.
       * @slot - Default slot for the content of the card.
       */
      let mousePosition = { x: 0, y: 0 };
      let isHovering = false;
      export let containerClass = "";
      let _class = "";
      export { _class as class };

      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const rect = event.currentTarget.getBoundingClientRect();
        // Calculate mouse position relative to the center of the card, divided by a factor for sensitivity
        const x = (clientX - (rect.left + rect.width / 2)) / 20;
        const y = (clientY - (rect.top + rect.height / 2)) / 20;
        mousePosition = { x, y };
      };

      const handleMouseLeave = () => {
        isHovering = false;
        mousePosition = { x: 0, y: 0 }; // Reset position when mouse leaves
      };
    </script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <section
      on:mousemove={handleMouseMove}
      on:mouseenter={() => (isHovering = true)}
      on:mouseleave={handleMouseLeave}
      style="transform: {isHovering
        ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
        : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)'}; transition: transform 0.1s ease-out;"
      class={cn(
        "mx-auto w-full bg-indigo-800 relative rounded-2xl overflow-hidden", // Base styling
        containerClass // User-provided container classes
      )}
    >
      <div
        class="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
        style="box-shadow: 0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10);"
      >
        <div
          style="transform: {isHovering
            ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
            : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)'}; transition: transform 0.1s ease-out;"
          class={cn("h-full px-4 py-20 sm:px-10", _class)} // User-provided content classes
        >
          <slot /> {/* Card content goes here */}
        </div>
      </div>
    </section>
    ```

## Examples

1.  **`ExampleWobbleCard.svelte`**:
    *   Demonstrates how to use `WobbleCard` components within a responsive grid layout (`grid grid-cols-1 lg:grid-cols-3`).
    *   Shows various `WobbleCard` instances with different `containerClass` for column spanning (e.g., `lg:col-span-2`) and minimum heights.
    *   Content within the cards includes text and absolutely positioned images.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/wobble-card/ExampleWobbleCard.svelte
    <script>
      import WobbleCard from "./WobbleCard.svelte";
      import LinearImg from "./linear.webp"; // Example image
    </script>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full py-10">
      <WobbleCard
        containerClass="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
      >
        <div class="max-w-xs">
          <h2 class="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Gippity AI powers the entire universe
          </h2>
          <p class="mt-4 text-left text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
        <img
          src={LinearImg}
          width={500}
          height={500}
          alt="linear demo"
          class="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClass="col-span-1 min-h-[300px] bg-blue-800"> {/* Added bg for visibility */}\
        <h2 class="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No shirt, no shoes, no weapons.
        </h2>
        <p class="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p>
      </WobbleCard>
      <WobbleCard
        containerClass="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
      >
        <div class="max-w-sm">
          <h2 class="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Signup for blazing-fast cutting-edge state of the art Gippity AI wrapper today!
          </h2>
          <p class="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
        <img
          src={LinearImg}
          width={500}
          height={500}
          alt="linear demo"
          class="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
    ```

2.  **`linear.webp`**:
    *   An example image asset used in `ExampleWobbleCard.svelte`.

## Manifest File (`acetWobbleCard.ts`)

*   Defines the component's metadata (ID: "wobble-card", title, description, tags).
*   Specifies the preview component (`ExampleWobbleCard`).
*   Provides installation instructions:
    *   Dependencies (`clsx`, `tailwind-merge` for the `cn` utility).
    *   Utility function (`cn`) setup.
    *   Source code for `WobbleCard.svelte`.

## Basic Usage

To use the `WobbleCard` component:

1.  **Installation**:
    *   Ensure `clsx` and `tailwind-merge` are installed if you use the `cn` utility.
    *   Set up the `cn` utility function (e.g., in `$lib/utils.ts`).
    *   Copy `WobbleCard.svelte` into your project.
2.  **Using the Component**:
    *   Wrap your card content with the `<WobbleCard>` component.
    *   Use `containerClass` to control grid layout, background color, or dimensions of the card itself.
    *   Use the default slot to place the content inside the card.

```svelte /dev/null/MyWobblePage.svelte
<script>
  import WobbleCard from '$lib/components/WobbleCard.svelte'; // Adjust path as needed
  // Ensure $lib/utils.ts with cn function exists
</script>

<div class="p-10 bg-gray-900 min-h-screen">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
    <WobbleCard containerClass="bg-purple-700 min-h-[300px] p-6">
      <h3 class="text-2xl font-bold text-white">Interactive Card 1</h3>
      <p class="text-purple-200 mt-2">
        Hover over me to see the wobble effect. This card uses a purple background.
      </p>
    </WobbleCard>

    <WobbleCard containerClass="bg-teal-700 min-h-[300px] p-6">
      <h3 class="text-2xl font-bold text-white">Interactive Card 2</h3>
      <p class="text-teal-200 mt-2">
        Another card with the same cool wobble effect, but with a teal background.
      </p>
      <img
        src="/images/some-decoration.png" alt="decoration"
        class="absolute bottom-0 right-0 w-1/2 opacity-30 pointer-events-none"
      />
    </WobbleCard>
  </div>
</div>
```

This setup will create two interactive cards that wobble when hovered. The visual appearance (background color, size, padding) is primarily controlled by Tailwind CSS classes applied via the `containerClass` prop and directly on the slotted content.
```