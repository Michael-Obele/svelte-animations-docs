# Folder: /lib/framer-motion

This folder provides Framer Motion-style animation utilities and components for Svelte, enabling advanced motion and transitions.

## Structure
- **assets/**: Animation-related assets
- **comp/**: Example components using framer-motion patterns
- **layouts/**: Layout components for animated UIs
- **Framer.md**: Markdown documentation for Framer Motion integration
- **MotionsLearnings.ts**: TypeScript utilities and learnings for animation

---

## Example: Animated Layout Component
```svelte
<script>
  /** Animation state */
  let open = $state(false);
</script>
<!--
@component
Animated layout using Framer Motion-style transitions.
-->
<div class="motion-layout" on:click={() => open = !open}>
  <slot />
</div>
```

---

**Use this folder for advanced motion and animation integration in Svelte apps.**
