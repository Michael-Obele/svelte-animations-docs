# Bento Grid Components

This folder contains Svelte components for the Bento Grid UI. Below you will find the import statements and full source code for each component, ready to use in Svelte 5 projects.

---

## BentoCalendar.svelte

**Import:**
```svelte
import BentoCalendar from "./BentoCalendar.svelte";
```

**Source:**
```svelte
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = today(getLocalTimeZone());
</script>

<Calendar
  bind:value
  class="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
/>
```

---

## BentoCard.svelte

**Import:**
```svelte
import BentoCard from "./BentoCard.svelte";
```

**Source:**
```svelte
<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { cn } from "$lib/utils";
  let className: any = "";
  export { className as class };
  export let name;
  export let background;
  export let Icon; // lucide Icon
  export let description;
  export let href;
  export let cta;
</script>

<div
  id={name}
  class={cn(
    "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
    // light styles
    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
    // dark styles
    "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    className
  )}
>
  <div>
    <svelte:component this={background} />
  </div>
  <div
    class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10"
  >
    <svelte:component
      this={Icon}
      class="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"
    />

    <h3 class="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
      {name}
    </h3>
    <p class="max-w-lg text-neutral-400">{description}</p>
  </div>

  <div
    class={cn(
      "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
    )}
  >
    <Button variant="ghost" size="sm" class="pointer-events-auto">
      <a {href} class='flex justify-center items-center'>
        {cta}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ml-2 h-4 w-4"
          ><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
        >
      </a>
    </Button>
  </div>
  <div
    class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"
  />
</div>
```

---

## BentoCommand.svelte

**Import:**
```svelte
import BentoCommand from "./BentoCommand.svelte";
```

**Source:**
```svelte
<script>
  import * as Command from "$lib/components/ui/command/index";
</script>

<Command.Root
  class="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10"
>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>Calendar</Command.Item>
      <Command.Item>Search Emoji</Command.Item>
      <Command.Item>Calculator</Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>Profile</Command.Item>
      <Command.Item>Billing</Command.Item>
      <Command.Item>Settings</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>
```

---

## BentoGrid.svelte

**Import:**
```svelte
import BentoGrid from "./BentoGrid.svelte";
```

**Source:**
```svelte
<script lang="ts">
  import { cn } from "$lib/utils";
  let className: any = "";
  export { className as class };
</script>

<div class={cn("grid w-full auto-rows-[20rem] grid-cols-3 gap-4", className)}>
  <slot></slot>
</div>
```

---

## BentoMarquee.svelte

**Import:**
```svelte
import BentoMarquee from "./BentoMarquee.svelte";
```

**Source:**
```svelte
<script>
  import Marquee from "$lib/magicui/components/Marquee/Marquee.svelte";
  import { cn } from "$lib/utils";
  const files = [
    {
      name: "bitcoin.pdf",
      body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
    },
    {
      name: "finances.xlsx",
      body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
    },
    {
      name: "logo.svg",
      body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
    },
    {
      name: "keys.gpg",
      body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
    },
    {
      name: "seed.txt",
      body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
    },
  ];
</script>

<Marquee
  pauseOnHover
  class="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
>
  {#each files as f, i}
    <figure
      id={`item-${i}`}
      class={cn(
        "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
      )}
    >
      <div class="flex flex-row items-center gap-2">
        <div class="flex flex-col">
          <figcaption class="text-sm font-medium dark:text-white ">
            {f.name}
          </figcaption>
        </div>
      </div>
      <blockquote class="mt-2 text-xs">{f.body}</blockquote>
    </figure>
  {/each}
</Marquee>
```

---

## BentoResizable.svelte

**Import:**
```svelte
import BentoResizable from "./BentoResizable.svelte";
```

**Source:**
```svelte
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
  // class="max-w-md rounded-lg border"
</script>

<Resizable.PaneGroup
  direction="horizontal"
  class="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
>
  <Resizable.Pane defaultSize={50}>
    <div class="flex h-[200px] items-center justify-center p-6">
      <span class="font-semibold">Sveltekit</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize={50}>
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane defaultSize={25}>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">is </span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle />
      <Resizable.Pane defaultSize={75}>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Fun</span>
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

---

For usage examples and more, see the `+page.svelte` in this folder.
