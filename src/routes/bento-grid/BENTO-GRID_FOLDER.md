# Folder: /routes/bento-grid

This folder implements the `/bento-grid` route, showcasing a variety of interactive bento components and patterns using SvelteKit and custom UI elements.

## Structure
- **+page.svelte**: Main demo page for bento grid features and components
- **BentoCalendar.svelte**: Calendar component demo
- **BentoCard.svelte**: Card component for bento layout
- **BentoCommand.svelte**: Command palette demo
- **BentoGrid.svelte**: Grid layout container
- **BentoMarquee.svelte**: Animated marquee demo
- **BentoResizable.svelte**: Resizable pane group demo

---

## +page.svelte
```svelte
<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { Calendar, TextSearch, ReceiptText, CodeXml } from "lucide-svelte";
  // ...imports for all bento demo components and raw code
</script>
// ...feature definitions and page logic
```
**Purpose:** Main entry point for the `/bento-grid` route. Imports and demonstrates all bento components, showing their code and features interactively.

---

## BentoCalendar.svelte
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
**Purpose:** Renders a styled calendar using the user's local timezone.

---

## BentoCard.svelte
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

<div id={name} class={cn(
  "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
  // ...styling omitted for brevity
  className
)}>
  <div>
    <svelte:component this={background} />
  </div>
  <div class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
    <svelte:component this={Icon} class="h-12 w-12 ... group-hover:scale-75" />
    <h3 class="text-xl font-semibold ...">{name}</h3>
    <p class="max-w-lg text-neutral-400">{description}</p>
  </div>
  <div class="pointer-events-none absolute bottom-0 flex w-full ... group-hover:opacity-100">
    <Button variant="ghost" size="sm" class="pointer-events-auto">
      <a {href} class='flex justify-center items-center'>
        {cta}
        <svg ... />
      </a>
    </Button>
  </div>
</div>
```
**Purpose:** A flexible card for bento layouts, supporting icons, backgrounds, and actions.

---

## BentoCommand.svelte
```svelte
<script>
  import * as Command from "$lib/components/ui/command/index";
</script>

<Command.Root ...>
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
**Purpose:** Demonstrates a command palette UI pattern.

---

## BentoGrid.svelte
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
**Purpose:** Provides a responsive grid layout for bento cards and other components.

---

## BentoMarquee.svelte
```svelte
<script>
  import Marquee from "$lib/magicui/components/Marquee/Marquee.svelte";
  import { cn } from "$lib/utils";
  const files = [/* ...demo file objects... */];
</script>

<Marquee pauseOnHover ...>
  {#each files as f, i}
    <figure ...>
      <div class="flex flex-row items-center gap-2">
        <div class="flex flex-col">
          <figcaption class="text-sm font-medium dark:text-white ">{f.name}</figcaption>
        </div>
      </div>
      <blockquote class="mt-2 text-xs">{f.body}</blockquote>
    </figure>
  {/each}
</Marquee>
```
**Purpose:** Animated horizontal scrolling demo for file cards.

---

## BentoResizable.svelte
```svelte
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="horizontal" ...>
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
**Purpose:** Demonstrates nested resizable panes for interactive layouts.

---

**This folder is a showcase of bento UI patterns, grid layouts, and interactive component demos using SvelteKit.**
