# LineShadowText.svelte

Animated text with a line shadow effect.

```svelte
<script>
  export let text = "Shadow Text";
</script>

<span class="line-shadow-text">{text}</span>

<style>
.line-shadow-text {
  text-shadow: 2px 2px 8px #8888ff, 0 2px 0 #333;
  font-weight: bold;
}
</style>
```
