```markdown
# Folder: /lib/aceternity-ui/components/sidebar

This folder contains the Svelte components for creating a responsive and interactive **Sidebar** navigation menu. The sidebar expands on hover in desktop view and can be toggled in mobile view.

## Core Components

1.  **`SidebarBody.svelte`**:
    *   The main wrapper component that integrates both `DesktopSidebar` and `MobileSidebar` for responsiveness.
    *   It acts as the primary entry point for using the sidebar feature.
    *   It uses a slot to receive the actual navigation links and other content that should appear within the sidebar.
    *   Accepts a `class` prop for additional styling on its root div.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/sidebar/SidebarBody.svelte
    <script>
      import { cn } from "$lib/utils";
      import DesktopSidebar from "./DesktopSidebar.svelte";
      import MobileSidebar from "./MobileSidebar.svelte";
      let _class = "";
      export { _class as class };
    </script>

    <div class={cn(_class)}>
      <DesktopSidebar>
        <slot></slot> {/* Content for desktop sidebar */}
      </DesktopSidebar>
      <MobileSidebar>
        <slot></slot> {/* Content for mobile sidebar */}
      </MobileSidebar>
    </div>
    ```

2.  **`DesktopSidebar.svelte`**:
    *   Handles the sidebar's behavior and appearance on desktop screens (typically hidden on mobile via Tailwind's `hidden md:flex`).
    *   Expands its width on mouse enter and collapses on mouse leave. The expansion/collapse is animated using a CSS transition on the `width` property.
    *   The expanded/collapsed state is controlled by the `vopen` Svelte store from `svelteContent.ts`.
    *   Accepts a `className` prop for styling.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/sidebar/DesktopSidebar.svelte
    <script lang="ts">
      import { vopen } from "./svelteContent"; // Shared Svelte store for open state
      export let className = "";
    </script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      style="width: {$vopen ? '200px' : '60px'}; transition: width 0.4s;"
      class="h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 {className}"
      on:mouseenter={() => {
        vopen.set(true);
      }}
      on:mouseleave={() => {
        vopen.set(false);
      }}
    >
      <slot></slot>
    </div>
    ```

3.  **`MobileSidebar.svelte`**:
    *   Handles the sidebar's behavior for mobile screens (typically shown via `block md:hidden`).
    *   Features a toggle button (using a `Menu` icon) to open and close the sidebar.
    *   When open, the sidebar slides in from the side (using `svelte/transition`'s `slide` transition) and covers the screen with a semi-transparent overlay.
    *   An `X` icon is provided to close the sidebar.
    *   Also uses the `vopen` store from `svelteContent.ts` to manage its state.
    *   Accepts a `className` prop for styling the fixed panel.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/sidebar/MobileSidebar.svelte
    <script lang="ts">
      import { slide } from "svelte/transition";
      import { vopen } from "./svelteContent";
      import { Menu, X } from "lucide-svelte"; // Icon components
      export let className = "";
    </script>

    <div
      class="h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-fit"
    >
      <button
        on:click={() => {
          vopen.update((v) => !v);
        }}
        class="flex justify-end z-50 w-full"
      >
        <Menu class="text-neutral-800 dark:text-neutral-200" />
      </button>

      {#if $vopen}
        <div
          transition:slide={{ axis: "x", duration: 300 }}
          class="fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[400] flex flex-col justify-between {className}"
        >
          <div
            class="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
            on:click={() => { vopen.update((v) => !v); }}
          >
            <X />
          </div>
          <slot></slot> {/* Sidebar content */}
        </div>
      {/if}
    </div>
    ```

