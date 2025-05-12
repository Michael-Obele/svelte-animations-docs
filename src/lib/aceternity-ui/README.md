# Aceternity UI for Svelte

A collection of advanced UI components, animations, and web integrations inspired by Aceternity UI, reimplemented for Svelte.

## Overview

Aceternity UI provides a set of visually stunning, animated UI components that bring your Svelte applications to life with minimal effort. These components leverage modern CSS and JavaScript techniques to create engaging user experiences.

## Installation

```bash
# If you're using npm
npm install @svelte-animations/aceternity-ui

# If you're using pnpm
pnpm add @svelte-animations/aceternity-ui

# If you're using yarn
yarn add @svelte-animations/aceternity-ui
```

## Component Categories

### Core Components

Our core components provide the building blocks for creating engaging interfaces:

- **HeroSection** - Animated hero sections with various background effects
- **Card** - Interactive card components with hover animations
- **Navbar** - Responsive navigation bars with smooth transitions
- **Button** - Buttons with various animation styles
- **Modal** - Animated modal dialogs

### Effects and Animations

Special effects to enhance your UI:

- **BackgroundGradient** - Animated gradient backgrounds
- **MagneticEffect** - Elements that attract to cursor movement
- **ParallaxSection** - Sections with parallax scrolling effects
- **SpotlightEffect** - Dynamic spotlight following cursor
- **TextReveal** - Text with reveal animations on scroll

### Layout Components

Components for organizing your content:

- **GridLayout** - Animated grid layouts
- **MasonryGrid** - Responsive masonry grid with animations
- **StackedCards** - Cards stacked with 3D effect
- **TabsLayout** - Animated tab interfaces

## Usage Examples

### Basic Component Usage

```svelte
<script>
  import { BackgroundGradient, Card } from '$lib/aceternity-ui/components';
</script>

<BackgroundGradient>
  <Card>
    <h2>Aceternity UI Card</h2>
    <p>This card has a beautiful animated background gradient.</p>
  </Card>
</BackgroundGradient>
```

### Animated Hero Section

```svelte
<script>
  import { HeroSection } from '$lib/aceternity-ui/components';
</script>

<HeroSection
  title="Welcome to My Website"
  subtitle="Built with Svelte and Aceternity UI"
  backgroundType="particles"
  ctaText="Get Started"
  ctaLink="#features"
/>
```

### Magnetic Button Effect

```svelte
<script>
  import { MagneticButton } from '$lib/aceternity-ui/components';
</script>

<MagneticButton strength={0.5}>
  Hover Me
</MagneticButton>
```

## Component API Reference

### HeroSection

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | - | Main title text |
| subtitle | string | - | Subtitle text |
| backgroundType | 'particles' \| 'gradient' \| 'shapes' | 'gradient' | Type of animated background |
| ctaText | string | - | Call-to-action button text |
| ctaLink | string | - | Call-to-action button URL |
| darkMode | boolean | false | Enable dark mode styling |

### BackgroundGradient

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ['#4338ca', '#6366f1'] | Array of gradient colors |
| size | number | 400 | Size of the gradient in pixels |
| blur | number | 100 | Blur amount in pixels |
| interactive | boolean | true | Whether gradient responds to mouse movement |
| containerClassName | string | - | Additional classes for container |

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| hoverEffect | 'lift' \| 'glow' \| 'border' | 'lift' | Effect applied on hover |
| className | string | - | Additional CSS classes |
| padding | string | 'p-6' | Card padding (Tailwind classes) |
| bordered | boolean | false | Whether to show a border |
| elevated | boolean | false | Whether to add a shadow |

## Web Components

The `web/` directory contains specialized components for web applications:

- **WebGLBackground** - Hardware-accelerated background effects
- **IntersectionObserver** - Components for scroll-based animations
- **WebAnimations** - Utilities using the Web Animations API

## Contributing

We welcome contributions to Aceternity UI! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new components
5. Submit a pull request

## License

MIT