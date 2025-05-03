# SVGCode.svelte

Embed and display SVG code as a component.

```svelte
<script>
  export let svg = "";
</script>

<div class="svg-code" bind:this={el} {@html svg}></div>

<style>
.svg-code {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
}
</style>
```
