# Folder: /lib/indieui

This folder contains Indie UI components and utilities, providing unique interface elements and helpers for the project.

## Structure
- **allIndieUIComponents.ts**: TypeScript registry of all Indie UI components
- **components/**: Indie UI Svelte components
- **ui/**: Indie UI-specific user interface helpers

---

## Example: Indie UI Component
```svelte
<script>
  /** Indie UI prop */
  export let indie = true;
</script>
<!--
@component
A unique Indie UI component for creative interfaces.
-->
<div class="indie-ui">{#if indie}Indie UI Enabled{/if}</div>
```

---

**Explore this folder for creative and unique UI elements.**
