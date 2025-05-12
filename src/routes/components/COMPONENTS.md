# `/components` Folder Documentation

This folder contains reusable UI components used throughout the Svelte Animations documentation project. These components are designed to be simple, composable, and consistent across the application.

## Overview

The components in this folder serve as building blocks for creating documentation pages, examples, and UI patterns. They are primarily referenced from dynamic routes and provide consistent styling and behavior.

## Available Components

### Badge
A small visual indicator used for labeling, categorizing, or highlighting items.

```svelte
<Badge variant="outline">Component</Badge>
```

### CodeBlock
Displays formatted code snippets with syntax highlighting, filename labels, and proper formatting.

```svelte
<CodeBlock 
  code={sourceCode} 
  lang="svelte" 
  fileName="Example.svelte" 
/>
```

### ComponentView
Creates a standardized container for displaying live component previews with optional backgrounds.

```svelte
<ComponentView>
  <MyComponent />
</ComponentView>
```

### Separator
A horizontal rule for visually separating content sections.

```svelte
<Separator />
```

## Usage Pattern

These components are typically imported and used within page or layout components:

```svelte
<script>
  import Badge from "../components/Badge.svelte";
  import CodeBlock from "../components/CodeBlock.svelte";
  import ComponentView from "../components/ComponentView.svelte";
  import Separator from "../components/Separator.svelte";
  
  // Component logic
</script>

<h1>Component Documentation</h1>
<Badge variant="outline">UI Component</Badge>

<Separator />

<ComponentView>
  <!-- Component preview -->
</ComponentView>

<CodeBlock code={exampleCode} lang="svelte" fileName="Example.svelte" />
```

## Implementation Details

### Badge Component
Renders a styled span element with customizable variant and additional classes.

**Props:**
- `variant`: Style variant (default, outline, etc.)
- `class`: Additional CSS classes

### CodeBlock Component
Renders code snippets with syntax highlighting and proper formatting.

**Props:**
- `code`: Source code string to display
- `lang`: Programming language for syntax highlighting
- `fileName`: Optional filename to display
- `class`: Additional CSS classes

### ComponentView Component
Creates a container for displaying live component previews.

**Props:**
- `class`: Additional CSS classes

### Separator Component
A simple styled horizontal rule for content separation.

## Best Practices

1. **Consistent Usage**: Use these components consistently throughout the documentation for visual coherence.

2. **Composition**: Combine these basic components to create more complex UI patterns.

3. **Documentation First**: These components are primarily designed for documentation purposes and may need adaptation for production use.

4. **Markdown Integration**: Components are documented in individual Markdown files for easy reference.

5. **Minimal Dependencies**: These components have minimal external dependencies to ensure simplicity and maintainability.

## File Organization

Each component has its own documentation file:
- `Badge.md`: Badge component documentation
- `CodeBlock.md`: CodeBlock component documentation
- `ComponentView.md`: ComponentView component documentation
- `Separator.md`: Separator component documentation

These markdown files provide detailed information about each component's props, usage examples, and implementation details.