# PinPerspective.svelte

A 3D perspective pin container for cards or panels.

```svelte
<script>
  export let perspective = 800;
</script>

<div class="pin-perspective" style="perspective: {perspective}px;">
  <slot />
</div>

<style>
.pin-perspective {
  perspective-origin: 50% 50%;
}
</style>
```
