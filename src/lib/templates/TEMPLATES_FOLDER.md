# Folder: /lib/templates

This folder contains template files and starter layouts for quickly scaffolding new pages or components.

## Structure
- **Template Svelte files:** Ready-to-use Svelte templates for common UI and layout patterns
- **Other supporting files:** Helpers for template usage

---

## Example: Svelte Page Template
```svelte
<script>
  /** Page title */
  export let title = 'Template Page';
</script>
<!--
@component
A starter template for new Svelte pages.
-->
<main>
  <h1>{title}</h1>
  <slot />
</main>
```

---

**Use this folder to kickstart new features with best-practice Svelte templates.**
