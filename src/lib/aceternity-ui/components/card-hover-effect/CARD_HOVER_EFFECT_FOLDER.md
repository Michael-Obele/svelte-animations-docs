```markdown
# Folder: /lib/aceternity-ui/components/card-hover-effect

This folder contains the Svelte components for creating a **Card Hover Effect**. This effect typically involves a grid of cards where, upon hovering over a specific card, a background element animates smoothly to highlight that card.

## Core Components

1.  **`CardHoverEffect.svelte`**:
    *   The main component that orchestrates the hover effect across a list of items.
    *   It takes an array of `items`, where each item usually has `title`, `desc` (description), and `link`.
    *   Renders a grid of these items using `<a>` tags, making each card a link.
    *   Uses `svelte-motion`'s `AnimateSharedLayout` and `Motion` components to achieve the smooth background animation. When an item is hovered (`hoveredIndex`), a `Motion` div with `layoutId="hoverBackground"` animates to the position and size of the hovered card.
    *   Each item is wrapped in a `Card` component.
    *   Accepts props:
        *   `items`: (Item[]) An array of objects, each with `title`, `desc`, and `link`.
        *   `class`: (string, optional) CSS classes for the main grid container.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/card-hover-effect/CardHoverEffect.svelte
    <script lang="ts">
      import { cn } from "$lib/utils";
      import { Motion, AnimateSharedLayout, AnimatePresence } from "svelte-motion";
      import Card from "./Card.svelte";
      import CardTitle from "./CardTitle.svelte";
      import CardDesc from "./CardDesc.svelte";

      // Type for items prop
      type Item = {
        title: string;
        desc: string;
        link: string;
      };
      export let items: Item[] = [];
      let _class = "";
      export { _class as class };

      let hoveredIndex: number | null = null;
    </script>

    <div
      class={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10", _class)}
    >
      <AnimateSharedLayout>
        {#each items as item, idx (item.title)} {/* Keyed for better rendering */}
          <a
            class="relative group block p-2 h-full w-full"
            on:mouseenter={() => (hoveredIndex = idx)}
            href={item.link}
            target="_blank" rel="noopener noreferrer" /* Good practice for external links */
          >
            {#if hoveredIndex === idx}
              <Motion
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
                let:motion
              >
                <span
                  use:motion
                  class="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                >
                </span>
              </Motion>
            {/if}
            <Card>
              <CardTitle>{item.title}</CardTitle>
              <CardDesc>{item.desc}</CardDesc>
            </Card>
          </a>
        {/each}
      </AnimateSharedLayout>
    </div>
    ```

2.  **`Card.svelte`**:
    *   A presentational component for the individual card structure.
    *   Provides default styling (padding, background, border, shadow on hover).
    *   Contains a slot for `CardTitle` and `CardDesc`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/card-hover-effect/Card.svelte
    <script>
      import { cn } from "$lib/utils";

      let _class = "";
      export { _class as class };
    </script>

    <div
      class={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        _class
      )}
    >
      <div class="relative z-50">
        <div class="p-4">
          <slot></slot>
        </div>
      </div>
    </div>
    ```

3.  **`CardTitle.svelte`**:
    *   A simple component to style the title text within a `Card`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/card-hover-effect/CardTitle.svelte
    <script>
      import { cn } from "$lib/utils";

      let _class = "";
      export { _class as class };
    </script>

    <h4 class={cn("text-zinc-100 font-bold tracking-wide mt-4", _class)}>
      <slot></slot>
    </h4>
    ```

4.  **`CardDesc.svelte`**:
    *   A simple component to style the description text within a `Card`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/card-hover-effect/CardDesc.svelte
    <script>
      import { cn } from "$lib/utils";

      let _class = "";
      export { _class as class };
    </script>

    <p
      class={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", _class)}
    >
      <slot></slot>
    </p>
    ```

## Examples

-   **`CardHoverExample.svelte`**: Demonstrates the usage of `CardHoverEffect` by providing a sample `projects` array.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/card-hover-effect/CardHoverExample.svelte
    <script>
      import CardHoverEffect from "./CardHoverEffect.svelte";
      export const projects = [
        {
          title: "Stripe",
          desc: "A technology company that builds economic infrastructure for the internet.",
          link: "https://stripe.com",
        },
        // ... more project items
        {
          title: "Microsoft",
          desc: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
          link: "https://microsoft.com",
        },
      ];
    </script>

    <div class="max-w-5xl mx-auto px-8"> {/* Example wrapper */}
      <CardHoverEffect items={projects} />
    </div>
    ```

## Manifest File (`acetCardHoverEffect.ts`)

-   Defines the component's metadata (ID, title, description, tags).
-   Specifies the preview component (`CardHoverExample`).
-   Provides installation instructions, including dependencies (`clsx`, `tailwind-merge`, `svelte-motion`), utility function setup, and source code for all four components (`CardHoverEffect.svelte`, `Card.svelte`, `CardTitle.svelte`, `CardDesc.svelte`).

## Basic Usage

```svelte /dev/null/MyCardHoverUsage.svelte
<script lang="ts">
  import CardHoverEffect from '$lib/aceternity-ui/components/card-hover-effect/CardHoverEffect.svelte';

  const myItems = [
    {
      title: "SvelteKit",
      desc: "The fastest way to build Svelte apps.",
      link: "https://kit.svelte.dev",
    },
    {
      title: "Tailwind CSS",
      desc: "A utility-first CSS framework for rapid UI development.",
      link: "https://tailwindcss.com",
    },
    {
      title: "Svelte Motion",
      desc: "An animation library for Svelte, inspired by Framer Motion.",
      link: "https://sveltemotion.com",
    },
  ];
</script>

<div class="container mx-auto py-10">
  <h2 class="text-2xl font-bold text-center mb-8 dark:text-white">Explore Technologies</h2>
  <CardHoverEffect items={myItems} class="lg:grid-cols-3 md:grid-cols-2 grid-cols-1" />
</div>
```

Refer to `acetCardHoverEffect.ts` for detailed installation steps and dependencies.
```