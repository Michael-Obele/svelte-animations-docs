# Animated Beam Components Documentation

The `/mint` route contains a collection of components that demonstrate various animated beam/connection visualizations. These components create SVG-based animated gradients between different elements on the page.

## Component Overview

### AnimatedBeam.svelte

The core component that creates an animated gradient beam between two elements. It uses SVG paths and animated linear gradients to create a flowing connection between components.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerRef` | HTMLElement | required | Reference to the container element |
| `fromRef` | HTMLElement | required | Reference to the source element |
| `toRef` | HTMLElement | required | Reference to the target element |
| `curvature` | number | 0 | Controls the curve of the path (positive or negative) |
| `reverse` | boolean | false | Reverses the gradient animation direction |
| `duration` | number | Math.random() * 3 + 4 | Animation duration in seconds |
| `delay` | number | 0 | Animation delay in seconds |
| `pathColor` | string | "gray" | Color of the base path |
| `pathWidth` | number | 2 | Width of the path in pixels |
| `pathOpacity` | number | 0.2 | Opacity of the base path |
| `gradientStartColor` | string | "#ffaa40" | Start color of the gradient |
| `gradientStopColor` | string | "#9c40ff" | End color of the gradient |
| `startXOffset` | number | 0 | X-axis offset from the source element |
| `startYOffset` | number | 0 | Y-axis offset from the source element |
| `endXOffset` | number | 0 | X-axis offset from the target element |
| `endYOffset` | number | 0 | Y-axis offset from the target element |

### AnimateBeamBiDirectional.svelte

Demonstrates bidirectional animated beams, showing connections flowing in both directions between elements.

### AnimatedBeamMultipleInput.svelte

Shows how to connect multiple source elements to a common target, and then connect that target to another element.

### AnimatedBeamUniDirection.svelte

Demonstrates a simple unidirectional beam connecting two elements.

### Circle.svelte

A reusable styled circle component used as the visual endpoints for beams.

## Implementation Details

### How It Works

1. The component takes references to source and target elements
2. It calculates the relative positions of these elements within the container
3. It creates an SVG path between these points with optional curvature
4. It applies a moving gradient along this path using Svelte Motion for animation
5. It updates positions when elements resize or reposition using ResizeObserver

### Key Features

- Automatically adjusts to element position changes
- Supports both unidirectional and bidirectional flows
- Customizable colors, timing, and path styles
- Smooth animations with easing functions
- Support for multiple connected elements

## Usage Examples

### Basic Connection

```svelte
<script>
  let containerRef;
  let sourceRef;
  let targetRef;
</script>

<div bind:this={containerRef} class="relative">
  <div bind:this={sourceRef}>Source</div>
  <div bind:this={targetRef}>Target</div>
  
  <AnimatedBeam
    {containerRef}
    fromRef={sourceRef}
    toRef={targetRef}
  />
</div>
```

### Bidirectional Connection

```svelte
<script>
  let containerRef;
  let sourceRef;
  let targetRef;
</script>

<div bind:this={containerRef} class="relative">
  <div bind:this={sourceRef}>Source</div>
  <div bind:this={targetRef}>Target</div>
  
  <AnimatedBeam
    {containerRef}
    fromRef={sourceRef}
    toRef={targetRef}
    startYOffset={10}
    endYOffset={10}
    curvature={-30}
  />
  <AnimatedBeam
    {containerRef}
    fromRef={sourceRef}
    toRef={targetRef}
    startYOffset={-10}
    endYOffset={-10}
    curvature={30}
    reverse
  />
</div>
```

## Dependencies

- Svelte Motion: For animation effects
- TailwindCSS: For styling through utility classes
- ResizeObserver API: For monitoring element size changes

## Browser Compatibility

The component utilizes modern browser APIs and should work in all modern browsers including:
- Chrome, Firefox, Safari, Edge (latest versions)
- Any browser with support for SVG, ResizeObserver, and CSS transforms

## Notes

- All elements must be positioned within the same container
- The container must have `position: relative` or another non-static position value
- For best results, ensure smooth animations by avoiding rapid container resizing