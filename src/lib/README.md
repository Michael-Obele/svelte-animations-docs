# Svelte Animations Documentation - Library (`/src/lib`)

This directory contains all the reusable components, utilities, and animation libraries for the Svelte Animations Documentation project. These libraries provide a comprehensive set of UI components, animation utilities, and examples to help you build beautiful and interactive Svelte applications.

## Directory Structure

```
/lib
├── aceternity-ui/     # Advanced UI components and web integrations
├── carbon/            # Carbon-style components
├── components/        # Core UI building blocks
├── examples/          # Example components and demo code
├── framer-motion/     # Framer Motion-style animation utilities
├── indieui/           # Indie UI components and utilities
└── luxe/              # Luxe UI components for elegant interfaces
```

## Library Overview

### `/aceternity-ui`

Advanced UI components, widgets, and web integrations featuring modern design patterns and interactions.

- **components/**: All Aceternity UI Svelte components
- **docs/**: Documentation and installation guides
- **web/**: Web-specific widgets and helpers

### `/carbon`

Carbon-inspired components implementing IBM's Carbon Design System principles.

- **Carbon.svelte**: Main Carbon component
- **CarbonLuxe.svelte**: Carbon component with Luxe enhancements

### `/components`

Core UI building blocks for the project, organized by type and feature.

- **ui/**: Main UI components (Button, Badge, Tabs, Separator, etc.)
- **dev/**: Developer utilities and helper components

### `/examples`

Example Svelte components and demo code for learning and experimentation.

- **comp/**: Example components demonstrating advanced Svelte features
- **AnimationsExamples.ts**: TypeScript file with animation demo logic
- **Examples.md**: Markdown summary of available examples

### `/framer-motion`

Framer Motion-style animation utilities and components for Svelte, enabling advanced motion and transitions.

- **assets/**: Animation-related assets
- **comp/**: Example components using framer-motion patterns
- **layouts/**: Layout components for animated UIs
- **MotionsLearnings.ts**: TypeScript utilities for animation

### `/indieui`

Indie UI components and utilities, providing unique interface elements.

- **allIndieUIComponents.ts**: TypeScript registry of all Indie UI components
- **components/**: Indie UI Svelte components
- **ui/**: Indie UI-specific user interface helpers

### `/luxe`

Luxe UI components, advanced layouts, and supporting modules for building elegant interfaces.

- **animatedTabs/**: Animated tab components
- **badge/**: Badge UI components
- **buttons/**: Button variants and advanced button UIs
- **cards/**: Card layouts and animated card components
- **components/**: General Luxe UI components
- **dock/**: Dock UI elements
- **dropdown/**: Dropdown menus
- **inputs/**: Input field components
- **text/**: Text and typography components

## Usage Guidelines

### Importing Components

You can import components using the `$lib` alias:

```svelte
<script>
  // Import from specific libraries
  import Button from '$lib/components/ui/Button.svelte';
  import AnimatedTabs from '$lib/luxe/animatedTabs/AnimatedTabs.svelte';
  import AceternityHero from '$lib/aceternity-ui/components/Hero.svelte';
</script>
```

### Component Documentation

Each component should have JSDoc comments and `@component` documentation for clarity:

```svelte
<script>
  /**
   * Button variant style
   * @type {'primary' | 'secondary' | 'danger'}
   */
  export let variant = 'primary';
</script>
<!--
@component
A reusable button component for forms and actions.
- Usage:
  ```svelte
  <Button variant="primary">Submit</Button>
  ```
-->
```

### Animation Examples

For animation examples, refer to the `/examples` directory and the animation-specific libraries:

- `framer-motion` for complex motion sequences
- `luxe/animatedTabs` for tab transitions
- `aceternity-ui/components` for advanced UI animations

## Contributing

When adding new components:

1. Place them in the appropriate library folder
2. Add comprehensive JSDoc comments
3. Include usage examples
4. Update TypeScript definitions if applicable

## Related Resources

- Check individual folder README files for more specific documentation
- See `EXAMPLES_FOLDER.md` in the examples directory for learning resources
- Refer to `Framer.md` for Framer Motion implementation details

---

*This documentation structure is designed to help developers navigate and utilize the various UI and animation libraries in this project.*