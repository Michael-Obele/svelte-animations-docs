# direction/+page.svelte

Demonstrates the DirectionHover interactive effect.

```svelte
<script>
  import DirectionHover from "./DirectionHover.svelte";
</script>

<div class="h-[40rem] relative flex items-center justify-center">
  <DirectionHover >
    <p class="font-bold text-xl">In the mountains</p>
    <p class="font-normal text-sm">$1299 / night</p>
  </DirectionHover>
</div>
```

- Shows a card with a direction-sensitive hover animation.
