```markdown
# Folder: /lib/aceternity-ui/components/cards

This folder serves as a collection point for various card-style components and examples within the Aceternity UI Svelte library. Currently, its primary content revolves around the **Feature Block Animated Card** example.

## Feature Block Animated Card

This specific card example demonstrates a visually engaging card with an animated "feature skeleton" area, often used to showcase a set of tools, technologies, or features.

### Core Sub-Components (`feature-block-animated/`)

1.  **`Card.svelte`**:
    *   The main wrapper for the card content.
    *   Provides basic styling like rounded corners, borders, background, and shadows.
    *   Uses `cn` utility for class merging.
    *   Accepts a `class` prop for additional styling.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/cards/feature-block-animated/Card.svelte
    <script>
      import { cn } from "$lib/utils";
      let className = "";
      export { className as class };
    </script>

    <div
      class={cn(
        "max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      <slot></slot>
    </div>
    ```

2.  **`CardTitle.svelte`**:
    *   A simple component for rendering the card's title with predefined styling.
    *   Accepts a `class` prop.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/cards/feature-block-animated/CardTitle.svelte
    <script>
      import { cn } from "$lib/utils";
      let className = "";
      export { className as class };
    </script>

    <h3
      class={cn(
        "text-lg font-semibold text-gray-800 dark:text-white py-2",
        className
      )}
    >
      <slot></slot>
    </h3>
    ```

3.  **`CardDesc.svelte`**:
    *   A component for rendering the card's description with predefined styling.
    *   Accepts a `class` prop.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/cards/feature-block-animated/CardDesc.svelte
    <script>
      import { cn } from "$lib/utils";
      let className = "";
      export { className as class };
    </script>

    <p
      class={cn(
        "text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm",
        className
      )}
    >
      <slot></slot>
    </p>
    ```

4.  **`CardSkeletonContainer.svelte`**:
    *   A container specifically for the skeleton/animated part of the card.
    *   Has a fixed height and can show a radial gradient mask.
    *   Accepts `showGradient` and `className` props.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/cards/feature-block-animated/CardSkeletonContainer.svelte
    <script>
      import { cn } from "$lib/utils";
      export let showGradient = false;
      export let className = "";
    </script>

    <div
      class={cn(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className,
        showGradient &&
          "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      <slot></slot>
    </div>
    ```

5.  **`FeatureSkeleton.svelte`**:
    *   This component creates the animated visual within the `CardSkeletonContainer`.
    *   It features a row of icons (e.g., `GeminiLogo`, `MetaIconOutline`, `OpenAiLogo`) that animate (translate Y) into view periodically.
    *   Includes a moving beam (`animate-move`) and a `SparkleCard` effect for added visual flair.
    *   Uses `onMount` to set up an interval for re-triggering the icon animation.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/cards/feature-block-animated/FeatureSkeleton.svelte
    <script>
      import SparkleCard from "./SparkleCard.svelte";
      import Container from "./Container.svelte";
      import GeminiLogo from "./GeminiLogo.svelte";
      import MetaIconOutline from "./MetaIconOutline.svelte";
      import OpenAiLogo from "./OpenAILogo.svelte";
      import { onMount } from "svelte";
      let key = false; // Used to re-trigger animations
      onMount(() => {
        let intervalId = setInterval(() => {
          key = !key;
        }, 5000);
        return () => {
          clearInterval(intervalId);
        };
      });
    </script>

    <div class="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div class="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        {#key key}
          <!-- Animated icons in Containers -->
          <div class="animate-ty" style="--animation-delay:0.5s">
            <Container class="h-8 w-8 circle-1 "><GeminiLogo class="h-4 w-4 " /></Container>
          </div>
          <!-- ... more icons ... -->
        {/key}
      </div>
      <!-- Moving beam and sparkles -->
      <div class="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div class="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <SparkleCard />
        </div>
      </div>
    </div>
    ```

6.  **`Container.svelte`**:
    *   A simple wrapper component used in `FeatureSkeleton.svelte` to style the icon containers (circular, shadow, background).

7.  **`SparkleCard.svelte`**:
    *   Generates a sparkling particle effect using `svelte-motion`. Used within `FeatureSkeleton.svelte`.
    *   Randomly animates the position, opacity, and scale of multiple small `<span>` elements.

### Example Usage (`FeatureDemoCard.svelte`)

This file demonstrates how to assemble the above sub-components to create the complete "Feature Block Animated Card".

```svelte svelte-animations-docs/src/lib/aceternity-ui/components/cards/feature-block-animated/FeatureDemoCard.svelte
<script>
  import Card from "./Card.svelte";
  import CardDesc from "./CardDesc.svelte";
  import CardSkeletonContainer from "./CardSkeletonContainer.svelte";
  import CardTitle from "./CardTitle.svelte";
  import FeatureSkeleton from "./FeatureSkeleton.svelte";
</script>

<Card>
  <CardSkeletonContainer>
    <FeatureSkeleton />
  </CardSkeletonContainer>
  <CardTitle>Damn good card</CardTitle>
  <CardDesc>
    A card that showcases a set of tools that you use to create your product.
  </CardDesc>
</Card>
```

## Manifest File (`acetCards.ts`)

*   **`acetCards.ts`**: This is the manifest file for the "Cards" category.
    *   It defines the `AceternityUI` object with metadata (id: "cards", title: "Cards", description, tags).
    *   Crucially, it lists examples like "Feature Block Animated Card", providing the `FeatureDemoCard.svelte` component for preview and linking all its constituent source code files (`Card.svelte`, `CardTitle.svelte`, etc.) for the documentation site.
    *   It also specifies installation dependencies (`tailwind-merge`, `clsx`) and Tailwind CSS configuration for animations (`animate-move`).

## Basic Usage (Conceptual for Feature Block Animated Card)

To use the "Feature Block Animated Card" as shown in the demo:

1.  **Ensure Dependencies and Tailwind Config**: Follow installation steps in `acetCards.ts` (install `tailwind-merge`, `clsx`, and add the `move` animation to `tailwind.config.ts`).
2.  **Copy Components**: Copy all Svelte files from the `feature-block-animated` subdirectory into your project (e.g., into a `components/FeatureCard` directory). Update import paths if necessary.
3.  **Use in your page**:

    ```svelte /dev/null/MyPageWithFeatureCard.svelte
    <script>
      // Assuming you've placed the components in $lib/components/FeatureCard/
      import Card from '$lib/components/FeatureCard/Card.svelte';
      import CardDesc from '$lib/components/FeatureCard/CardDesc.svelte';
      import CardSkeletonContainer from '$lib/components/FeatureCard/CardSkeletonContainer.svelte';
      import CardTitle from '$lib/components/FeatureCard/CardTitle.svelte';
      import FeatureSkeleton from '$lib/components/FeatureCard/FeatureSkeleton.svelte';
      // Ensure $lib/utils.ts with cn function exists
    </script>

    <div class="p-10 bg-neutral-900 flex justify-center">
      <Card>
        <CardSkeletonContainer>
          <FeatureSkeleton />
        </CardSkeletonContainer>
        <CardTitle>My Awesome Feature</CardTitle>
        <CardDesc>
          This card highlights the key technologies and tools we use.
        </CardDesc>
      </Card>
    </div>
    ```

Refer to `acetCards.ts` for detailed installation instructions and the full list of files required for each specific card example provided by the library.
```