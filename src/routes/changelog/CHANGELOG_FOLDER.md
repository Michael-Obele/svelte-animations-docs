# Folder: /routes/changelog

This folder implements the `/changelog` route, providing an overview and history of changes and new features in the project.

## Structure
- **+page.svelte**: Main changelog and overview page
- **CHANGELOG.md**: Markdown file containing a detailed changelog

---

## +page.svelte
```svelte
<script>
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { marked } from "marked";
  import GithubSvg from "$lib/svg/web/github.svg";
  let markdown = `
  ### Date - 26 Dec 2024 - Added New Magic UI Components
  - Device Mockups for Iphone, Browser.
  - Added Rainbow, Ripple, Interactive Hover Button.
  - Added **Scratch To Reveal** Component.
  ...
  ### Date - 25 July 2024
  - Added [Svelte Globe](https://animation-svelte.vercel.app/magic/globe) Component from Magic UI
  - Update [Ripple Effect](https://animation-svelte.vercel.app/magic/ripple) Component from Magic UI
  - Added [Dock Menu](https://animation-svelte.vercel.app/magic/dock) Component from Magic UI
  - Added [Retro Grid](https://animation-svelte.vercel.app/magic/retro-grid) Component from Magic UI
  `;
</script>

<main class="my-8 xl:my-8 space-y-6 md:space-y-10 mx-4 sm:mx-6 md:mx-[138px]">
  <section class="flex flex-col">
    <div class="space-y-2">
      <h1 class="text-3xl md:text-4xl font-bold text-primary">Changelog & Overview</h1>
      <p class=" font-normal text-neutral-500">Svelte Animation Provides Free Components, <span class="text-primary">Copy</span> and <span class="text-primary">Paste</span> to illuminate your applications with elegance.</p>
      <Separator />
    </div>
    <div class="max-w-full prose-img:size-4 prose-img:inline-block prose dark:prose-invert my-6 prose-hr:my-3 prose-img:mx-0 prose-img:mb-0 prose-img:-mt-1 prose-a:underline-offset-2">
      {#key markdown}
        {@html marked(markdown)}
      {/key}
    </div>
  </section>
</main>
```
**Purpose:** Renders the changelog as HTML using the `marked` library and provides a styled overview.

---

## CHANGELOG.md
Standard markdown changelog file, referenced by the Svelte page and for direct reading.

---

**This folder demonstrates how to provide a project changelog and overview using both SvelteKit pages and markdown.**
