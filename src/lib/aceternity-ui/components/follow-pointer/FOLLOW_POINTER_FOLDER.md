```markdown
# Folder: /lib/aceternity-ui/components/follow-pointer

This folder contains the Svelte components for creating a **Follow Pointer** effect. This effect involves a card or element that, when hovered, displays a custom cursor (an SVG icon and a title) that follows the mouse pointer within its boundaries.

## Core Components

1.  **`FollowPointerCard.svelte`**:
    *   The main wrapper component that enables the follow-pointer behavior for its slotted content.
    *   It tracks mouse enter, leave, and move events on its own div (`ref`).
    *   Uses `svelte/motion`'s `spring` store to smoothly animate the position (`x`, `y`) of the custom pointer.
    *   Conditionally renders the `FollowPointer.svelte` component when the mouse is inside (`isInside`).
    *   Passes the animated `x`, `y` coordinates and a `title` prop to `FollowPointer.svelte`.
    *   Accepts props:
        *   `title`: (string, default: "Coding is fun") The text to display next to the pointer icon.
    *   Provides a default `<slot>` for the content over which the follow-pointer effect will be active.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/follow-pointer/FollowPointerCard.svelte
    <script>
      import { spring } from "svelte/motion";
      import FollowPointer from "./FollowPointer.svelte"; // The custom pointer component

      /**
       * @component
       * FollowPointerCard is a wrapper that enables a custom pointer to follow the mouse
       * within its boundaries when hovered.
       *
       * @prop title - The text displayed next to the custom pointer icon.
       * @slot - Default slot for the content over which the effect is active.
       */
      export let title = "Coding is fun";

      let ref = null; // Bound to the div
      let isInside = false; // Tracks if mouse is inside the div

      // Spring values for smooth pointer movement
      let x = spring(0, { stiffness: 0.25, damping: 1.4 });
      let y = spring(0, { stiffness: 0.25, damping: 1.4 });

      const handleMouseMove = (e) => {
        if (ref) {
          let rects = ref.getBoundingClientRect();
          // Update spring values based on mouse position relative to the element
          x.set(e.clientX - rects.left);
          y.set(e.clientY - rects.top);
        }
      };

      const handleMouseLeave = () => {
        isInside = false;
      };

      const handleMouseEnter = () => {
        isInside = true;
      };
    </script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      on:mouseleave={handleMouseLeave}
      on:mouseenter={handleMouseEnter}
      on:mousemove={handleMouseMove}
      bind:this={ref}
      style="cursor: none" /* Hide default cursor */
      class="relative"
    >
      {#if isInside}
        <!-- Render the custom pointer when mouse is inside -->
        <FollowPointer x={$x} y={$y} {title} />
      {/if}
      <slot></slot> {/* Content goes here */}
    </div>
    ```

