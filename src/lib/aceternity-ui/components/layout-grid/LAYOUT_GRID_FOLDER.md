```markdown
# Folder: /lib/aceternity-ui/components/layout-grid

This folder contains the Svelte implementation of the **Layout Grid** component. This component creates an interactive grid where clicking on a card expands it to a larger view, often a modal-like overlay, while smoothly animating the transition using shared layout animations.

## Core Components

1.  **`LayoutGrid.svelte`**:
    *   The main component that manages the grid of cards and the selection/expansion animation.
    *   It takes an array of `cards` as a prop. Each card object should have `id`, `content` (can be a Svelte component or string for the expanded view), `class` (for grid column spanning, e.g., "md:col-span-2"), and `thumbnail` (URL for the card's image).
    *   Uses `svelte-motion`'s `AnimateSharedLayout` and `Motion` components to achieve the shared layout animation. When a card is clicked (`handleClick`):
        *   The `selected` store is updated with the clicked card.
        *   The clicked card animates to a centered, larger view using its `layoutId={`card-${card.id}`}`.
        *   The thumbnail image also animates using `layoutId={`image-${card.id}-image`}`.
        *   Content for the expanded view (`selected.content`) is displayed.
    *   An overlay is shown when a card is selected, and clicking it (`handleOutsideClick`) deselects the card, animating it back to its grid position.
    *   Props:
        *   `cards`: (Card[]) Array of card objects: `{ id: number; content: string | ComponentType; class: string; thumbnail: string; }`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/layout-grid/LayoutGrid.svelte
    <script lang="ts">
      import { cn } from "$lib/utils";
      import type { ComponentType } from "svelte";
      import { Motion, AnimatePresence, AnimateSharedLayout } from "svelte-motion";

      type Card = {
        id: number;
        content: string | ComponentType;
        class: string; // For column spanning, e.g., "md:col-span-2"
        thumbnail: string;
      };
      export let cards: Card[] = [];

      let selected: Card | null = null;
      let lastSelected: Card | null = null; // To handle animations correctly

      let handleClick = (card: Card) => {
        lastSelected = selected;
        selected = card;
      };

      let handleOutsideClick = () => {
        lastSelected = selected;
        selected = null;
      };
    </script>

    <div
      class="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative"
    >
      <AnimateSharedLayout type='crossfade'>
        {#each cards as card, i (card.id)} {/* Keyed each loop */}
          <div class={cn(card.class, "cursor-pointer")}> {/* Added cursor-pointer to outer div */}
            <Motion layoutId={`card-${card.id}`} let:motion>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div
                on:click={() => { handleClick(card); }}
                class={cn(
                  "relative overflow-hidden rounded-xl h-full w-full", // Base styling for all cards
                  selected?.id === card.id
                    ? "absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col" // Selected card style
                    : "bg-white" // Default card style
                )}
                use:motion
              >
                <!-- Expanded Content (only for selected card) -->
                {#if selected?.id === card.id}
                  <div
                    class="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]"
                  >
                    <Motion
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      let:motion
                    >
                      <div use:motion class="absolute inset-0 h-full w-full bg-black opacity-100 z-10">
                        <Motion
                          layoutId={`content-${selected?.id}`}
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 100 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          let:motion
                        >
                          <div use:motion class="relative px-8 pb-4 z-[70] top-8 md:top-36">
                            {#if typeof selected?.content === "string"}
                              <p class="text-white text-2xl mt-3 font-bold ">{selected?.content}</p>
                            {:else}
                              <svelte:component this={selected?.content} />
                            {/if}
                          </div>
                        </Motion>
                      </div>
                    </Motion>
                  </div>
                {/if}

                <!-- Thumbnail Image -->
                <Motion layoutId={`image-${card.id}-image`} let:motion>
                  <img
                    use:motion
                    src={card.thumbnail}
                    alt="thumbnail"
                    height="500"
                    width="500"
                    class={cn(
                      "object-cover object-top absolute inset-0 h-full w-full transition duration-200",
                      selected?.id === card.id ? "" : "rounded-xl" // Keep rounded corners for non-selected
                    )}
                  />
                </Motion>
              </div>
            </Motion>
          </div>
        {/each}
      </AnimateSharedLayout>

      <!-- Overlay for deselection -->
      <Motion animate={{ opacity: selected?.id ? 0.3 : 0 }} let:motion>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          use:motion
          on:click={handleOutsideClick}
          class={cn(
            "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10", // z-10 so it's below selected card (z-50)
            selected?.id ? "pointer-events-auto" : "pointer-events-none"
          )}
        ></div>
      </Motion>
    </div>
    ```

