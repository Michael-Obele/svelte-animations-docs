# `/in` Route Documentation

This document details the structure and functionality of the `/in` route in the Svelte Animations documentation project. This route showcases Indie UI components with detailed documentation and code examples.

## Route Structure

```
/in/
├── +layout.svelte          # Shared layout with sidebar
├── +page.svelte            # Root page with component overview
├── [compID]/               # Dynamic route for component details
│   └── +page.svelte        # Component detail page
└── setup/                  # Setup instructions
    └── +page.svelte        # Installation and configuration guide
```

## Layout (`+layout.svelte`)

The `/in` route uses a consistent layout that wraps all child routes with the `IndieUIsidebar` component:

```svelte
<script>
  import IndieUIsidebar from "$lib/indieui/ui/sidebar/IndieUIsidebar.svelte";
</script>

<IndieUIsidebar>
  <slot></slot>
</IndieUIsidebar>
```

## Root Page (`+page.svelte`)

The root page at `/in` contains:
1. SEO metadata configuration using `SvelteSeo`
2. A title and description of the Indie UI components library
3. A link to the `/fun` route for preview
4. The entire `Page` component from `/fun` route to show all components
5. A separator between the header and component display

```svelte
<main class="my-2 xl:my-8 space-y-6 md:space-y-10 mx-2 md:mx-4">
  <section class="flex flex-col gap-5">
    <div class="space-y-2">
      <h1 class="text-3xl md:text-4xl font-bold text-primary">
        Svelte Indie UI
      </h1>
      <p class="font-normal text-neutral-500">
        Free components, <span class="text-primary">Copy</span>
        and <span class="text-primary">Paste</span> to illuminate your applications
        with elegance.
      </p>
      <!-- Preview link and separator -->
    </div>
    <Separator />
    <Page />
  </section>
</main>
```

## Dynamic Component Route (`/in/[compID]`)

This dynamic route renders detailed information about a specific Indie UI component based on the `compID` parameter. The page:

1. Fetches the component data from `allIndieUIComponents` array
2. Displays component metadata (title, description)
3. Shows interactive preview with code examples in tabs
4. Supports different component variants
5. Handles different code display formats (string or array of code blocks)

```svelte
<script>
  import { allIndieUIComponents } from "$lib/indieui/allIndieUIComponents";
  import { page } from "$app/stores";
  
  $: routeID = $page.params.compID;
  $: comp = allIndieUIComponents.filter((comp) => comp.id == routeID)[0];
</script>
```

## Setup Page (`/in/setup`)

The setup page provides installation and configuration instructions for using Indie UI components:

1. Installation commands for dependencies
2. Utility function setup (`cn` function for class merging)
3. Basic usage instructions

## Data Source

The route relies on the `allIndieUIComponents` array which contains objects with properties:
- `id`: String identifier used in the URL
- `name`: Display name
- `variants`: Array of component variants, each with:
  - `name`: Variant name
  - `component`: The Svelte component to render
  - `code`: Source code (string or array of code objects)
  - `fileName`: Display filename for code
  - `showGrid`: Boolean to enable grid background (optional)
  - `showDots`: Boolean to enable dot pattern background (optional)
  - `class`: Additional CSS classes (optional)

## Key Components Used

1. `Tabs`: For organizing variant views and code examples
2. `ComponentView`: For displaying live component previews
3. `CodeBlock`: For rendering syntax-highlighted code
4. `Carbon`: For displaying ads or sponsorship
5. `Badge`: For displaying component tags
6. `Separator`: For visual separation of sections

## UI Structure

The component detail page utilizes a grid layout for responsive display:
- Header and metadata on the left
- Carbon ad on the right
- Component variants in tabs below
- Code examples with proper syntax highlighting

The setup page uses a clean, instructional layout with:
- Clear headings for each setup step
- Code blocks with syntax highlighting
- Explanatory text between code samples

This route provides a comprehensive documentation and showcase system for the Indie UI component library, allowing users to explore, understand, and implement these components in their own projects.