```markdown
# Folder: /lib/aceternity-ui/components/colorful-text

This folder contains the Svelte **ColorfulText** component, designed to render text where each character is displayed in a different color, with the colors cycling or shuffling periodically. This creates a vibrant and dynamic text effect.

## Core Components

1.  **`ColourfulText.svelte`**:
    *   The main component responsible for rendering the text with animated, cycling colors.
    *   It takes a `text` prop (string) which is the content to be displayed.
    *   Internally, it maintains an array of predefined `colors`. On a set interval (default 3 seconds), it shuffles this array (`currentColors`) and increments a `count` variable.
    *   The text is split into individual characters. Each character is wrapped in a `<span>`.
    *   The `{#key count}` block around the character iteration ensures that when `count` changes (due to color shuffling), Svelte re-renders the characters, triggering their `in` transition.
    *   Each character `<span>` uses `svelte/transition`'s `fly` transition (`in:fly|global={{ x: 10, delay: index * 40 }}`) for an animated appearance.
    *   The color of each character is determined by `currentColors[index % currentColors.length]`, cycling through the shuffled colors.
    *   A notable style `tracking-[-11px]` is applied, which significantly reduces letter spacing for a compact, overlapping effect often seen in such designs.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/colorful-text/ColourfulText.svelte
    <script>
      import { onMount } from "svelte";
      import { blur, fly, scale } from "svelte/transition";

      export let text = "";

      const colors = [
        "rgb(131, 179, 32)",
        "rgb(47, 195, 106)",
        "rgb(42, 169, 210)",
        "rgb(4, 112, 202)",
        "rgb(107, 10, 255)",
        "rgb(183, 0, 218)",
        "rgb(218, 0, 171)",
        "rgb(230, 64, 92)",
        "rgb(232, 98, 63)",
        "rgb(249, 129, 47)",
      ];

      let currentColors = [...colors];
      let count = 0;

      function shuffleColors() {
        currentColors = [...colors].sort(() => Math.random() - 0.5);
        count++;
      }

      onMount(() => {
        const interval = setInterval(shuffleColors, 3000); // Colors shuffle every 3 seconds
        return () => clearInterval(interval);
      });
    </script>

    {#key count}
      <span>
        {#each text.split("") as char, index}
          <span
            in:fly|global={{ x: 10, delay: index * 40 }}
            class="inline-block whitespace-pre font-sans tracking-[-11px]"
            style="color: {currentColors[index % currentColors.length]};"
          >
            {char}
          </span>
        {/each}
      </span>
    {/key}
    ```

2.  **`ColourfulTextExample.svelte`**:
    *   An example component showcasing the `ColourfulText` component.
    *   It typically embeds `ColourfulText` within a larger heading or text block to highlight a specific word or phrase.
    *   The example demonstrates its use in a hero section-like context with a background image.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/colorful-text/ColourfulTextExample.svelte
    <script>
      import ColourfulText from "./ColourfulText.svelte";
    </script>
    <div
      class="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black"
    >
      <img
        alt="img"
        src="https://assets.aceternity.com/linear-demo.webp"
        class="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none opacity-70"
      />
      <h1
        class="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans"
      >
        The only <ColourfulText text="autonomous" /> <br /> project management tool
      </h1>
    </div>
    ```

3.  **`acetColourfulText.ts`**:
    *   The manifest file for the ColorfulText component.
    *   Defines the `AceternityUI` object containing metadata (id, title, description, tags), the preview component (`ColourfulTextExample`), and installation instructions.
    *   Installation typically includes dependencies like `clsx` and `tailwind-merge` (common utilities for the library) and the source code for `ColourfulText.svelte`.

## Basic Usage

To use the `ColourfulText` component, import it and pass the desired text string as a prop.

```svelte /dev/null/MyColorfulTextUsage.svelte
<script>
  import ColourfulText from '$lib/aceternity-ui/components/colorful-text/ColourfulText.svelte';
</script>

<div class="my-8 p-10 bg-gray-900 rounded-lg text-center">
  <h2 class="text-3xl text-white mb-4">
    Welcome to <ColourfulText text="SVELTE" /> Animations!
  </h2>
  <p class="text-xl text-neutral-400">
    Experience <ColourfulText text="DYNAMIC" /> and <ColourfulText text="VIBRANT" /> text effects.
  </p>
</div>

<style>
  /* Ensure your global styles or Tailwind config supports the font-sans and tracking utilities */
  /* The component uses a very tight letter spacing: tracking-[-11px] */
</style>
```

**Key Considerations**:

*   **Styling**: The component relies on specific Tailwind CSS classes like `font-sans` and `tracking-[-11px]`. Ensure your project's Tailwind setup includes these or adjust the component's classes accordingly.
*   **Transitions**: The `fly` transition is used. You can experiment with other Svelte transitions (`blur`, `scale`, etc.) by modifying the `in:` directive in `ColourfulText.svelte`.
*   **Color Palette**: The default color palette is defined within `ColourfulText.svelte`. You can customize these colors directly in the component file.
*   **Shuffle Interval**: The color shuffling interval is hardcoded at 3000ms (3 seconds). This can be changed in the `onMount` function within `ColourfulText.svelte`.

Refer to `acetColourfulText.ts` for detailed installation steps and dependencies.
```