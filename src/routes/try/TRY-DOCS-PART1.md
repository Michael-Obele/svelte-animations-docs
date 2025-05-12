# Try Route Documentation (Part 1)

## Overview

The `/try` route contains experimental components and demos showcasing various animation, interaction, and visual effects. These components demonstrate advanced techniques using Svelte, animation libraries, and modern CSS.

## Purpose

This section serves as a playground and showcase for:
- Animation techniques
- Interactive UI components
- Experimental visualizations
- SVG manipulations
- Motion effects

Most components here are designed to be standalone, modular, and reusable in other projects.

## Main Components

### AuroraText

A text component with a glowing aurora effect, used on the main `/try` route page.

```svelte
<AuroraText class='pr-3'>Svelte</AuroraText>
```

### CircularProgressBar

An animated circular progress indicator with customizable colors and animation.

**Props:**
- `max`: Maximum value (default: 100)
- `value`: Current value (default: 0)
- `min`: Minimum value (default: 0)
- `gaugePrimaryColor`: Primary color for the gauge (default: "#f00")
- `gaugeSecondaryColor`: Secondary color for the gauge (default: "#ddd")

### GlowingEffect

Creates a glowing UI effect around components to provide visual emphasis.

**Props:**
- `blur`: Blur amount for the glow (default: 0)
- `inactiveZone`: Zone where effect is inactive (default: 0.7)
- `proximity`: Proximity sensitivity (default: 0)
- `spread`: Spread of the glow (default: 20)
- `variant`: Style variant (default: "default")
- `glow`: Whether glowing is enabled (default: false)
- `movementDuration`: Animation duration (default: 2)
- `borderWidth`: Width of the border (default: 1)
- `disabled`: Whether the effect is disabled (default: true)

### Lens

A magnifier/lens effect for images or content.

**Props:**
- `zoomFactor`: Magnification level (default: 1.5)
- `lensSize`: Size of the lens (default: 170)
- `isStatic`: Whether the lens position is static (default: false)
- `position`: Initial position ({x, y})
- `hovering`: Whether hovering is active

### LineShadowText

Text with a line shadow effect for visual emphasis.

**Props:**
- `shadowColor`: Color of the shadow (default: "white")

## Usage Examples

### AuroraText Example
```svelte
<div class="h-screen w-full flex items-center justify-center">
  <h1 class="text-4xl font-bold tracking-tighter md:text-5xl lg:text-9xl">
    Ship <AuroraText class='pr-3'>Svelte</AuroraText>
  </h1>
</div>
```

### Lens Example
```svelte
<Lens hovering={true}>
  <img
    src="your-image-url.jpg"
    alt="image"
    class="h-full w-[400px] scale-110 object-cover origin-center"
  />
</Lens>
```

## Dependencies

These components rely on:
- Svelte (core)
- Svelte Motion (animation library)
- TailwindCSS (styling)
- Various SVG and DOM APIs