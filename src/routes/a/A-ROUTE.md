# /a Route Documentation

This doc contains all code for the /a route and its dynamic subpages, with inline code for LLMs. Reusable components are referenced from `/routes/components/`.

---

## +layout.svelte
```svelte
<script>
  import AceternitySidebar from "$lib/aceternity-ui/web/AceternitySidebar.svelte";
</script>
<AceternitySidebar>
  <slot></slot>
</AceternitySidebar>
```

## +page.svelte
```svelte
coding is fun
```

---

## components/[componentID]/+page.svelte
```svelte
<script>
  import { page } from "$app/stores";
  import * as Tabs from "$lib/components/ui/tabs/index";
  import { allAceternityUI } from "$lib/aceternity-ui/components/allAceternityUI";
  import Badge from "../components/Badge.md";
  import Separator from "../components/Separator.md";
  import ComponentView from "../components/ComponentView.md";
  import CodeBlock from "../components/CodeBlock.md";
  import GridPattern from "$lib/magicui/backgrounds/GridPattern/GridPattern.svelte";
  import { cn } from "$lib/utils";

  $: routeID = $page.params.componentID;
  $: comp = allAceternityUI.filter((c) => c.id === routeID)[0];
</script>
<svelte:head>
  <title>{comp.title} · Svelte Aceternity UI</title>
  <meta name="description" content={comp.desc} />
  <meta property="og:title" content={comp.title + "· Svelte"} />
  <meta property="og:description" content={comp.desc} />
  <meta property="og:site_name" content="Svelte Tailwind Components" />
  <meta property="og:url" content="https://animation-svelte.vercel.app" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={comp.title + "· Svelte"} />
  <meta name="twitter:description" content={comp.desc} />
  <meta name="twitter:site" content="@Sikandar_Bhide" />
</svelte:head>
<div class="mx-px md:mx-5">
  {#key comp}
    <div class="space-y-5 mb-20">
      <div>
        <h1 class="text-2xl font-bold mt-4 md:text-4xl capitalize mb-1">
          {comp.title}
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          {comp.desc}
        </p>
        {#if comp?.tags}
          <div class="flex gap-2 items-center">
            {#each comp.tags as item}
              <Badge variant="outline" class="py-1 px-3">{item}</Badge>
            {/each}
          </div>
        {/if}
      </div>
      <!-- ...rest of the component rendering logic... -->
    </div>
  {/key}
</div>
```

---

## docs/[docsID]/+page.svelte
```svelte
<script>
  import { page } from "$app/stores";
  import { allInstallations } from "$lib/aceternity-ui/docs/allinstallations";
  import CodeBlock from "../components/CodeBlock.md";
  $: routeID = $page.params.docsID;
  $: docs = allInstallations.filter((doc) => doc.id === routeID)[0];
</script>
<svelte:head>
  <title>{docs.title} · Svelte</title>
  <meta name="description" content={docs?.desc} />
  <meta property="og:title" content={docs?.title + "· Svelte"} />
  <meta property="og:description" content={docs?.desc} />
  <meta property="og:site_name" content="Svelte Tailwind Components" />
  <meta property="og:url" content="https://animation-svelte.vercel.app" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={docs?.title + "· Svelte"} />
  <meta name="twitter:description" content={docs?.desc} />
  <meta name="twitter:site" content="@Sikandar_Bhide" />
</svelte:head>
<div class="my-0 md:my-4 mx-px md:mx-5">
  {#key docs}
    <div class="space-y-5">
      <div>
        <h1 class="text-2xl font-bold mt-4 md:text-4xl capitalize mb-2">
          {docs.title}
        </h1>
        <p class="dark:text-muted-foreground md:text-lg">
          {docs.desc}
        </p>
      </div>
      <div>
        {#each docs.allcode as detail}
          <div class="mb-6 rounded-md">
            <div class="mb-4">
              <h2 class="text-2xl font-semibold mb-1">{detail.title}</h2>
              {#if detail.desc}
                <p class="dark:text-muted-foreground">{detail.desc}</p>
              {/if}
            </div>
            <CodeBlock code={detail.code} lang={detail.lang} fileName={detail.fileName} />
          </div>
        {/each}
      </div>
    </div>
  {/key}
</div>
```

---

For details on reusable components, see:
- [Badge](../components/Badge.md)
- [Separator](../components/Separator.md)
- [ComponentView](../components/ComponentView.md)
- [CodeBlock](../components/CodeBlock.md)

All code is shown inline or referenced for LLMs. No `.svelte` file access required.
