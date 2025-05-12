```markdown
# Folder: /lib/aceternity-ui/components/timeline

This folder contains the Svelte implementation of the **Timeline** component, designed to display a sequence of events or items along a vertical axis, with an animated line indicating scroll progress through the timeline.

## Core Components

1.  **`Timeline.svelte`** (Main Component):
    *   The primary component that renders the timeline structure and its items.
    *   It takes a `timelineData` prop, which is an array of objects. Each object typically has a `title` (string) and `content` (Svelte component or string) for a timeline entry.
    *   Dynamically calculates scroll progress relative to its container (`containerRef`).
    *   Uses `svelte/motion`'s `tweened` store with `cubicOut` easing to smoothly animate the height (`heightTransform`) and opacity (`opacityTransform`) of a vertical "progress" line as the user scrolls.
    *   Each timeline item's `title` is displayed in a "sticky" fashion (CSS `position: sticky`) on the left (desktop) or top (mobile) as the user scrolls past its content.
    *   The content for each timeline item (`item.content`) is rendered using `<svelte:component this={item.content} />` if it's a component, or directly if it's a string.
    *   Props:
        *   `timelineData`: (TimelineItem[], default: `[]`) An array of timeline items. Each item is an object: `{ title: string; content: ComponentType | string; }`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/timeline/Timeline.svelte
    <script lang="ts">
      import { onMount, type ComponentType } from "svelte";
      import { tweened } from "svelte/motion";
      import { cubicOut } from "svelte/easing";
      import { writable } from "svelte/store";

      type TimelineItem = {
        title: string;
        content: ComponentType | string;
      };
      export let timelineData: TimelineItem[] = [];

      let containerRef: HTMLDivElement;
      let height = 0; // Height of the timeline container
      let scrollProgress = writable(0);

      // Tweened values for smooth animation of the progress line
      let heightTransform = tweened(0, { duration: 400, easing: cubicOut });
      let opacityTransform = tweened(0, { duration: 400, easing: cubicOut });

      onMount(() => {
        if (containerRef) {
          height = containerRef.getBoundingClientRect().height;
        }

        let onScroll = () => {
          if (!containerRef) return;
          const rect = containerRef.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Calculate scroll progress (0 to 1) relative to the timeline container's visibility
          let progress = Math.min(
            1,
            Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height))
          );
          // Adjust progress for better visual timing
          progress = progress < 0.6 ? progress - 0.09 : progress - 0.004;
          scrollProgress.set(progress);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
      });

      // Subscribe to scrollProgress to update animated values
      $: scrollProgress.subscribe((progress) => {
        heightTransform.set(progress * height);
        opacityTransform.set(progress < 0.1 ? progress * 10 : 1); // Fade in opacity
      });
    </script>

    <div
      class="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      bind:this={containerRef}
    >
      <div class="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <!-- Optional Header -->
        <h2 class="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Changelog from my journey
        </h2>
        <p class="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          I've been working on Aceternity for the past 2 years. Here's a timeline of my journey.
        </p>
      </div>

      <div class="relative max-w-7xl mx-auto pb-20 overflow-hidden">
        {#each timelineData as item, index (item.title)}
          <div class="flex justify-start pt-10 md:pt-40 md:gap-10">
            <!-- Sticky Title Section -->
            <div
              class="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"
            >
              <div class="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div class="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 class="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
            </div>

            <!-- Content Section -->
            <div class="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 class="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {#if typeof item.content === "string"}
                <p class="text-neutral-700 dark:text-neutral-300">{item.content}</p>
              {:else}
                <svelte:component this={item.content} />
              {/if}
            </div>
          </div>
        {/each}

        <!-- Animated Vertical Line -->
        <div
          style="height: {height}px;"
          class="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] timeline-line"
        >
          <div
            style="height: {$heightTransform}px; opacity: {$opacityTransform};"
            class="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>

    <style>
      .timeline-line {
        mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
      }
    </style>
    ```

## Examples Subdirectory (`example/`)

This subdirectory contains:

