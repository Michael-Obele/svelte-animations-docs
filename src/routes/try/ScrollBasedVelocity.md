# ScrollBasedVelocity.svelte

Animate elements based on scroll velocity.

```svelte
<script>
  export let velocity = 1;
</script>

<div class="scroll-velocity" style="transition: transform 0.3s; transform: translateY({velocity * 10}px)">
  <slot />
</div>
```

- Use the `velocity` prop to control the movement amount.
