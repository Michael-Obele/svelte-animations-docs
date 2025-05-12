# Try Route Documentation (Part 2)

## Advanced Components

This document continues the documentation from TRY-DOCS-PART1.md, covering additional experimental components in the `/try` route.

### PinContainer & PinPerspective

3D perspective container components for creating depth effects on UI elements.

**Props (PinContainer):**
- `title`: Title text to display
- `href`: Link destination
- `className`: CSS classes for styling
- `containerClassName`: CSS classes for the container

**Props (PinPerspective):**
- `title`: Title text to display 
- `href`: Link destination

```svelte
<PinContainer title="/ui.example.com" href="https://example.com">
  <div class="flex flex-col p-4 tracking-tight text-white w-[20rem] h-[20rem]">
    <h3 class="font-bold text-base">Example UI</h3>
    <div class="text-base font-normal">
      <span class="text-gray-500">Customizable components</span>
    </div>
    <div class="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 to-blue-500" />
  </div>
</PinContainer>
```

### ScrollBasedVelocity

Creates infinitely scrolling text elements that respond to scroll velocity.

**Props:**
- `text`: Text content to display (default: "Hello World")
- `default_velocity`: Base movement speed (default: 5)
- `className`: CSS classes for styling

### SVG Animation Components

#### SVGCode & Svgtry1

Components for SVG text animations with hover effects.

**Props:**
- `text`: Text content to animate
- `duration`: Animation duration

```svelte
<SVGCode text="SVELTE" duration={2} />
```

### Direction-based Components

#### DirectionHover

Creates direction-sensitive hover effects for images or cards.

**Props:**
- `imageUrl`: URL of the background image
- `children`: Content to display
- `childrenClassName`: CSS classes for children
- `imageClassName`: CSS classes for image
- `className`: CSS classes for container

```svelte
<DirectionHover>
  <p class="font-bold text-xl">In the mountains</p>
  <p class="font-normal text-sm">$1299 / night</p>
</DirectionHover>
```

### Layout Components

#### LayoutGrid

A dynamic layout grid for creating magazine-style layouts with cards.

Uses components like:
- `SkeletonOne`, `SkeletonTwo`, `SkeletonThree`, `SkeletonFour`: Content templates

```svelte
<LayoutGrid cards={[
  {
    id: 1,
    content: SkeletonOne,
    class: "md:col-span-2",
    thumbnail: "image-url.jpg"
  },
  // More cards...
]} />
```

### Dock and Sidebar Components

#### AcetDockExample

A macOS-style floating dock UI component.

#### SidebarBody & SidebarLink

Collapsible sidebar navigation components.

**Props (SidebarLink):**
- `link`: Object containing label, href, and icon

## Specialized Routes

The `/try` folder contains several specialized subfolders demonstrating focused components:

### `/try/card`

Showcases the `FeatureDemoCard` component from Aceternity UI.

### `/try/direction`

Demonstrates direction-sensitive hover effects with the `DirectionHover` component.

### `/try/dock`

Shows a floating dock UI inspired by macOS.

### `/try/fp` (Follow Pointer)

Demonstrates cards that follow pointer movements.

### `/try/hover`

Contains components with advanced hover effects:
- `PlaceHolderVanish`: Input with vanishing placeholder animation
- `HoverBorderGradient`: Button with animated border gradient

### `/try/layout`

Demonstrates magazine-style layout grid with various content skeletons.

### `/try/lens`

Shows the lens/magnifier effect in action.

### `/try/sidebar`

Demonstrates collapsible sidebar navigation.

### `/try/svg`

Shows SVG-based animations and effects.

### `/try/velocity`

Demonstrates scroll-based velocity animations.

## Using These Components

Most components are designed to be imported and used directly in your Svelte applications. The experimental nature of these components means they may require additional customization for production use.

```svelte
import ScrollBasedVelocity from "$lib/path-to-component/ScrollBasedVelocity.svelte";

// In your component
<ScrollBasedVelocity text="This text will scroll infinitely" default_velocity={3} />
```

## Browser Compatibility

These experimental components utilize modern browser APIs and may require:
- Modern browsers with support for CSS Grid
- Support for SVG animations
- JavaScript Intersection Observer API
- CSS variables and custom properties

For maximum compatibility, consider providing fallbacks for browsers that don't support these features.