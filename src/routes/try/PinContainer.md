# PinContainer.svelte

A container for pinning UI elements, often used for cards or floating panels.

```svelte
<script>
  export let title = "";
  export let href = "";
</script>

<a class="pin-container" href={href} target="_blank">
  <div class="pin-title">{title}</div>
  <slot />
</a>

<style>
.pin-container {
  display: block;
  border: 2px solid #aaf;
  border-radius: 1rem;
  padding: 1rem;
  background: #f8faff;
  box-shadow: 0 2px 12px #aac3;
  text-decoration: none;
}
.pin-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 0.5em;
}
</style>
```