## Examples Subdirectory (`examples/`)

This subdirectory contains:

-   **`LayoutGridExample.svelte`**:
    *   Demonstrates how to use the `LayoutGrid` component.
    *   Defines an array of `cards` with sample data, including thumbnails and content components (`SkeletonOne` to `SkeletonFour`).
    *   The `content` for each card is a Svelte component designed to be shown in the expanded view.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/layout-grid/examples/LayoutGridExample.svelte
    <script>
      import LayoutGrid from "../LayoutGrid.svelte";
      // Import skeleton components for expanded view content
      import SkeletonFour from "./SkeletonFour.svelte";
      import SkeletonOne from "./SkeletonOne.svelte";
      import SkeletonThree from "./SkeletonThree.svelte";
      import SkeletonTwo from "./SkeletonTwo.svelte";

      let cards = [
        {
          id: 1,
          content: SkeletonOne, // Svelte component for expanded content
          class: "md:col-span-2", // Spans 2 columns on medium screens
          thumbnail: "https://i.pinimg.com/736x/fe/48/a1/fe48a154f8578c2fd8ba0226bbb9a272.jpg",
        },
        {
          id: 2,
          content: SkeletonTwo,
          class: "col-span-1",
          thumbnail: "https://i.pinimg.com/564x/a8/86/86/a88686f3c6a17621f65561d2a94d6768.jpg",
        },
        // ... more cards
      ];
    </script>

    <div class='flex justify-center items-center h-[550px] w-64 md:h-[40rem] md:w-[60rem]'>
      <LayoutGrid {cards} />
    </div>
    ```

-   **`SkeletonOne.svelte` to `SkeletonFour.svelte`**:
    *   These are simple Svelte components used as placeholder content for the expanded view of the cards in the example. They typically contain some text.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/layout-grid/examples/SkeletonOne.svelte
    <div>
      <p class="font-bold md:text-4xl text-xl text-white">Sky is Beautiful</p>
      <p class="font-normal text-base text-white"></p>
      <p class="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
    ```

## Manifest File (`acetLayoutGrid.ts`)

-   Defines the component's metadata (ID, title, description, tags).
-   Specifies the preview component (`LayoutGridExample`).
-   Provides installation instructions, including dependencies (`clsx`, `tailwind-merge`, `svelte-motion`), utility function setup, and the source code for `LayoutGrid.svelte`.

## Basic Usage

```svelte /dev/null/MyLayoutGridPage.svelte
<script lang="ts">
  import LayoutGrid from '$lib/aceternity-ui/components/layout-grid/LayoutGrid.svelte';
  import MyExpandedContent1 from '$lib/components/MyExpandedContent1.svelte'; // Custom component for expanded view
  import MyExpandedContent2 from '$lib/components/MyExpandedContent2.svelte';

  // Define your cards data
  const myCards = [
    {
      id: 1,
      content: MyExpandedContent1, // Pass your Svelte component here
      class: "md:col-span-1",
      thumbnail: "/images/thumb1.jpg", // Replace with actual thumbnail path
    },
    {
      id: 2,
      content: MyExpandedContent2,
      class: "md:col-span-2", // This card will span 2 columns on medium screens
      thumbnail: "/images/thumb2.jpg",
    },
    {
      id: 3,
      content: "Simple Text Content for Card 3", // Can also be a string
      class: "md:col-span-1",
      thumbnail: "/images/thumb3.jpg",
    }
  ];
</script>

<div class="container mx-auto py-12">
  <h1 class="text-3xl font-bold text-center mb-8 dark:text-white">Interactive Layout Grid</h1>
  <div class="h-[600px] md:h-[700px] w-full"> {/* Ensure container has dimensions */}
    <LayoutGrid cards={myCards} />
  </div>
</div>

<!-- Example MyExpandedContent1.svelte -->
<!--
<div class="p-4">
  <h2 class="text-2xl font-bold text-white mb-2">Expanded View Title 1</h2>
  <p class="text-neutral-300">Detailed information for the first item...</p>
  <img src="/images/detail1.jpg" alt="Detail 1" class="mt-4 rounded-lg w-full object-cover h-48" />
</div>
-->
```

Refer to `acetLayoutGrid.ts` for detailed installation steps and dependencies. Ensure `svelte-motion` is correctly set up in your project.
```