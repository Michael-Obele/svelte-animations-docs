# Folder: /lib/aceternity-ui/components/BentoGrid

This folder contains the Svelte implementation of the **Bento Grid** layout component, inspired by Aceternity UI. It allows for the creation of responsive, visually appealing grid layouts often used for showcasing features, portfolio items, or image galleries.

## Core Components

1.  **`BentoGrid.svelte`**:
    *   The main container component that establishes the grid structure.
    *   It uses Tailwind CSS utility classes to define the grid columns, gaps, and responsiveness (`grid`, `md:auto-rows-[18rem]`, `grid-cols-1`, `md:grid-cols-3`, `gap-4`).
    *   Accepts a `class` prop to allow further customization of the grid container.
    *   Provides a default `<slot>` for `BentoGridItem` components.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/BentoGrid/BentoGrid.svelte
    <script>
      import { cn } from "$lib/utils";
    
      /**
       * @component
       * BentoGrid is a layout component that arranges items in a responsive grid.
       * It's designed to showcase content in a visually appealing and organized manner,
       * typically used for feature displays, portfolios, or image galleries.
       *
       * @slot - Default slot for `BentoGridItem` components.
       * @prop class - Optional CSS class to apply to the grid container.
       */
    
      let _class = "";
      export { _class as class };
    </script>
    
    <div
      class={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        _class
      )}
    >
      <slot></slot>
    </div>
    ```

2.  **`BentoGridItem.svelte`**:
    *   Represents a single item within the `BentoGrid`.
    *   Provides styling for individual grid cells, including background, border, padding, and hover effects (`rounded-xl`, `group/bento`, `hover:shadow-xl`, `transition`, `dark:bg-black`, `bg-white`, etc.).
    *   Accepts props like `class`, `title`, and `description`.
    *   Offers named slots (`header`, `icon`, `title`, `description`) for flexible content placement. The `title` and `description` props can accept strings or Svelte components (rendered via slots if not strings).

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/BentoGrid/BentoGridItem.svelte
    <script lang="ts">
      import { cn } from "$lib/utils";
      import type { ComponentType } from "svelte";
    
      /**
       * @component
       * BentoGridItem represents a single item within a `BentoGrid`.
       * It provides slots for a header, icon, title, and description,
       * allowing for flexible content presentation.
       *
       * @prop class - Optional CSS class to apply to the item container.
       * @prop title - The title of the bento grid item. Can be a string or a Svelte component.
       * @prop description - A brief description for the item. If empty, the 'description' slot can be used.
       *
       * @slot header - Slot for the header content of the item.
       * @slot icon - Slot for an icon to be displayed within the item.
       * @slot title - Slot for custom title component, used if `title` prop is not a string.
       * @slot description - Slot for custom description component, used if `description` prop is empty.
       */
    
      let _class = "";
      export { _class as class };
      export let title: string | ComponentType;
      export let description: string  = "";
    </script>
    
    <div
      class={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        _class
      )}
    >
      <slot name="header"></slot>
      <div class="group-hover/bento:translate-x-2 transition duration-200">
        <slot name="icon"></slot>
        <div
          class="font-sans font-bold text-neutral-600 dark:text-neutral-200 my-2"
        >
          {#if typeof title === "string"}
            {title}
          {:else}
            <slot name="title"></slot>
          {/if}
        </div>
        <div
          class="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300"
        >
          {#if description.length > 0}
            {description}
          {:else}
            <slot name="description"></slot>
          {/if}
        </div>
      </div>
    </div>
    ```

## Examples Subdirectory (`examples/`)

This subdirectory contains various usage examples of the `BentoGrid` component.

-   **`BasicBento.svelte`**: Demonstrates a standard implementation with multiple items, including spanning items across columns (`md:col-span-2`). Uses `BentoSkeleton.svelte` as a header placeholder.
-   **`BentoSkeleton.svelte`**: A simple placeholder component often used within the `header` slot of `BentoGridItem` in examples.
-   **`TwoColumn/`**: Contains an example (`BentoTwoColumn.svelte`) demonstrating a two-column variation of the grid, using a specific skeleton (`TwoColumnSkeleton.svelte`).
-   **`premium/`**: Showcases more complex and visually rich `BentoGridItem` implementations (`BentoPremium.svelte`) using various animated skeleton components (`SkeletonOne.svelte` to `SkeletonFive.svelte`) in the `header` slot. These skeletons often use `svelte/motion` for interactive effects.

## Basic Usage

```svelte /dev/null/BasicBentoUsage.svelte
<script>
  import BentoGrid from "./BentoGrid.svelte";
  import BentoGridItem from "./BentoGridItem.svelte";
  import SomeIcon from "$lib/svg/tabler/some-icon.svg"; // Replace with your actual icon path

  // Example items data
  const myItems = [
    { id: 1, title: "Feature One", description: "Description for feature one.", icon: SomeIcon },
    { id: 2, title: "Feature Two", description: "Description for feature two.", icon: SomeIcon, class: "md:col-span-2" }, // Span 2 columns on medium screens+
    { id: 3, title: "Feature Three", description: "Description for feature three.", icon: SomeIcon },
    // ... more items
  ];
</script>

<BentoGrid class="max-w-5xl mx-auto">
  {#each myItems as item (item.id)}
    <BentoGridItem
      title={item.title}
      description={item.description}
      class={item.class || ""}
    >
      <!-- Optional: Use the header slot for images or complex visuals -->
      <!-- <div slot="header"> <img src="..." alt="..."> </div> -->

      <!-- Use the icon slot -->
      <div slot="icon">
        <img src={item.icon} alt="{item.title} icon" class="h-4 w-4 text-neutral-500" />
      </div>
    </BentoGridItem>
  {/each}
</BentoGrid>
```

Refer to the files within the `examples/` directory for more advanced usage patterns and integration with different header/skeleton components.