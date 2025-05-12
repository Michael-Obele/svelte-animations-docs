# `/examples` Route Documentation

This document details the structure and functionality of the `/examples` route in the Svelte Animations documentation project. This route serves as a showcase for various animation examples implemented with Svelte.

## Route Structure

```
/examples/
├── +layout.svelte          # Shared layout with sidebar navigation
├── +page.svelte            # Root page content
└── [exampleID]/            # Dynamic route for individual examples
    └── +page.svelte        # Example detail page
```

## Layout (`+layout.svelte`)

The `/examples` route uses a consistent layout that wraps all child routes with navigation components:

```svelte
<script>
  import MainSidebar from "$lib/components/dev/tags/MainSidebar.svelte";
  import SideNav from "$lib/components/dev/tags/SideNav.svelte";
  import { animationExamples } from "$lib/examples/AnimationsExamples";
</script>

<MainSidebar>
  <slot></slot>
</MainSidebar>
```

This layout:
- Imports the `MainSidebar` component for navigation
- Provides a commented-out alternative using `SideNav` with `animationExamples` data
- Renders child content via the `<slot>` element

## Root Page (`+page.svelte`)

The root page at `/examples` contains minimal content with proper SEO metadata:

```svelte
<script>
  import HeadingOne from "$lib/components/dev/tags/HeadingOne.svelte";
  import Para from "$lib/components/dev/tags/Para.svelte";
</script>

<svelte:head>
  <title>Svelte Animation Examples</title>
  <meta name="description" content="Svelte Animation Examples" />
</svelte:head>
```

This page serves as an entry point to the animation examples section, providing a clean starting point.

## Dynamic Example Route (`/examples/[exampleID]`)

This dynamic route renders detailed information about a specific animation example based on the `exampleID` parameter. The page:

1. Fetches the example data from `animationExamples` array using the route parameter
2. Displays the example component in a preview container
3. Shows the source code with syntax highlighting
4. Generates a filename based on the example name

The example data is loaded reactively using SvelteKit's `$page` store to access route parameters:

```svelte
<script>
  import { page } from "$app/stores";
  import { animationExamples } from "$lib/examples/AnimationsExamples";
  
  $: routeID = $page.params.exampleID;
  $: comp = animationExamples.filter((comp) => comp.id == Number(routeID))[0];
</script>
```

## Example Rendering

Each example is displayed in a standardized layout:

```svelte
<div class="space-y-7">
  <h1 class="text-2xl font-bold mt-4 md:text-3xl capitalize my-6">
    {comp.name}
  </h1>
  <div>
    <ComponentView>
      <svelte:component this={comp.component} />
    </ComponentView>
  </div>
  <div>
    <CodeBlock code={comp.code} fileName={fileName} />
  </div>
</div>
```

This structure provides:
- A clear example title with responsive sizing
- The live component rendered in a `ComponentView` container
- The source code displayed in a `CodeBlock` with proper syntax highlighting

## Data Source

The route relies on the `animationExamples` array which contains objects with properties:
- `id`: Numeric identifier used in the URL
- `name`: Display name for the example
- `component`: The actual Svelte component to render
- `code`: Source code string for display

## Navigation

The example detail page includes a "Back" link to return to the examples index:

```svelte
<a
  href="/examples"
  class="flex items-center gap-1 text-muted-foreground w-fit"
>
  <svg>...</svg>
  Back
</a>
```

## Key Components Used

1. `ComponentView`: Creates a standardized container for displaying live components
2. `CodeBlock`: Renders formatted code with syntax highlighting and filename
3. `svelte:component`: Dynamically renders the component from the examples array

This route demonstrates how to create an organized documentation system for showcasing animation examples with both live previews and source code, enabling users to learn from and copy the implementations.