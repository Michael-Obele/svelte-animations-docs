```markdown
# Folder: /lib/aceternity-ui/components/floating-dock

This folder contains the Svelte components for creating a **Floating Dock**, similar to the macOS dock, which acts as an animated navigation bar. It provides separate implementations for desktop and mobile views.

## Core Components

1.  **`FloatingDockDesktop.svelte`**:
    *   The main component for the desktop version of the floating dock.
    *   It arranges `IconContainer` components horizontally.
    *   Uses `svelte-motion` (`Motion`, `useMotionValue`) to track mouse position (`mouseX`) relative to the dock (`containerRef`) to enable interactive icon scaling in `IconContainer`.
    *   Accepts props:
        *   `items`: (Item[]) An array of navigation items, where each item is an object like `{ title: string; icon: ComponentType; href: string; }`.
        *   `className`: (string, optional) CSS classes for the main dock container.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/floating-dock/FloatingDockDesktop.svelte
    <script lang="ts">
      import { Motion, useMotionValue } from "svelte-motion";
      import IconContainer from "./IconContainer.svelte"; // Child component for individual icons
      import type { ComponentType } from "svelte"; // Assuming lucide-svelte icons are Svelte components

      type Item = {
        title: string;
        icon: ComponentType; // Type for Svelte component constructor
        href: string;
      };
      export let items: Item[] = [];
      export let className = "";

      const mouseX = useMotionValue(Infinity);
      const containerX = useMotionValue(0); // To store the dock's own X offset

      let containerRef: HTMLDivElement;
    </script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <Motion let:motion>
      <div
        use:motion
        bind:this={containerRef}
        on:mouseleave={() => mouseX.set(Infinity)}
        on:mousemove={(e) => {
          const rect = containerRef.getBoundingClientRect();
          if (rect) {
            mouseX.set(e.clientX - rect.left); // mouseX relative to the dock itself
            containerX.set(rect.x); // Store the dock's absolute X position
          }
        }}
        class="mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3 {className}"
      >
        {#each items as item (item.title)}
          <IconContainer {mouseX} {containerX} {...item} />
        {/each}
      </div>
    </Motion>
    ```

