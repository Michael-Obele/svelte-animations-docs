```markdown
# Folder: /lib/aceternity-ui/components/feature-sections

This directory provides a collection of pre-designed Svelte components that act as "Feature Sections". These are typically larger, composed UI blocks suitable for showcasing product features, services, or key information on a webpage. Unlike granular UI components (like a button or a card), these are more like ready-to-use section templates.

## Structure and Purpose

The primary organizing file for these feature sections is **`feature-sections.ts`**. This manifest file defines an `AceternityUI` object with the `id: "feature-sections"`. This object groups various example feature sections, making them discoverable and integrated into the documentation site.

-   **`feature-sections.ts`**:
    *   Collects different feature section examples.
    *   Specifies common installation dependencies (e.g., `clsx`, `tailwind-merge`, `@tabler/icons-svelte` if used in examples).
    *   Links to the Svelte components that form each example section.

    ```typescript svelte-animations-docs/src/lib/aceternity-ui/components/feature-sections/feature-sections.ts
    import type { AceternityUI } from "../alltypes";

    // Simple Card Example
    import FeatureSelectionDemo from "./simple-card/FeatureSelectionDemo.svelte";
    import FeatureSelectionDemoCode from "./simple-card/FeatureSelectionDemo.svelte?raw";
    import SimpleGridCode from "./simple-card/SimpleGrid.svelte?raw";
    import SimpleGridPatternCode from "./simple-card/SimpleGridPattern.svelte?raw";

    // Hover Feature Card Example
    import HoverFeatureCard from "./simple-hover-card/HoverFeatureCard.svelte";
    import HoverFeatureCardCode from "./simple-hover-card/HoverFeatureCard.svelte?raw";
    import SimpleFeatureCode from "./simple-hover-card/SimpleFeature.svelte?raw";

    export let featuresSections: AceternityUI = {
      id: "feature-sections",
      desc: "A set of feature sections ranging from bento grids to simple layouts",
      title: "Feature Sections",
      tags: ["Sections", "Special", "Tailwind CSS"],
      installations: [
        {
          desc: "Install the package",
          allcode: [
            {
              title: "Install dependencies",
              code: "npm i clsx tailwind-merge @tabler/icons-svelte", // Icons if used by examples
              language: "shellscript",
              filename: "Terminal",
            },
            {
              title: "Add Util File",
              code: `import { ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n \nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`,
              language: "typescript",
              filename: "$lib/utils.ts",
            },
          ],
        },
      ],
      examples: [
        {
          title: "Simple with Card Gradient",
          desc: "Simple Feature Section with Card Gradient",
          preview: {
            comp: FeatureSelectionDemo,
            allcode: [
              { code: FeatureSelectionDemoCode, /* ... */ },
              { code: SimpleGridCode, /* ... */ },
              { code: SimpleGridPatternCode, /* ... */ }
            ],
          },
        },
        {
          title: "Simple with Hover Effect",
          preview: {
            comp: HoverFeatureCard,
            allcode: [
              { code: HoverFeatureCardCode, /* ... */ },
              { code: SimpleFeatureCode, /* ... */ },
            ],
          },
        },
      ],
    };
    ```

The `feature-sections` directory contains subdirectories for each type of example section:

-   **`simple-card/`**: Contains components for a feature section using cards with gradient backgrounds and a subtle grid pattern.
-   **`simple-hover-card/`**: Contains components for a feature section with cards that have hover effects.

## Example Sections

### 1. Simple with Card Gradient

This feature section displays items in a responsive grid. Each item is a card with a title, description, a gradient background, and a decorative grid pattern.

**Key Files:**

-   **`simple-card/FeatureSelectionDemo.svelte`**:
    *   The main component for this example section.
    *   Arranges cards in a responsive grid (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
    *   Each card has a `bg-gradient-to-b` and uses the `SimpleGrid.svelte` component for a background pattern.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/feature-sections/simple-card/FeatureSelectionDemo.svelte
    <script>
      import SimpleGrid from "./SimpleGrid.svelte"; // Grid pattern component

      const grid = [
        { title: "HIPAA Compliant", description: "Data is safe with us." },
        // ... more features
      ];
    </script>

    <div class="py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {#each grid as feature}
          <div class="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden">
            <SimpleGrid size={20} /> {/* Background pattern */}
            <p class="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p class="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
    ```

