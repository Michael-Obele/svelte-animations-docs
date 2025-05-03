# Folder: /lib/components

This folder contains the core UI building blocks for the project, organized by type and feature. It includes reusable Svelte components for buttons, tabs, badges, separators, and more.

## Structure
- **ui/**: Main UI components (e.g., Button, Badge, Tabs, Separator, etc.)
- **dev/**: Developer utilities and helper components for building and debugging UI

---

## Example: Button Component
```svelte
<script>
  /** Button label */
  export let label = 'Click me';
</script>
<!--
@component
A reusable button component for forms and actions.
- Usage:
  ```svelte
  <Button label="Submit" />
  ```
-->
<button>{label}</button>
```

---

## Example: Tabs Component
```svelte
<script>
  /** Active tab index */
  export let active = 0;
</script>
<!--
@component
Tabs component for switching between views.
-->
<div class="tabs">...tabs UI...</div>
```

---

**All components are documented using JSDoc and @component comments for clarity and IDE/LLM usability.**
