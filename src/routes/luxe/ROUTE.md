# `/luxe` Route Documentation

This document details the structure and functionality of the `/luxe` route in the Svelte Animations documentation project. This route showcases a collection of elegant UI components with a focus on luxury design aesthetics.

## Route Structure

```
/luxe/
├── +layout.svelte          # Shared layout with sidebar
├── +page.svelte            # Root page with component grid
├── [componentID]/          # Dynamic route for component details
│   └── +page.svelte        # Component detail page
└── usage/                  # Usage guide
    └── +page.svelte        # Installation and usage instructions
```

## Layout (`+layout.svelte`)

The `/luxe` route uses a consistent layout that wraps all child routes with the `LuxeSidebar` component:

```svelte
<script>
  import LuxeSidebar from "$lib/luxe/components/sidebar/LuxeSidebar.svelte";
</script>

<LuxeSidebar>
    <slot></slot>
</LuxeSidebar>
```

## Root Page (`+page.svelte`)

The root page at `/luxe` contains:
1. SEO metadata configuration using `SvelteSeo`
2. A title and description section
3. A grid layout of all available Luxe UI components
4. Links to each component with hover effects

```svelte
<main class="my-2 xl:my-8 space-y-6 md:space-y-10 mx-2 md:mx-4">
  <section class="flex flex-col gap-6">
    <div class="space-y-2">
      <h1 class="text-3xl md:text-4xl font-semibold text-primary">
        Svelte Luxe UI
      </h1>
      <p class="font-normal text-neutral-500">
        Luxe Svelte - Free components, <span class="text-primary">Copy</span>
        and <span class="text-primary">Paste</span> to illuminate your
        applications with elegance.
      </p>
    </div>
  </section>
  <div class="grid md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-8">
    {#each allLuxeComponents as { name, colSpan, component, id }}
      <!-- Component card with preview -->
    {/each}
  </div>
</main>
```

## Dynamic Component Route (`/luxe/[componentID]`)

This dynamic route renders detailed information about a specific Luxe UI component based on the `componentID` parameter. The page:

1. Fetches the component data from `allLuxeComponents` array
2. Displays component metadata (title, tags)
3. Shows interactive preview in a `ComponentView`
4. Provides code examples and implementation details
5. Includes installation instructions where applicable

```svelte
<script lang="ts">
  import { allLuxeComponents } from "$lib/luxe/components/AllLuxeComponents";
  import { page } from "$app/stores";
  
  $: routeID = $page.params.componentID;
  $: comp = allLuxeComponents.filter((comp) => comp.id == routeID)[0];
</script>
```

## Usage Page (`/luxe/usage`)

The usage page provides basic setup instructions for using Luxe UI components:

1. Project creation steps
2. Tailwind CSS installation
3. Configuration code examples

## Data Source

The route relies on the `allLuxeComponents` array which contains objects with properties:
- `id`: String identifier used in the URL
- `name`: Display name
- `component`: The Svelte component to render
- `code`: Source code (string or array of code objects)
- `description`: Detailed component description (optional)
- `colSpan`: Boolean to indicate full-width display (optional)
- `tags`: Array of category tags (optional)
- `download`: Installation commands (optional)
- `cncode`: Utility function code (optional)
- `tailwind`: Tailwind configuration (optional)
- `showGrid`: Boolean to enable grid background (optional)
- `class`: Additional CSS classes (optional)

## UI Structure

### Grid Layout

The main page uses a responsive grid layout:
```svelte
<div class="grid md:grid-cols-3 gap-x-6 gap-y-5 md:gap-y-8">
  <!-- Component cards -->
</div>
```

### Component Cards

Each component is displayed in a card with:
- Component name link with hover effect
- Live component preview in a `ComponentView`
- Optional gradient line for visual enhancement

### Component Detail Page

The component detail page uses a two-column layout:
- Left column: Component information and preview
- Right column: Carbon ad
- Full width: Code examples and installation instructions

## Navigation Elements

Each component detail page includes a "Back" link:

```svelte
<a
  href="/luxe"
  class="flex items-center gap-1 text-muted-foreground w-fit"
>
  <svg><!-- Back arrow icon --></svg>
  Back
</a>
```

This Luxe UI route provides an elegant showcase of premium-styled components that developers can easily implement in their Svelte applications.