# Main Page (+page.svelte)

This is the main landing page for the `/try` route. It demonstrates the use of the AuroraText animation component.

```svelte
<script>
  import AuroraText from "$lib/magicui/text-animations/AuroraText/AuroraText.svelte";
</script>

<div class="h-screen w-full flex items-center justify-center ">
  <h1 class="text-4xl font-bold tracking-tighter md:text-5xl lg:text-9xl">
    Ship <AuroraText class='pr-3'>Svelte</AuroraText>
  </h1>
</div>
```

- Uses the `AuroraText` animated text component for a glowing effect on the word "Svelte".
- Layout is centered and responsive.
