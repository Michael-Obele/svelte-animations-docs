# BentoCard Component

## Overview

The `BentoCard` component is a versatile card element designed for bento grid layouts in Svelte applications. It provides an animated, interactive card with hover effects, content reveal animations, and dynamic background capabilities.

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `class` | `string` | Additional CSS classes to apply to the component | `""` |
| `name` | `string` | Title text displayed in the card | Required |
| `description` | `string` | Descriptive text content for the card | Required |
| `background` | `Component` | Svelte component to render as background | Required |
| `Icon` | `Component` | Lucide icon component to display | Required |
| `href` | `string` | Link destination for the call-to-action button | Required |
| `cta` | `string` | Call-to-action button text | Required |

## Usage

```svelte
<script>
  import BentoCard from "./BentoCard.svelte";
  import BentoMarquee from "./BentoMarquee.svelte";
  import { TextSearch } from "lucide-svelte";
</script>

<BentoCard
  name="Save your files"
  description="We automatically save your files as you type."
  background={BentoMarquee}
  Icon={TextSearch}
  href="/"
  cta="Learn more"
  class="col-span-3 lg:col-span-1"
/>
```

## Component Structure

The `BentoCard` component is structured with several layers:

1. **Container** - The outer wrapper with group hover functionality
2. **Background** - Dynamic component rendered as the card background
3. **Content** - Title, description, and icon with transform animations
4. **Call-to-Action** - Button that appears on hover
5. **Overlay** - Subtle background effect on hover

## Animations

The component implements several GPU-accelerated animations:

- **Icon Animation**: Scales down to 75% on hover
- **Content Translation**: Moves upward on hover (-translate-y-10)
- **CTA Reveal**: Transitions from hidden to visible with upward movement
- **Subtle Background**: Changes opacity on hover

## Styling

BentoCard uses a combination of utility classes for styling:

### Light Mode
- White background
- Subtle box shadow
- Neutral text colors

### Dark Mode
- Black background
- Border with low opacity
- Inner glow effect
- Lighter text colors

## Implementation Details

The component uses Svelte's `svelte:component` dynamic component syntax to render the background and icon:

```svelte
<div>
  <svelte:component this={background} />
</div>

<svelte:component
  this={Icon}
  class="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"
/>
```

This allows for flexible content injection without hard-coding specific components.

## Responsiveness

BentoCard is designed to work within grid layouts and adapts to its container. The component itself doesn't handle breakpoints, but can be configured via the `class` prop to span different columns at various breakpoints.

## Accessibility

The card maintains good contrast ratios and ensures interactive elements are properly accessible. The call-to-action button remains functional through pointer-events management even with layered animations.