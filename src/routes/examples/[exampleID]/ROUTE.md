# `/examples/[exampleID]` Route Documentation

This document details the dynamic route used for displaying individual animation examples in the Svelte Animations documentation project.

## Route Overview

The `/examples/[exampleID]` route renders a specific animation example based on the `exampleID` URL parameter. It provides both a live preview of the animation component and its source code for learning and reference purposes.

## Implementation Details

### Data Fetching

The component uses SvelteKit's `$page` store to access route parameters and reactively fetch example data:

```svelte
<script lang="ts">
  import { page } from "$app/stores";
  import { animationExamples } from "$lib/examples/AnimationsExamples";
  
  $: routeID = $page.params.exampleID;
  $: comp = animationExamples.filter((comp) => comp.id == Number(routeID))[0];
</script>
```

### Filename Generation

The component dynamically generates a filename for the code display based on the example name:

```svelte
$: fileName =
  comp.name
    .split(" ")
    .map((k) => {
      let kit = k.charAt(0).toUpperCase();
      let m = kit + k.replace(k[0], "");
      return m;
    })
    .join("") + ".svelte";
```

This transforms example names like "slide animation" into filenames like "SlideAnimation.svelte".

## Page Structure

The page is organized into distinct sections:

1. **Navigation**: A "Back" link to return to the examples index
2. **Example Title**: The name of the animation example 
3. **Component Preview**: The live animation rendered in a `ComponentView`
4. **Source Code**: The implementation code with syntax highlighting

## Rendering Approach

The page uses Svelte's dynamic component rendering to display the example:

```svelte
<ComponentView>
  <svelte:component this={comp.component} />
</ComponentView>
```

This allows any component from the `animationExamples` array to be rendered without hardcoding specific imports.

## Code Display

The source code is presented using the `CodeBlock` component:

```svelte
<CodeBlock code={comp.code} fileName={fileName} />
```

This provides syntax highlighting, proper formatting, and a contextual filename.

## Expected Data Structure

The route expects examples in the `animationExamples` array to follow this structure:

```typescript
interface AnimationExample {
  id: number;           // Unique identifier for routing
  name: string;         // Display name
  component: any;       // The Svelte component to render
  code: string;         // Source code as a string
}
```

## Usage Example

To link to a specific example:

```svelte
<a href="/examples/1">Fade Animation Example</a>
```

This would display the animation example with ID 1 from the `animationExamples` array.