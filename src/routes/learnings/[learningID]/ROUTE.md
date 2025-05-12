# `/learnings/[learningID]` Route Documentation

This document details the dynamic route used for displaying individual Framer Motion animation tutorials in the Svelte Animations documentation project.

## Route Overview

The `/learnings/[learningID]` route renders detailed information for a specific animation example based on the `learningID` URL parameter. It provides an interactive animation demo with source code and installation instructions.

## File Structure

```
/learnings/[learningID]/
└── +page.svelte       # Individual animation tutorial page
```

## Implementation Details

### Data Fetching

The component uses SvelteKit's `$page` store to access route parameters and reactively fetch animation example data:

```svelte
<script>
  import { page } from "$app/stores";
  import { motionLearnings } from "$lib/framer-motion/MotionsLearnings";
  
  $: exampleID = $page.params.learningID;
  $: singlePage = motionLearnings.filter(
    (example) => example.id === Number(exampleID)
  )[0];
</script>
```

### Filename Generation

The component dynamically generates a filename for the code display based on the example name:

```svelte
$: fileName =
  singlePage.name
    .split(" ")
    .map((k) => {
      let kit = k.charAt(0).toUpperCase();
      let m = kit + k.replace(k[0], "");
      return m;
    })
    .join("") + ".svelte";
```

## Page Structure

The page is organized into distinct sections:

1. **Navigation**: A "Back" link to return to the learnings index
2. **Example Title**: The name of the animation example 
3. **Component Preview**: The live animation rendered in a `ComponentView` with a gradient line background
4. **Installation Code**: Code block showing required dependencies
5. **Source Code**: The implementation code with syntax highlighting

## Component Preview

The animation example is displayed in a `ComponentView` with optional class customization:

```svelte
<ComponentView class="relative {singlePage.class} touch-none">
  <GradientLine />
  <svelte:component this={singlePage.component} />
</ComponentView>
```

The `touch-none` class ensures gestures work properly within the animation demo, and `GradientLine` provides visual enhancement.

## Installation Instructions

Each tutorial includes a standard installation block:

```svelte
<CodeBlock
  code={`npx @svelte-add/tailwindcss@latest \nnpm i svelte-motion\n`}
  lang="shellscript"
  fileName="Tailwind CSS & Svelte Motion"
/>
```

This shows users the required dependencies for implementing the animation.

## Code Display

The route handles different code formats flexibly:

```svelte
{#if typeof singlePage.code === "string"}
  <CodeBlock code={singlePage.code} {fileName} />
{:else if singlePage.code instanceof Array}
  {#each singlePage.code as { filename, code }}
    <CodeBlock {code} fileName={filename} />
  {/each}
{/if}
```

This allows for both simple single-file examples and more complex multi-file tutorials.

## SEO Optimization

The route implements thorough SEO metadata:

```svelte
<svelte:head>
  <title>Svelte | {singlePage.name}</title>
  <meta name="description" content={singlePage.desc} />
  <meta property="og:title" content="Svelte Framer Motion | {singlePage.name}" />
  <meta property="og:description" content={singlePage.desc} />
  <meta property="og:image" content={singlePage.image} />
  <!-- Additional meta tags -->
</svelte:head>
```

## Expected Data Structure

The route expects animation examples in the `motionLearnings` array to follow this structure:

```typescript
interface MotionLearning {
  id: number;              // Unique identifier for routing
  name: string;            // Example display name
  desc: string;            // Brief description
  component: any;          // Svelte component to render
  code: string | Array<{   // Source code as string or array
    filename: string;      // File name
    code: string;          // Code content
  }>;
  image?: string;          // Social media preview image
  class?: string;          // Additional CSS classes
}
```

## Usage Example

To link to a specific animation example:

```svelte
<a href="/learnings/5">Spring Animation</a>
```

This would display the animation with ID 5 from the `motionLearnings` array.