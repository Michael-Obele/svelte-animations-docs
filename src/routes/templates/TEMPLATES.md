# Templates Route Documentation

This folder contains Svelte routes and components for various website templates, including portfolio, startup, and SaaS templates.

## Route Layout (`+layout.svelte`)
```svelte
<script lang="ts">
import MagicSidebar from "$lib/magicui/components/MagicSidebar/MagicSidebar.svelte";

type compNavs = {
  id: number;
  heading: string;
  sub: { name: string; link: string; isNew?: boolean }[];
};
let componentsNav: compNavs[] = [
  {
    id: 1,
    heading: "Templates",
    sub: [
      { name: "Developer Portfolio", link: "/templates/developer-portfolio" },
      { name: "Startup Template", link: "/templates/startup-template" },
      { name: "SAAS Template", link: "/templates/saas-template", isNew: true },
    ],
  },
];
</script>
<MagicSidebar {componentsNav}>
  <slot></slot>
</MagicSidebar>
```

## Main Page (`+page.svelte`)
```svelte
<script></script>
<div class='flex justify-center items-center my-10'>
  <h1>Building Stage</h1>
</div>
```

## SaaS Template Example (`saas-template/+page.svelte`)
```svelte
<script>
import * as Breadcrumb from "$lib/components/ui/breadcrumb/index";
import Button from "$lib/components/ui/button/button.svelte";
import Badge from "$lib/components/ui/badge/badge.svelte";
import Separator from "$lib/components/ui/separator/separator.svelte";
import RainbowButton from "$lib/magicui/buttons/rainbow/RainbowButton.svelte";
import SubHeading from "./SubHeading.svelte";

let features = [
  "Save 100+ hours of work",
  "1x Landing Page with 10+ sections",
  "Dark mode support",
  "100% Mobile responsive",
  "SEO Optimized",
  "Scroll Animations & Micro Interactions",
  "Global config for text, images and more",
  "Get Github Repo Access",
  "Deploy live to vercel",
];
let page_sectios = [
  "Header", "Hero", "Logos", "Problem", "Bento Features", "Features", "Testimonial", "Pricing", "FAQ", "CTA", "Footer"
];
</script>
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page class="font-medium">Saas Template</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
<h1>SAAS Template</h1>
<p>The Ultimate Landing Page for your Startup.</p>
<Separator />
<SubHeading title="What is this?">
  <p>This is a landing page template for a SaaS product. The template is built with Svelte 5, TailwindCSS V4, and Shadcn Svelte.</p>
</SubHeading>
<SubHeading title="Who is this for?">
  <p>This template is perfect for startups, small businesses, and entrepreneurs looking to create a professional landing page for their SaaS product.</p>
</SubHeading>
<SubHeading title="What's included?">
  <ul>
    {#each features as feature}
      <li>{feature}</li>
    {/each}
  </ul>
  <ul>
    {#each page_sectios as section}
      <li>{section}</li>
    {/each}
  </ul>
</SubHeading>
<SubHeading title="Tech Stack">
  <ul>
    <li>Sveltekit v2</li>
    <li>TailwindCSS v4</li>
    <li>Shadcn Svelte</li>
    <li>Svelte Animations</li>
  </ul>
</SubHeading>
```

## SubHeading Component (`saas-template/SubHeading.svelte`)
```svelte
<script>
import Separator from "$lib/components/ui/separator/separator.svelte";
export let title = "What is this?";
</script>
<div>
  <h2>{title}</h2>
  <slot />
</div>
<Separator />
```

---
All code is shown inline for LLMs that cannot read Svelte files. Each template is modular and imports UI components from `/src/lib`.