2.  **`FloatingDockMobile.svelte`**:
    *   Provides a mobile-friendly version of the dock.
    *   It features a toggle button (hamburger/menu icon) that, when clicked, reveals the navigation items vertically with a `fly` transition from `svelte/transition`.
    *   Accepts props:
        *   `items`: (Item[]) Same as `FloatingDockDesktop`.
        *   `className`: (string, optional) CSS classes for the mobile dock container.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/floating-dock/FloatingDockMobile.svelte
    <script lang="ts">
      import { fly } from "svelte/transition";
      import IconLayoutNavbarCollapse from "$lib/svg/tabler/layout-navbar-collapse.svg"; // Example icon
      import type { ComponentType } from "svelte";

      interface Item {
        title: string;
        icon: ComponentType;
        href: string;
      }

      export let items: Item[] = [];
      export let className: string = "";

      let open: boolean = false;
      const toggleOpen = (): void => {
        open = !open;
      };
    </script>

    <div class={`relative top-32 block md:hidden ${className}`}>
      {#if open}
        <div class="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
          {#each items as item, idx (item.title)}
            <div
              class="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
              in:fly|global={{ y: 10, delay: (items.length - idx) * 50 }}
              out:fly|global={{ y: 10, delay: idx * 50 }}
              style="transition-delay: {idx * 50}ms;"
            >
              <a href={item.href} class="h-4 w-4">
                <svelte:component
                  this={item.icon}
                  strokeWidth={1.4}
                  class="h-full w-full text-neutral-500 dark:text-neutral-300"
                />
              </a>
            </div>
          {/each}
        </div>
      {/if}
      <button
        on:click={toggleOpen}
        class="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <img
          src={IconLayoutNavbarCollapse}
          alt="Toggle menu"
          class="h-5 w-5 text-neutral-500 dark:text-neutral-300"
        />
      </button>
    </div>
    ```

3.  **`IconContainer.svelte`**:
    *   Represents an individual icon within the `FloatingDockDesktop`.
    *   Uses `svelte-motion` (`Motion`, `useTransform`, `useSpring`) to create the "magnifying" or "scaling" effect when the mouse hovers near the icon. The icon's width animates based on its distance from the mouse cursor.
    *   Shows a tooltip (title) on hover.
    *   Accepts props:
        *   `mouseX`: (`MotionValue<number>`) Mouse X position relative to the dock.
        *   `containerX`: (`MotionValue<number>`) Dock's absolute X position (not directly used for scaling in the snippet but might be relevant for precise calculations).
        *   `title`: (string) Text for the tooltip.
        *   `icon`: (ComponentType) The Svelte component for the icon.
        *   `href`: (string) The link for the icon.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/floating-dock/IconContainer.svelte
    <script lang="ts">
      import { useTransform, useSpring, Motion } from "svelte-motion";
      import { writable } from "svelte/store";
      import { fade } from "svelte/transition";
      import type { MotionValue, ComponentType } from "svelte-motion";


      export let containerX: MotionValue<number>; // Dock's X position
      export let mouseX: MotionValue<number>;    // Mouse X relative to dock
      export let title: string;
      export let icon: ComponentType;
      export let href: string;

      let ref: HTMLElement; // Ref for this icon container

      // Calculate distance of mouse from the center of this icon
      let distance = useTransform(mouseX, (val) => {
        const bounds = ref?.getBoundingClientRect();
        if (!bounds) return Infinity; // Return a large value if not rendered yet

        // mouseX is already relative to the dock container.
        // We need the icon's position relative to the dock container.
        const iconXInDock = bounds.left - containerX.get();
        return val - (iconXInDock + bounds.width / 2);
      });

      // Icon width scales based on distance: larger when mouse is close, smaller when far
      let widthSync = useTransform(distance, [-110, 0, 110], [40, 80, 40]); // Example values: far, center, far
      let width = useSpring(widthSync, { stiffness: 400, damping: 25 });

      let hovered = writable(false);
      // ... (hover handling)
    </script>

    <a {href}>
      <Motion let:motion style={{ width }}>
        <div
          use:motion
          bind:this={ref}
          on:mouseenter={() => hovered.set(true)}
          on:mouseleave={() => hovered.set(false)}
          class="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative group"
        >
          {#if $hovered}
            <div
              in:fade
              out:fade
              class="px-2 py-0.5 ... absolute ... -top-8 ... text-xs"
            >
              {title}
            </div>
          {/if}
          <div class="flex items-center justify-center group-hover:scale-125 transition-all duration-200">
            <svelte:component
              this={icon}
              strokeWidth={1.4}
              class=" text-neutral-500 dark:text-neutral-300"
            />
          </div>
        </div>
      </Motion>
    </a>
    ```

## Examples

-   **`AcetDockExample.svelte`**: Demonstrates how to use both `FloatingDockDesktop` and `FloatingDockMobile` with a sample set of `items`. It imports icons from `lucide-svelte`.

```svelte svelte-animations-docs/src/lib/aceternity-ui/components/floating-dock/AcetDockExample.svelte
<script>
  import FloatingDockDesktop from "$lib/aceternity-ui/components/floating-dock/FloatingDockDesktop.svelte";
  import FloatingDockMobile from "./FloatingDockMobile.svelte";
  import { Home, FolderPen, Mic, Award, Trash2, Share } from "lucide-svelte"; // Icon library

  const items = [
    { title: "Home", icon: Home, href: "#" },
    { title: "Speak", icon: Mic, href: "#" },
    // ... more items
  ];
</script>

<div class="flex justify-center items-center h-[30rem] relative">
  <FloatingDockDesktop {items} />
  <FloatingDockMobile {items} />
</div>
```

## Manifest File (`acetFloatingDock.ts`)

-   Defines the component's metadata (ID, title, description, tags).
-   Specifies the preview component (`AcetDockExample`).
-   Provides installation instructions, including dependencies (`tailwind-merge`, `clsx`, `svelte-motion`), utility function setup, and source code for `FloatingDockDesktop.svelte` and `FloatingDockMobile.svelte`. Note: `IconContainer.svelte` would also need to be copied as it's a dependency.

## Basic Usage

```svelte /dev/null/MyDockUsage.svelte
<script lang="ts">
  import FloatingDockDesktop from "$lib/aceternity-ui/components/floating-dock/FloatingDockDesktop.svelte";
  import FloatingDockMobile from "$lib/aceternity-ui/components/floating-dock/FloatingDockMobile.svelte";
  // Import your preferred icons (e.g., from lucide-svelte or custom SVGs)
  import { User, Settings, Mail } from "lucide-svelte";
  import type { ComponentType } from "svelte";

  type NavItem = {
    title: string;
    icon: ComponentType;
    href: string;
  };

  const navItems: NavItem[] = [
    { title: "Profile", icon: User, href: "/profile" },
    { title: "Settings", icon: Settings, href: "/settings" },
    { title: "Messages", icon: Mail, href: "/messages" },
  ];
</script>

<div class="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
  <FloatingDockDesktop items={navItems} class="shadow-lg" />
</div>

<!-- For mobile, you might place it differently or control visibility with media queries in Svelte -->
<div class="fixed bottom-4 right-4 z-50 md:hidden">
  <FloatingDockMobile items={navItems} />
</div>
```

Refer to `acetFloatingDock.ts` for detailed installation steps and dependencies. Ensure you copy all necessary Svelte files (`FloatingDockDesktop.svelte`, `FloatingDockMobile.svelte`, and `IconContainer.svelte`).
```