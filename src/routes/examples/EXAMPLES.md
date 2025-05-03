# Examples

This folder contains example layouts and pages. Below is the Svelte 5 import code and the full source for each relevant file.

---

## +layout.svelte

**Import:**
```svelte
// This is a SvelteKit layout file, imported automatically by the router.
```

**Source:**
```svelte
<script>
  import MainSidebar from "$lib/components/dev/tags/MainSidebar.svelte";
  import SideNav from "$lib/components/dev/tags/SideNav.svelte";
  import { animationExamples } from "$lib/examples/AnimationsExamples";
</script>

<MainSidebar>
  <slot></slot>
</MainSidebar>

<!-- <SideNav examplesList={animationExamples}>
  <slot></slot>
</SideNav> -->
```

---

## +page.svelte

**Import:**
```svelte
// This is a SvelteKit page file, imported automatically by the router.
```

**Source:**
```svelte
<script>
  import HeadingOne from "$lib/components/dev/tags/HeadingOne.svelte";
  import Para from "$lib/components/dev/tags/Para.svelte";
</script>

<svelte:head>
  <title>Svelte Animation Examples</title>
  <meta name="description" content="Svelte Animation Examples" />
</svelte:head>
```

---

For more examples, explore the `[exampleID]` subdirectory in this folder.
