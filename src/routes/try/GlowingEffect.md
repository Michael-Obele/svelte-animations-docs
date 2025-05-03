# GlowingEffect.svelte

A glowing UI effect component for visual emphasis.

```svelte
<script>
  // Add any props or logic here if needed
</script>

<div class="glow-effect">
  <slot />
</div>

<style>
.glow-effect {
  box-shadow: 0 0 20px 5px rgba(100, 100, 255, 0.6);
  border-radius: 1rem;
  padding: 1rem;
}
</style>
```

- Wrap content in `<GlowingEffect>...</GlowingEffect>` for a glowing highlight.