-   **`simple-card/SimpleGrid.svelte`**:
    *   Responsible for rendering the subtle grid pattern in the background of each card.
    *   It uses `SimpleGridPattern.svelte` internally.
    *   Props: `pattern` (for custom square placement), `size` (for grid cell size).

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/feature-sections/simple-card/SimpleGrid.svelte
    <script lang="ts">
      import SimpleGridPattern from "./SimpleGridPattern.svelte";

      export let pattern: number[][] = [ /* default pattern */ ];
      export let size: number;
    </script>

    <div class="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div class="absolute inset-0 bg-gradient-to-r ...">
        <SimpleGridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={pattern}
          class="absolute inset-0 h-full w-full mix-blend-overlay ..."
        />
      </div>
    </div>
    ```

-   **`simple-card/SimpleGridPattern.svelte`**:
    *   The SVG component that generates the actual grid pattern using SVG `<pattern>` and `<rect>` elements.

### 2. Simple with Hover Effect

This feature section displays items in a grid where each item has an icon, title, and description, with interactive hover effects.

**Key Files:**

-   **`simple-hover-card/HoverFeatureCard.svelte`**:
    *   The main component for this example section.
    *   Arranges `SimpleFeature` components in a responsive grid.
    *   Passes feature data (title, description, icon) to each `SimpleFeature`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/feature-sections/simple-hover-card/HoverFeatureCard.svelte
    <script>
      import IconTerminal2 from "$lib/svg/tabler/terminal.svg"; // Example icon
      import SimpleFeature from "./SimpleFeature.svelte";

      const features = [
        { title: "Built for developers", description: "...", icon: IconTerminal2 },
        // ... more features
      ];
    </script>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {#each features as feature, index}
        <SimpleFeature {...feature} {index} />
      {/each}
    </div>
    ```

-   **`simple-hover-card/SimpleFeature.svelte`**:
    *   Represents an individual feature item with hover effects.
    *   Displays an icon, title, and description.
    *   On hover (`group-hover/feature`):
        *   A background gradient overlay appears.
        *   A small vertical bar on the left animates (changes height/color).
        *   The title text slightly translates.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/feature-sections/simple-hover-card/SimpleFeature.svelte
    <script lang="ts">
      import { cn } from "$lib/utils";

      export let title: string;
      export let description: string;
      export let icon: any; // SVG component or path
      export let index: number; // Used for border styling
    </script>

    <div
      class={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {#if index < 4} {/* Top row hover effect */}
        <div class="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"/>
      {/if}
      {#if index >= 4} {/* Bottom row hover effect */}
        <div class="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"/>
      {/if}
      <div class="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        <img src={icon} alt="svg_logo"/>
      </div>
      <div class="text-lg font-bold mb-2 relative z-10 px-10">
        <div class="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"/>
        <span class="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p class="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
    ```

## How to Use

These feature sections are designed to be integrated into your Svelte/SvelteKit application by:

1.  **Copying the Code**: Identify the feature section example you want to use from the documentation or the `feature-sections.ts` file. Copy the relevant Svelte component files (e.g., `FeatureSelectionDemo.svelte` and its dependencies like `SimpleGrid.svelte`) into your project, typically within your `$lib/components` or a similar directory.
2.  **Adapt Data**: Modify the data arrays (e.g., `grid` in `FeatureSelectionDemo.svelte` or `features` in `HoverFeatureCard.svelte`) to match your content.
3.  **Customize Styles**: Adjust Tailwind CSS classes within the copied components to match your desired appearance.
4.  **Import and Use**: Import the main component of the copied section (e.g., `FeatureSelectionDemo.svelte`) into your Svelte pages or layouts and use it like any other Svelte component.

```svelte /dev/null/MyPage.svelte
<script>
  // Assuming you copied FeatureSelectionDemo and its related files
  // into $lib/my-feature-sections/simple-card/
  import MyFeatureSection from '$lib/my-feature-sections/simple-card/FeatureSelectionDemo.svelte';
</script>

<div>
  <MyFeatureSection />
</div>
```

Ensure that the necessary dependencies listed in `feature-sections.ts` (like `clsx`, `tailwind-merge`, and potentially icon libraries) are installed in your project.
```