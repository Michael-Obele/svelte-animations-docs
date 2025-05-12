# `/a` Route Documentation

This document details the structure and functionality of the `/a` route in the Svelte Animations documentation project. This route serves as the entry point for Aceternity UI components, providing a structured layout with navigation sidebar and dynamic content rendering.

## Route Structure

```
/a/
├── +layout.svelte          # Shared layout with sidebar
├── +page.svelte            # Root page content
├── components/             # Dynamic component routes
│   └── [componentID]/
│       └── +page.svelte    # Component detail pages
└── docs/                   # Dynamic documentation routes
    └── [docsID]/
        └── +page.svelte    # Documentation detail pages
```

## Layout (`+layout.svelte`)

The `/a` route uses a consistent layout that wraps all child routes with the `AceternitySidebar` component. This provides navigation and context for the Aceternity UI components.

```svelte
<script>
  import AceternitySidebar from "$lib/aceternity-ui/web/AceternitySidebar.svelte";
</script>

<AceternitySidebar>
  <slot></slot>
</AceternitySidebar>
```

## Root Page (`+page.svelte`)

The root page at `/a` contains minimal content:

```svelte
coding is fun
```

## Dynamic Routes

### Component Details (`/a/components/[componentID]`)

This dynamic route renders detailed information about a specific Aceternity UI component based on the `componentID` parameter. The page:

1. Fetches the component data from `allAceternityUI` array
2. Displays component metadata (title, description, tags)
3. Shows interactive preview with code examples
4. Provides installation instructions
5. Renders examples with code snippets

The component data is loaded reactively using SvelteKit's `$page` store to access route parameters:

```svelte
<script>
  import { page } from "$app/stores";
  import { allAceternityUI } from "$lib/aceternity-ui/components/allAceternityUI";
  
  $: routeID = $page.params.componentID;
  $: comp = allAceternityUI.filter((c) => c.id === routeID)[0];
</script>
```

### Documentation Pages (`/a/docs/[docsID]`)

This dynamic route renders documentation pages for specific topics based on the `docsID` parameter. The page:

1. Fetches documentation data from `allInstallations` array
2. Displays documentation title and description
3. Renders code blocks with proper syntax highlighting
4. Supports multiple code sections with explanations

The documentation data is loaded reactively:

```svelte
<script>
  import { page } from "$app/stores";
  import { allInstallations } from "$lib/aceternity-ui/docs/allinstallations";
  
  $: routeID = $page.params.docsID;
  $: docs = allInstallations.filter((doc) => doc.id === routeID)[0];
</script>
```

## Data Sources

The route relies on two primary data sources:

1. `allAceternityUI` - An array of component objects with properties like:
   - `id`: Unique identifier used in the URL
   - `title`: Display name
   - `desc`: Component description
   - `tags`: Array of category tags
   - `preview`: Preview component and code
   - `installations`: Installation instructions
   - `examples`: Example usage scenarios

2. `allInstallations` - An array of documentation objects with properties like:
   - `id`: Unique identifier used in the URL
   - `title`: Documentation title
   - `desc`: Documentation description
   - `allcode`: Array of code blocks with titles and language

## Component Rendering

Components and examples use a tabbed interface to toggle between preview and code views:

```svelte
<Tabs.Root value={comp.title}>
  <Tabs.List>
    <Tabs.Trigger value={comp.title}>Preview</Tabs.Trigger>
    <Tabs.Trigger value="{comp.title}-code">Code</Tabs.Trigger>
  </Tabs.List>
  
  <Tabs.Content value={comp.title}>
    <ComponentView>
      <svelte:component this={comp.preview.comp} />
    </ComponentView>
  </Tabs.Content>
  
  <Tabs.Content value="{comp.title}-code">
    <CodeBlock code={item.code} fileName={item.filename} />
  </Tabs.Content>
</Tabs.Root>
```

## SEO Considerations

Both component and documentation pages include appropriate `<svelte:head>` tags for SEO optimization:

```svelte
<svelte:head>
  <title>{comp.title} · Svelte Aceternity UI</title>
  <meta name="description" content={comp.desc} />
  <meta property="og:title" content={comp.title + "· Svelte"} />
  <meta property="og:description" content={comp.desc} />
  <!-- Additional meta tags -->
</svelte:head>
```

## URL Pattern

- Component URLs: `/a/components/[componentID]`
- Documentation URLs: `/a/docs/[docsID]`

This routing structure provides organized access to all Aceternity UI components and their corresponding documentation.