-   **`ExampleTimeline.svelte`**:
    *   Demonstrates how to use the `Timeline.svelte` component.
    *   It defines an array `timelineData` where each item's `content` property is set to a specific Svelte component (`Content1`, `Content2`, `Content3`).

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/timeline/example/ExampleTimeline.svelte
    <script>
      import Timeline from "../Timeline.svelte";
      import Content1 from "./Content1.svelte";
      import Content2 from "./Content2.svelte";
      import Content3 from "./Content3.svelte";

      // Data for the timeline, linking titles to content components
      let timelineData = [
        {
          title: "Svelte 5",
          content: Content1, // Content1.svelte will be rendered for this item
        },
        {
          title: "Early 2023",
          content: Content2,
        },
        {
          title: "Changelog",
          content: Content3,
        },
      ];
    </script>

    <Timeline {timelineData} />
    ```

-   **`Content1.svelte`, `Content2.svelte`, `Content3.svelte`**:
    *   These are example Svelte components that provide the actual content displayed for each timeline item in `ExampleTimeline.svelte`. They typically contain text and images.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/timeline/example/Content1.svelte
    <div>
      <p class="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
        Built and launched Aceternity UI and Aceternity UI Pro from scratch
      </p>
      <div class="grid grid-cols-2 gap-4">
        <img src="https://assets.aceternity.com/templates/startup-1.webp" alt="startup template" class="rounded-lg ..."/>
        <img src="https://assets.aceternity.com/templates/startup-2.webp" alt="startup template" class="rounded-lg ..."/>
        <!-- ... more images ... -->
      </div>
    </div>
    ```

## Manifest File (`acetTimeline.ts`)

-   Defines the component's metadata (ID: "timeline", title, description, tags).
-   Specifies the preview component (`ExampleTimeline`) and includes raw code for it and its content components (`Content1Code`, etc.) for documentation.
-   Provides installation instructions:
    *   Dependencies (`clsx`, `tailwind-merge`, `svelte-motion` for tweened).
    *   Utility function (`cn`) setup.
    *   Source code for `Timeline.svelte`.

## Basic Usage

To use the `Timeline` component:

1.  **Installation**:
    *   Ensure dependencies like `clsx`, `tailwind-merge` (if using `cn` utility) and `svelte-motion` (for `tweened`) are installed.
    *   Copy `Timeline.svelte` into your project.
2.  **Prepare Content Components**: Create Svelte components for the content of each timeline item (or use simple strings).
3.  **Construct `timelineData`**: Create an array where each object has a `title` and points to a `content` component or string.
4.  **Use in your page**:

```svelte /dev/null/MyPageWithTimeline.svelte
<script lang="ts">
  import Timeline from '$lib/components/Timeline.svelte'; // Adjust path as needed
  import MyEventContent1 from '$lib/components/MyEventContent1.svelte';
  import MyEventContent2 from '$lib/components/MyEventContent2.svelte';
  import type { ComponentType } from 'svelte';

  type TimelineItem = {
    title: string;
    content: ComponentType | string;
  };

  const events: TimelineItem[] = [
    {
      title: "2022",
      content: MyEventContent1,
    },
    {
      title: "2023",
      content: MyEventContent2,
    },
    {
      title: "2024",
      content: "Launched a new feature that revolutionized the market. This item uses a simple string for content.",
    }
  ];
</script>

<div>
  <h1 class="text-center text-4xl font-bold my-10 dark:text-white">Project Milestones</h1>
  <Timeline timelineData={events} />
</div>

<!-- Example MyEventContent1.svelte -->
<!--
<div>
  <h4 class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Project Alpha Started</h4>
  <p class="text-neutral-600 dark:text-neutral-300">
    Initial planning and team formation. Developed proof of concept.
  </p>
  <img src="/images/alpha-milestone.jpg" alt="Alpha milestone" class="mt-4 rounded-md shadow-lg" />
</div>
-->
```

This setup displays a timeline with custom content for each event, and an animated line tracks the scroll progress through these events.
```