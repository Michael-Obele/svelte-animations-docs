# CodeBlock Component

Displays formatted code snippets with syntax highlighting.

```svelte
<script>
  export let code = "";
  export let lang = "";
  export let fileName = "";
</script>
<div class="code-block">
  {#if fileName}
    <div class="file-name">{fileName}</div>
  {/if}
  <pre><code class={lang}>{code}</code></pre>
</div>
```

- `code`: code string to display
- `lang`: language for syntax highlighting (e.g., "js", "ts", "svelte")
- `fileName`: optional file name label