2.  **`FollowPointer.svelte`**:
    *   The component that renders the actual custom pointer (SVG icon and title text).
    *   It is positioned absolutely based on the `x` and `y` props (animated spring values) received from `FollowPointerCard.svelte`.
    *   Uses Svelte transitions (`scale` or others like `fade`, `fly`) for its appearance.
    *   The title text has a background color randomly selected from a predefined array of `colors`.
    *   Accepts props:
        *   `x`: (number) The horizontal position for the pointer.
        *   `y`: (number) The vertical position for the pointer.
        *   `title`: (string, default: "William Shakespeare") The text to display.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/follow-pointer/FollowPointer.svelte
    <script>
      import { fade, fly, scale, slide } from "svelte/transition"; // Import transitions

      /**
       * @component
       * FollowPointer displays the custom cursor icon and title, positioned
       * according to the x and y props.
       *
       * @prop x - The horizontal position of the pointer.
       * @prop y - The vertical position of the pointer.
       * @prop title - The text to display with the pointer.
       */
      export let x;
      export let y;
      export let title = "William Shakespeare";

      // Predefined colors for the title's background
      const colors = [
        "var(--sky-500)",
        "var(--neutral-500)",
        "var(--teal-500)",
        // ... more colors
      ];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
    </script>

    <!-- Position the pointer absolutely using style prop -->
    <div
      class="rounded-full absolute z-50"
      style="top: {y}px; left: {x}px; pointer-events: none;"
      in:scale /* Example Svelte transition */
    >
      <!-- SVG icon for the pointer -->
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="1"
        style="transform: rotate(-70deg) translateX(-2px) translateY(-15px);"
        viewBox="0 0 16 16"
        class="h-6 w-6 text-sky-500 stroke-sky-600" /* Example styling */
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
        ></path>
      </svg>

      <!-- Title text with random background color -->
      <div
        class="px-4 py-2 bg-neutral-200 text-white whitespace-nowrap min-w-max text-xs rounded-full"
        style="background-color: {randomColor};"
      >
        {title}
      </div>
    </div>
    ```

## Examples

-   **`AcetFollowPointerExample.svelte`**:
    *   Demonstrates how to use `FollowPointerCard` by wrapping a sample blog card content.
    *   When hovering over the blog card, the custom "Sikandar Bhide" pointer appears and follows the mouse.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/follow-pointer/AcetFollowPointerExample.svelte
    <script>
      import FollowPointerCard from "./FollowPointerCard.svelte";

      const blogContent = {
        slug: "amazing-tailwindcss-grid-layouts",
        author: "Manu Arora",
        date: "29th October, 2024",
        title: "Amazing Tailwindcss Grid Layout Examples",
        description: "Grids are cool, but Tailwindcss grids are cooler...",
        image: "https://i.pinimg.com/564x/52/61/24/526124d9d8c8550e942c181eb10a1282.jpg",
      };
    </script>

    <div class="w-80 mx-auto flex justify-center items-center h-[40rem]">
      <FollowPointerCard title="Sikandar Bhide"> {/* Custom title for the pointer */}
        {/* Content that will have the follow pointer effect */}
        <div class="relative bg-white h-full rounded-2xl overflow-hidden ...">
          <div class="w-full aspect-w-16 aspect-h-10 ...">
            <img src={blogContent.image} alt="thumbnail" class="..."/>
          </div>
          <div class="px-4 pb-2">
            <h2 class="font-bold my-4 text-lg text-black">{blogContent.title}</h2>
            <h2 class="font-normal my-4 text-sm text-black">{blogContent.description}</h2>
            <div class="flex flex-row justify-between items-center mt-2">
              <span class="text-sm text-gray-500">{blogContent.date}</span>
              <button class="relative z-10 px-6 py-2 bg-black text-white ...">Read More</button>
            </div>
          </div>
        </div>
      </FollowPointerCard>
    </div>
    ```

## Manifest File (`acetFollowPointer.ts`)

-   Defines the component's metadata (ID: "follow-pointer", title, description, tags).
-   Specifies the preview component (`AcetFollowPointerExample`).
-   Provides installation instructions:
    *   Dependencies: `tailwind-merge`, `clsx` (for the `cn` utility, though not directly used in these two components, it's a common utility for the library). `svelte-motion` is used for the `spring` store.
    *   Utility function (`cn`) setup.
    *   Source code for `FollowPointer.svelte` and `FollowPointerCard.svelte`.

## Basic Usage

To use the Follow Pointer effect:

1.  **Install Dependencies**: Ensure `svelte-motion`, `clsx`, and `tailwind-merge` are installed if you plan to use the `cn` utility or other components from the library.
2.  **Copy Components**: Copy `FollowPointerCard.svelte` and `FollowPointer.svelte` into your project.
3.  **Wrap Content**: Wrap the content you want the effect on with the `FollowPointerCard` component. Optionally provide a `title` prop.

```svelte /dev/null/MyFollowPointerUsage.svelte
<script>
  import FollowPointerCard from '$lib/components/FollowPointerCard.svelte'; // Adjust path as needed
</script>

<div class="p-10 flex justify-center">
  <FollowPointerCard title="Interactive Element!">
    <div class="bg-blue-500 text-white p-8 rounded-lg shadow-xl w-96 h-64 flex items-center justify-center text-center">
      <h3 class="text-2xl font-bold">Hover over me!</h3>
      <p class="mt-2">A custom pointer will follow your mouse.</p>
    </div>
  </FollowPointerCard>
</div>
```

This setup will make the "Interactive Element!" pointer appear and follow the mouse when the blue `div` is hovered.
```