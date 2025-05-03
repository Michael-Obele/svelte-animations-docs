# ComponentView Component

Displays a live preview of a Svelte component and its code.

```svelte
<script>
  export let code = "";
  export let title = "";
</script>
<div class="component-view">
  <h2>{title}</h2>
  <div class="preview">
    <slot />
  </div>
  <pre><code>{code}</code></pre>
</div>
```

- `code`: the code to display
- `title`: the title of the component example
- Use `<ComponentView code={code} title={title}>...</ComponentView>`
