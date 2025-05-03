# Badge Component

A reusable badge for labeling or highlighting items.

```svelte
<script>
  export let variant = "default";
  export let class = "";
</script>
<span class={`badge badge-${variant} ${class}`}>
  <slot />
</span>
```

- `variant`: Style (e.g. default, outline)
- `class`: Extra CSS classes

Usage: `<Badge variant="outline">Label</Badge>`
