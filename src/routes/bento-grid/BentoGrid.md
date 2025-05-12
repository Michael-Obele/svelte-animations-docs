# BentoGrid Component

## Overview

The `BentoGrid` component is a foundational layout component that creates a responsive grid system for arranging content in a bento-box style pattern. It provides a flexible container with consistent sizing and spacing for building modular, visually appealing interfaces.

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `class` | `string` | Additional CSS classes to apply to the component | `""` |

## Usage

```svelte
<script>
  import BentoGrid from "./BentoGrid.svelte";
  import BentoCard from "./BentoCard.svelte";
  
  const items = [
    // Item configuration objects
  ];
</script>

<BentoGrid class="my-8">
  {#each items as item}
    <BentoCard {...item} />
  {/each}
</BentoGrid>
```

## Basic Example

```svelte
<BentoGrid>
  <div class="col-span-1">Item 1</div>
  <div class="col-span-2">Item 2 (wider)</div>
  <div class="col-span-3">Item 3 (full width)</div>
</BentoGrid>
```

## Grid Structure

The BentoGrid component creates a CSS Grid layout with the following default properties:

- Full width container
- Fixed-height rows (20rem / 320px)
- Three-column layout by default
- 1rem (16px) gap between items

## Customization

The grid can be customized through the `class` prop, which allows overriding any of the default grid properties:

```svelte
<BentoGrid class="grid-cols-4 gap-6 auto-rows-[15rem]">
  <!-- Content -->
</BentoGrid>
```

## Grid Item Placement

Child items within the grid can control their own placement using Tailwind's grid utility classes:

- `col-span-1` through `col-span-3` to control width
- `row-span-1` through `row-span-3` to control height
- `col-start-1` through `col-start-3` to control starting position

## Responsive Behavior

The component works well with Tailwind's responsive prefixes to create layouts that adapt to different screen sizes:

```svelte
<BentoGrid>
  <div class="col-span-3 md:col-span-2 lg:col-span-1">
    Responsive grid item
  </div>
</BentoGrid>
```

## Implementation Details

The BentoGrid component is intentionally minimal, providing just the grid container structure. It uses the `cn()` utility function to merge default classes with any additional classes passed through the `class` prop.

The core implementation:

```svelte
<div class={cn("grid w-full auto-rows-[20rem] grid-cols-3 gap-4", className)}>
  <slot></slot>
</div>
```

## Best Practices

1. **Consistent Heights**: For the most visually pleasing results, maintain consistent heights for items in the same row.

2. **Visual Hierarchy**: Use different column spans to create visual hierarchy and guide the user's attention.

3. **Content Density**: Balance content density by alternating between wider and narrower items.

4. **Responsive Adjustments**: Plan for how the grid will reflow on smaller screens by using responsive class variants.

5. **Animation Coordination**: When adding animations to grid items, consider how they interact with each other visually.

## Related Components

The BentoGrid component is typically used with these related components:

- `BentoCard`: Standard content card for grid items
- `BentoCalendar`: Calendar widget for grid items
- `BentoMarquee`: Scrolling content for grid items
- `BentoCommand`: Command palette interface for grid items
- `BentoResizable`: Resizable panels for grid items