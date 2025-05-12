```markdown
# Folder: /lib/aceternity-ui/components/animated-tooltip

This folder contains the Svelte implementation of the **Animated Tooltip** component. It displays a row of items (typically user avatars) and shows an animated tooltip with details when an item is hovered.

## Core Components

1.  **`AnimatedTooltip.svelte`**:
    *   The main component that renders the row of items and handles the tooltip animation.
    *   Iterates through an array of `items` passed as a prop. Each item should have `id`, `name`, `designation`, and `image`.
    *   Uses `svelte-motion` (`Motion`, `AnimatePresence`, `useMotionValue`, `useTransform`, `useSpring`) to:
        *   Animate the tooltip's appearance/disappearance (`opacity`, `y`, `scale`).
        *   Apply a subtle rotation and horizontal translation to the tooltip based on the mouse position within the hovered item, creating a dynamic feel.
    *   Tracks the currently hovered item's index (`hoveredIndex`).
    *   Accepts props:
        *   `items`: (TooltipItem[]) Array of objects representing the items to display. The structure is `{ id: number; name: string; designation: string; image: string; }`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/animated-tooltip/AnimatedTooltip.svelte
    <script lang="ts">
      import {
        Motion,
        useTransform,
        AnimatePresence,
        useMotionValue,
        useSpring,
      } from "svelte-motion";

      /**
       * @typedef {object} TooltipItem ... (rest of type definition)
       */

      /**
       * @component AnimatedTooltip ... (rest of component docs)
       * @prop items - An array of `TooltipItem` objects to display.
       */
      export let items: TooltipItem[];

      let hoveredIndex: number | null = null;
      const springConfig = { stiffness: 100, damping: 5 };
      let x = useMotionValue(0);

      // Transforms for rotation and translation based on mouse X position
      let rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
      let translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

      const handleMouseMove = (event: MouseEvent & { currentTarget: EventTarget & HTMLImageElement }) => {
        // ... logic to update motion value x ...
      };
    </script>

    <div class="group flex flex-row -mr-4">
      {#each items as item (item.id)}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="relative -mr-4"
          on:mouseenter={() => (hoveredIndex = item.id)}
          on:mouseleave={() => (hoveredIndex = null)}
        >
          <AnimatePresence>
            {#if hoveredIndex === item.id}
              <Motion
                let:motion
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ /* ... animation properties ... */ }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                key={`tooltip-${item.id}`}
              >
                <!-- Tooltip structure -->
                <div
                  use:motion
                  class="absolute -left-1/2 -top-16 z-50 flex translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
                >
                  <!-- ... tooltip content (name, designation, decorative elements) ... -->
                  <div class="relative z-30 whitespace-nowrap text-base font-bold text-white">{item.name}</div>
                  <div class="whitespace-nowrap text-xs text-white">{item.designation}</div>
                </div>
              </Motion>
            {/if}
          </AnimatePresence>
          <!-- Item Image -->
          <img
            on:mousemove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            class="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </div>
      {/each}
    </div>
    ```

2.  **`ATExample.svelte`**:
    *   An example component demonstrating the usage of `AnimatedTooltip.svelte`.
    *   Defines a sample array (`people`) conforming to the `TooltipItem` structure and passes it to the `AnimatedTooltip` component.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/animated-tooltip/ATExample.svelte
    <script lang="ts">
      /**
       * @component
       * ATExample demonstrates the usage of the `AnimatedTooltip` component.
       * It defines an array of sample "people" data and passes it to the component
       * to display a row of avatars with animated tooltips on hover.
       */
      import AnimatedTooltip from "./AnimatedTooltip.svelte";

      const people = [
        {
          id: 1,
          name: "John Doe",
          designation: "Software Engineer",
          image: "...", // Image URL
        },
        // ... more people
      ];
    </script>

    <AnimatedTooltip items={people} />
    ```

3.  **`acetAnimatedTooltip.ts`**:
    *   The manifest file for the AnimatedTooltip component.
    *   Defines the `AceternityUI` object containing metadata (id, title, description, tags), preview component (`ATExample`), and installation instructions (dependencies like `svelte-motion`, `clsx`, `tailwind-merge`, utility function, source code). **Note:** The installation instructions mention it works only in Svelte 4, likely due to `svelte-motion` compatibility at the time.

## Basic Usage

```svelte /dev/null/MyTooltipUsage.svelte
<script lang="ts">
  import AnimatedTooltip from '$lib/aceternity-ui/components/animated-tooltip/AnimatedTooltip.svelte';

  // Define your items
  const teamMembers = [
    {
      id: 101,
      name: "Alice Smith",
      designation: "Lead Designer",
      image: "/path/to/alice.jpg", // Replace with actual image paths
    },
    {
      id: 102,
      name: "Bob Johnson",
      designation: "Frontend Developer",
      image: "/path/to/bob.jpg",
    },
    {
      id: 103,
      name: "Charlie Brown",
      designation: "Backend Developer",
      image: "/path/to/charlie.jpg",
    },
  ];
</script>

<div class="flex items-center justify-center p-10 bg-neutral-100 dark:bg-neutral-900">
  <h2 class="text-lg font-semibold mr-6 dark:text-white">Our Team:</h2>
  <AnimatedTooltip items={teamMembers} />
</div>
```

Refer to `acetAnimatedTooltip.ts` for detailed installation steps and dependencies (`svelte-motion`, `clsx`, `tailwind-merge`). Be mindful of the Svelte version compatibility mentioned.
```