# `/in/[compID]` Route Documentation

This document details the dynamic route used for displaying individual Indie UI component details in the Svelte Animations documentation project.

## Route Overview

The `/in/[compID]` route renders detailed information for a specific UI component based on the `compID` URL parameter. It provides interactive component previews with tabs for different variants, code examples, and comprehensive documentation.

## Implementation Details

### Data Fetching

The component uses SvelteKit's `$page` store to access route parameters and reactively fetch component data:

```svelte
<script>
  import { allIndieUIComponents } from "$lib/indieui/allIndieUIComponents";
  import { page } from "$app/stores";
  
  $: routeID = $page.params.compID;
  $: comp = allIndieUIComponents.filter((comp) => comp.id == routeID)[0];
</script>
```

### Dynamic Tabs System

The route implements a tabbed interface to display different component variants:

```svelte
<Tabs.Root value={item.name}>
  <Tabs.List class="bg-transparent">
    <Tabs.Trigger value={item.name}>{item.name}</Tabs.Trigger>
    <Tabs.Trigger value="code">Code</Tabs.Trigger>
  </Tabs.List>
  <Separator class="mb-4 -mt-0.5 ml-1 pt-0" />
  <Tabs.Content value={item.name}>
    <!-- Component preview -->
  </Tabs.Content>
  <Tabs.Content value="code">
    <!-- Component code -->
  </Tabs.Content>
</Tabs.Root>
```

## Page Structure

The page is organized into distinct sections:

1. **Navigation**: A "Back" link to return to the `/in` index
2. **Header**: Two-column layout with component details and Carbon ad
3. **Component Variants**: Tabbed interface for each variant
4. **Code Display**: Syntax-highlighted code examples

## Visual Enhancements

The route supports optional visual elements for component displays:

```svelte
<ComponentView class="{item?.showGrid === true ? ' relative overflow-hidden ' : ''} {item?.showDots === true ? ' relative overflow-hidden ' : ''} {item?.class}">
  {#if item?.showGrid}
    <div class="absolute h-full w-full bg-[linear-gradient(to_right,#b1b1b12e_1px,transparent_1px),linear-gradient(to_bottom,#b1b1b12e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>
  {:else if item?.showDots}
    <div class="[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_30%,transparent_100%)] absolute h-full w-full">
      <DotPattern class="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" fillColor="rgba(120, 120, 120,0.4)" />
    </div>
  {/if}
  <svelte:component this={item.component} />
</ComponentView>
```

These include:
- Grid background patterns
- Dot pattern backgrounds
- Custom classes for specific component needs

## Code Rendering

The route handles different code formats flexibly:

```svelte
{#if typeof item.code === "string"}
  <CodeBlock code={item.code} lang="svelte" fileName={item.fileName} />
{/if}
{#if item.code instanceof Array}
  <div class="space-y-4">
    {#each item.code as code}
      <CodeBlock code={code.code} lang="svelte" fileName={code.filename} />
    {/each}
  </div>
{/if}
```

This allows for both simple single-file components and more complex multi-file examples.

## SEO Optimization

The route implements thorough SEO metadata:

```svelte
<svelte:head>
  <title>{comp.title} · Svelte</title>
  <meta name="description" content={comp.desc} />
  <meta property="og:title" content={comp.title + "· Svelte"} />
  <meta property="og:description" content={comp.desc} />
  <!-- Additional meta tags -->
</svelte:head>
```

## Expected Data Structure

The route expects components in the `allIndieUIComponents` array to follow this structure:

```typescript
interface IndieUIComponent {
  id: string;              // Unique identifier for routing
  name: string;            // Component display name
  variants: Array<{        // Component variants
    name: string;          // Variant name
    component: any;        // Svelte component to render
    code: string | Array<{  // Source code as string or array of code blocks
      code: string;        // Code content
      filename: string;    // File name
    }>;
    fileName?: string;     // Filename for single-file components
    showGrid?: boolean;    // Enable grid background
    showDots?: boolean;    // Enable dot pattern background
    class?: string;        // Additional CSS classes
  }>;
}
```

## Usage Example

To link to a specific component:

```svelte
<a href="/in/bento-4">Bento Grid (4-Cell)</a>
```

This dynamic route pattern creates a consistent, detailed documentation page for each component in the Indie UI library, making it easy for users to understand, preview, and implement these components in their own projects.