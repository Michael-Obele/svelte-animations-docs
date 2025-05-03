# Lens.svelte

A lens/magnifier UI effect.

```svelte
<script>
  export let size = 100;
</script>

<div class="lens" style="width: {size}px; height: {size}px; border-radius: 50%; box-shadow: 0 0 10px #0003;">
  <slot />
</div>
```

- Use the `size` prop to control the diameter of the lens.