4.  **`SidebarLink.svelte`**:
    *   Renders an individual navigation link within the sidebar.
    *   It displays an icon (passed as a Svelte component via `link.icon`) and a label (`link.label`).
    *   The label is conditionally rendered with a `slide` transition based on the `$vopen` store's value (i.e., label appears when the sidebar is open/expanded).
    *   Accepts a `link` prop of type `Links`: `{ label: string; href: string; icon: ComponentType; }`.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/sidebar/SidebarLink.svelte
    <script lang="ts">
      import { vopen } from "./svelteContent";
      import { slide } from "svelte/transition";
      import type { ComponentType } from "svelte"; // For icon prop type

      interface Links {
        label: string;
        href: string;
        icon: ComponentType; // Expecting a Svelte component for the icon
      }

      export let link: Links;
    </script>

    <a
      href={link.href}
      class="flex items-center justify-start gap-2 group/sidebar py-2"
    >
      <div>
        <svelte:component this={link.icon} strokeWidth={1.3} />
      </div>
      {#if $vopen}
        <div in:slide={{ axis: "x" }}>
          <span
            class="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          >
            {link.label}
          </span>
        </div>
      {/if}
    </a>
    ```

5.  **`svelteContent.ts`**:
    *   A crucial TypeScript file that defines and exports Svelte stores for managing the sidebar's state.
    *   `vopen`: A writable store (boolean) that indicates if the sidebar is open/expanded. This store is shared between `DesktopSidebar`, `MobileSidebar`, and `SidebarLink` to synchronize their behavior.
    *   `vanimate`: Another writable store, potentially for controlling animation enablement (though its usage isn't prominent in the provided snippets, it's part of the module).

    ```typescript svelte-animations-docs/src/lib/aceternity-ui/components/sidebar/svelteContent.ts
    import { writable } from "svelte/store";

    export let vopen = writable(false);
    export let vanimate = writable(true); // Used to enable/disable animations
    ```

## Examples

-   **`example/AcetSidebarExample.svelte`**:
    *   Demonstrates a complete implementation of the sidebar.
    *   It uses `SidebarBody` as the main wrapper.
    *   Passes a list of links (with labels, hrefs, and `lucide-svelte` icons) to `SidebarLink` components, which are slotted into `SidebarBody`.
    *   Showcases how to structure the content within the sidebar (e.g., a logo/title area, main navigation links, and a user profile link at the bottom).
    *   Also includes a placeholder for the main page content area to the right of the sidebar.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/sidebar/example/AcetSidebarExample.svelte
    <script lang="ts">
      import { Home, UserCircle2, Settings, ArrowLeft, Squircle } from "lucide-svelte";
      import { slide } from "svelte/transition";
      import SidebarBody from "../SidebarBody.svelte";
      import { vopen } from "../svelteContent";
      import SidebarLink from "../SidebarLink.svelte";
      import type { ComponentType } from "svelte";

      interface LinkItem {
        label: string;
        href: string;
        icon: ComponentType;
      }

      const links: LinkItem[] = [
        { label: "Dashboard", href: "#", icon: Home },
        { label: "Profile", href: "#", icon: UserCircle2 },
        { label: "Settings", href: "#", icon: Settings },
        { label: "Logout", href: "#", icon: ArrowLeft },
      ];
    </script>

    <div class="flex justify-center items-center h-[90vh] w-64 md:w-[50rem]">
      <div class="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border ... h-[60vh]">
        <SidebarBody class="justify-between gap-10">
          <!-- Top part of sidebar: Logo and Links -->
          <div class="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {#if $vopen}
              <a href="/" class="font-normal flex space-x-2 items-center ...">
                <div class="h-5 w-5 bg-black dark:bg-white rounded-br-lg ..."></div>
                <span in:slide={{ axis: "x" }} class="font-medium ...">Bhide Labs</span>
              </a>
            {:else}
              <a href="/" class="font-normal flex space-x-2 items-center ...">
                <div class="h-5 w-5 bg-black dark:bg-white rounded-br-lg ..."></div>
              </a>
            {/if}
            <div class="mt-8 flex flex-col gap-2">
              {#each links as link}
                <SidebarLink {link} />
              {/each}
            </div>
          </div>
          <!-- Bottom part of sidebar: User Link -->
          <div>
            <SidebarLink link={{ label: "Sikandar Bhide", href: "#", icon: Squircle }} />
          </div>
        </SidebarBody>

        <!-- Main Content Area (Placeholder) -->
        <div class="flex flex-1">
          <div class="p-2 md:p-10 rounded-tl-2xl border ... bg-white dark:bg-neutral-900 ...">
            <!-- Placeholder content divs -->
          </div>
        </div>
      </div>
    </div>
    ```

## Manifest File (`acetSidebar.ts`)

-   Defines the component's metadata (ID: "sidebar", title, description, tags).
-   Specifies the preview component (`AcetSidebarExample`).
-   Provides installation instructions:
    *   Dependencies: `tailwind-merge`, `clsx`, `lucide-svelte` (for icons, if used as in example).
    *   Utility function (`cn`).
    *   Source code for `svelteContent.ts`, `DesktopSidebar.svelte`, `MobileSidebar.svelte`, `SidebarBody.svelte`, and `SidebarLink.svelte`.

## Basic Usage

To implement the sidebar:

1.  **Install Dependencies**: As per `acetSidebar.ts` (e.g., `npm i tailwind-merge clsx lucide-svelte`).
2.  **Setup `utils.ts`**: Create `$lib/utils.ts` with the `cn` function.
3.  **Copy Components**: Copy all Svelte files from the `sidebar` directory and `svelteContent.ts` into your project (e.g., under `$lib/components/AppSidebar/`).
4.  **Structure Your Layout**:

    ```svelte /dev/null/MyAppLayout.svelte
    <script lang="ts">
      import SidebarBody from '$lib/components/AppSidebar/SidebarBody.svelte'; // Adjust path
      import SidebarLink from '$lib/components/AppSidebar/SidebarLink.svelte';
      import { vopen } from '$lib/components/AppSidebar/svelteContent'; // For logo/title logic if needed
      import { Home, Settings, User } from 'lucide-svelte'; // Example icons
      import { slide } from 'svelte/transition';
      import type { ComponentType } from 'svelte';

      interface NavLink {
        label: string;
        href: string;
        icon: ComponentType;
      }

      const mainLinks: NavLink[] = [
        { label: "Home", href: "/", icon: Home },
        { label: "User Profile", href: "/profile", icon: User },
      ];
      const bottomLink: NavLink = { label: "Preferences", href: "/settings", icon: Settings };
    </script>

    <div class="flex h-screen bg-neutral-200 dark:bg-neutral-900">
      <SidebarBody class="justify-between py-4">
        <!-- Top section of sidebar -->
        <div class="flex flex-col flex-1">
          {#if $vopen}
            <a href="/" class="flex items-center gap-2 px-2 py-2 mb-4">
              <div class="h-6 w-6 bg-blue-500 rounded-md"></div> <!-- Your Logo Placeholder -->
              <span in:slide={{ axis: 'x' }} class="font-semibold text-neutral-700 dark:text-neutral-200">My App</span>
            </a>
          {:else}
            <a href="/" class="flex items-center gap-2 px-2 py-2 mb-4">
               <div class="h-6 w-6 bg-blue-500 rounded-md"></div>
            </a>
          {/if}

          <nav class="flex flex-col gap-1">
            {#each mainLinks as link}
              <SidebarLink {link} />
            {/each}
          </nav>
        </div>

        <!-- Bottom section of sidebar -->
        <div>
          <SidebarLink link={bottomLink} />
        </div>
      </SidebarBody>

      <!-- Main Content Area -->
      <main class="flex-1 p-6 overflow-y-auto">
        <h1 class="text-2xl font-bold dark:text-white">Main Content Goes Here</h1>
        <!-- Your page content -->
        <slot /> {/* If this is a layout component */}
      </main>
    </div>
    ```

This setup provides a responsive sidebar with hover expansion on desktop and a toggleable menu on mobile, using the shared `$vopen` store to synchronize state.
```