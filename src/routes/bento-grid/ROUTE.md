# `/bento-grid` Route Documentation

This document details the structure and functionality of the `/bento-grid` route in the Svelte Animations documentation project. This route showcases interactive grid-based layout components using the bento grid pattern, a versatile design approach for creating visually appealing content arrangements.

## Route Overview

The `/bento-grid` route demonstrates various implementations of bento grid UI components. These components allow developers to create modular, responsive grid layouts with interactive elements, animations, and dynamic content.

## File Structure

```
/bento-grid/
├── +page.svelte           # Main demo page with examples
├── BentoCalendar.svelte   # Calendar component for grid items
├── BentoCard.svelte       # Card component for grid cells
├── BentoCommand.svelte    # Command palette component
├── BentoGrid.svelte       # Core grid layout container
├── BentoMarquee.svelte    # Scrolling marquee component
└── BentoResizable.svelte  # Resizable panels component
```

## Key Components

### BentoGrid.svelte

The foundational layout component that creates a responsive grid system:

```svelte
<div class={cn("grid w-full auto-rows-[20rem] grid-cols-3 gap-4", className)}>
  <slot></slot>
</div>
```

Key features:
- Fixed-height rows (`auto-rows-[20rem]`)
- Three-column default layout
- Consistent gap spacing
- Slot for inserting grid items

### BentoCard.svelte

The primary building block for grid cells that provides:
- Interactive hover effects with content reveal
- Icon integration from Lucide
- Background component embedding
- Call-to-action buttons

### Specialized Components

- **BentoMarquee**: Horizontal scrolling content with hover pause
- **BentoCalendar**: Interactive calendar with animation effects
- **BentoCommand**: Command palette with search functionality
- **BentoResizable**: Panels that can be resized by the user

## Implementation Example

The main page demonstrates using these components together:

```svelte
<BentoGrid>
  {#each features as item}
    <BentoCard {...item} />
  {/each}
</BentoGrid>
```

Where `features` is an array of objects defining:
- Background component to render
- Icon to display
- Title and description
- Link destination and CTA text
- Grid span classes

## Interactive Features

The bento components implement several interactive features:
- Group hover effects to reveal additional content
- Scale transformations on hover
- Transition animations for smooth interactions
- Masked background patterns
- GPU-accelerated transformations

## CSS Techniques

Notable CSS techniques used in these components:
- CSS Grid for layout structure
- Transform GPU acceleration with `transform-gpu`
- CSS transitions for animation effects
- CSS masks for gradient fading effects
- Tailwind utility classes for styling
- Dark/light mode support

## Responsive Behavior

The bento grid implements responsive layouts through:
- Grid column adjustments at different breakpoints (SM/MD)
- Conditional class application based on index
- Mobile-first approach with progressive enhancement
- Height adjustments for content at different screen sizes

## Usage Guidance

When implementing these components:
1. Define your feature array with appropriate properties
2. Structure the layout using the main BentoGrid component
3. Populate with BentoCard instances for each content section
4. Customize backgrounds using specialized components
5. Adjust grid spans for different layout variations

## Design Considerations

The bento grid pattern provides several advantages:
- Visual hierarchy through varied cell sizing
- Content grouping for improved information architecture
- Dynamic content presentation with interactive elements
- Engaging user experience through subtle animations
- Modular approach for easy content management

This route serves as both a demonstration and implementation reference for developers looking to incorporate bento grid layouts in their Svelte applications.