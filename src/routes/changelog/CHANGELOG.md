# Changelog

This folder contains the changelog page for the project. Below is the Svelte 5 import code and the full source for the page file.

---

## +page.svelte

**Import:**
```svelte
// This is a SvelteKit page file, imported automatically by the router.
```

**Source:**
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

  ### Date - 18 August 2024
  - Added [Particles Component](https://animation-svelte.vercel.app/magic/particles) from Magic UI
  - Added [Cool Mode](https://animation-svelte.vercel.app/magic/cool-mode) from Magic UI
  - Added [Shine Border](https://animation-svelte.vercel.app/magic/shine-border) from Magic UI
  - Added [Magic Card](https://animation-svelte.vercel.app/magic/magic-card) from Magic UI
  - Added [Encrypt Button](https://animation-svelte.vercel.app/examples/11) from Hover.dev

  ### Date - 1 August 2024
  - Added [Word Rotate](https://animation-svelte.vercel.app/magic/word-rotate) Component from Magic UI
  - Added [Blur In](https://animation-svelte.vercel.app/magic/blur-in) Component from Magic UI
  - Added [Pulsating Button](https://animation-svelte.vercel.app/magic/pulsating-button) Component from Magic UI
  - Added [Animation Subscribe Button](https://animation-svelte.vercel.app/magic/animated-subscribe) Component from Magic UI
  ---
   ### Date - 28 July 2024
   - Launch [Startup Template](https://startup-sve.vercel.app) for SvelteKit, Inspired by Magic UI. ![](${GithubSvg}) [Github](https://github.com/SikandarJODD/startup-template)
   - Launch [Developer Portfolio](https://portfolio-sve.vercel.app) Template, built with SvelteKit and Svelte Animations. ![](${GithubSvg}) [Github](https://github.com/SikandarJODD/portfolio-template)
  ---
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
      <h1 class="text-3xl md:text-4xl font-bold text-primary">
        Changelog & Overview
      </h1>
      <p class=" font-normal text-neutral-500">
        Svelte Animation Provides Free Components, <span class="text-primary"
          >Copy</span
        >
        and <span class="text-primary">Paste</span> to illuminate your applications
        with elegance.
      </p>
      <Separator />
    </div>
    <div
      class="max-w-full prose-img:size-4 prose-img:inline-block prose dark:prose-invert my-6 prose-hr:my-3 prose-img:mx-0 prose-img:mb-0 prose-img:-mt-1 prose-a:underline-offset-2"
    >
      {#key markdown}
        {@html marked(markdown)}
      {/key}
    </div>
  </section>
</main>
```
