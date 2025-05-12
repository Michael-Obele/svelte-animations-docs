<script lang="ts">
  import { page } from "$app/stores";
  // Assuming $lib alias resolves to svelte-animations-docs/src/lib
  import { navs } from "$lib"; // General navigation items (e.g., for top mobile nav)
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import Separator from "$lib/components/ui/separator/separator.svelte"; // Added import

  /**
   * @typedef {object} NavSubItem
   * @property {string} name - The display name of the navigation link.
   * @property {string} link - The URL or path for the navigation link.
   * @property {boolean} [isNew] - Optional flag to indicate if the item is new (displays a badge).
   * @property {boolean} [target_blank] - Optional flag to open link in a new tab.
   */

  /**
   * @typedef {object} CompNavItem
   * @property {number} id - A unique identifier for the navigation section.
   * @property {string} heading - The heading for this section of navigation links.
   * @property {NavSubItem[]} sub - An array of navigation sub-items.
   */

  /**
   * @component
   * AceternitySidebar provides a responsive sidebar navigation layout.
   * It includes a collapsible off-canvas menu for mobile viewports and a fixed
   * static sidebar for desktop viewports. The navigation structure is configurable
   * via the `componentsNav` prop.
   *
   * This component is likely used as a primary layout element for a documentation site
   * or application that requires hierarchical navigation.
   *
   * @prop componentsNav - An array of navigation sections and their items.
   *                       Each section has a heading and a list of sub-items (links).
   *                       The default value provides a sample structure for Aceternity UI docs.
   * @slot - Default slot for the main page content, which will be displayed to the right
   *         of the desktop sidebar or as the main view on mobile.
   */
  export let componentsNav: CompNavItem[] = [
    {
      id: 1,
      heading: "Follow for Updates",
      sub: [
        {
          name: "Twitter @Sikandar_Bhide",
          link: "https://twitter.com/Sikandar_Bhide",
          target_blank: true,
        },
      ],
    },
    {
      id: 2,
      heading: "Installation",
      sub: [
        {
          name: "Install Sveltekit",
          link: "/a/docs/install-sveltekit",
        },
        {
          name: "Install Tailwind CSS",
          link: "/a/docs/install-tailwindcss",
        },
        {
          name: "Add Utilities",
          link: "/a/docs/add-utilities",
        },
      ],
    },
    {
      id: 3,
      heading: "Components",
      sub: [
        {
          name: "Animated Testimonials",
          link: "/a/components/animated-testimonials",
        },
        {
          name: "Animated Tooltip",
          link: "/a/components/animated-tooltip",
        },
        {
          name: "Aurora Background",
          link: "/a/components/aurora-background",
        },
        {
          name:'Glowing Effect',
          link:'/a/components/glowing-effect',
          isNew:true
        },
        {
          name:'Colourful Text',
          link:'/a/components/colourful-text',
          isNew:true
        },
        {
          name: "Spotlight",
          link: "/a/components/spotlight",
        },
        {
          name: "Lens",
          link: "/a/components/lens",
        },
        {
          name: "Bento Grid",
          link: "/a/components/bento-grid",
        },
        {
          name: "Features Sections",
          link: "/a/components/feature-sections",
        },
        {
          name: "Text Hover Effect",
          link: "/a/components/text-hover-effect",
        },
        {
          name: "Svg Mask Effect",
          link: "/a/components/svg-mask-effect",
        },
        {
          name: "Compare",
          link: "/a/components/compare",
        },
        {
          name: "Direction Hover",
          link: "/a/components/direction-hover",
        },
        {
          name: "Hover Border Gradient",
          link: "/a/components/hover-border-gradient",
        },
        {
          name: "Placeholders and vanish input",
          link: "/a/components/placeholders-and-vanish-input",
          isNew: true,
        },
        {
          name: "Sidebar",
          link: "/a/components/sidebar",
        },
        {
          name: "Floating Dock",
          link: "/a/components/floating-dock",
        },
        {
          name: "Follow Pointer",
          link: "/a/components/follow-pointer",
        },
        {
          name: "Cards",
          link: "/a/components/cards",
        },
        {
          name: "Background Lines",
          link: "/a/components/background-lines",
        },
        {
          name: "Layout Grid",
          link: "/a/components/layout-grid",
        },
        {
          name: "Card Hover Effect",
          link: "/a/components/card-hover-effect",
        },
        {
          name: "Background Beam Collision",
          link: "/a/components/background-beam-collision",
        },
        {
          name: "Glare Card",
          link: "/a/components/glare-card",
        },
        {
          name: "Wobble Card",
          link: "/a/components/wobble-card",
        },
        {
          name: "Timeline",
          link: "/a/components/timeline",
        },
      ],
    },
  ];

  let mobileMenu = true; // State for mobile off-canvas menu (true = closed, false = open)
  let isLoading = false; // Used to prevent desktop sidebar flicker on initial load by delaying its rendering
  $: routeID = $page.url.pathname; // Reactive store to get the current page path for active link styling

  onMount(() => {
    isLoading = true; // Enable rendering of desktop sidebar after component mounts
  });
</script>

<div>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div
    class="relative lg:hidden transition-opacity ease-linear duration-300 {mobileMenu
      ? 'opacity-0 z-10 pointer-events-none'  // Ensure it's not interactive when closed
      : 'opacity-100 z-50 '} "
    role="dialog"
    aria-modal="true"
  >
    <!-- Overlay -->
    <div
      class="{mobileMenu
        ? '-translate-x-full'
        : 'translate-x-0'} transition-opacity ease-linear duration-300 fixed inset-0 bg-black/60 dark:bg-black/80"  aria-hidden="true"
    ></div>

    <!-- Sidebar panel -->
    <div
      class="fixed inset-0 flex transition ease-in-out duration-300 transform {mobileMenu ? '-translate-x-full' : 'translate-x-0'}"
    >
      <div
        class="relative mr-16 flex w-full max-w-xs flex-1 transition-opacity ease-in-out duration-300 {mobileMenu ? 'opacity-0' : 'opacity-100'}"
      >
        <!-- Close button -->
        <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
          <button
            on:click={() => {
              mobileMenu = true; // Close menu
            }}
            type="button"
            class="-m-2.5 p-2.5 text-gray-300 hover:text-white"
          >
            <span class="sr-only">Close sidebar</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Sidebar component -->
        <div class="flex grow flex-col overflow-y-auto bg-white dark:bg-neutral-950 px-6 pb-4 ring-1 ring-white/10">
          <div class="flex h-16 shrink-0 items-center">
            <!-- Mobile Logo/Title Slot can be used here if needed -->
            <a href="/" class="ml-2 mt-px text-xl font-semibold text-gray-900 dark:text-white">Svelte Aceternity UI</a>
          </div>
          <nav class="flex flex-1 flex-col">
            {#key mobileMenu} <!-- Re-render on mobileMenu change to trigger transition -->
              <div class="px-3" transition:slide|local={{ duration: 200 }}>
                {#each navs as item} <!-- General navs for mobile -->
                  <a
                    href={item.link}
                    on:click={() => { mobileMenu = true; }}
                    class="group {item.link === routeID
                      ? 'text-primary font-medium rounded-md bg-gray-100 dark:bg-neutral-800/80'
                      : 'text-gray-700 dark:text-neutral-300 hover:text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-800'} flex gap-x-3 p-2 text-sm leading-6 rounded-md"
                  >
                    {item.name}
                  </a>
                {/each}
              </div>
            {/key}
            <Separator class="my-4" />
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  {#each componentsNav as cnavs}
                    <div class="mb-3">
                      <div class="px-3 text-xs font-semibold leading-6 text-gray-400 dark:text-neutral-500 uppercase">
                        {cnavs.heading}
                      </div>
                      {#each cnavs.sub as item}
                        <li>
                          <a
                            on:click={() => {
                              mobileMenu = true; // Close menu on link click
                            }}
                            href={item.link}
                            target={item.target_blank ? "_blank" : undefined}
                            rel={item.target_blank ? "noopener noreferrer" : undefined}
                            class="group {item.link === routeID
                              ? 'text-primary bg-gray-100 dark:bg-neutral-800/80 font-medium'
                              : 'text-gray-700 dark:text-neutral-300 hover:text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-800'} flex gap-x-3 rounded-md py-[6px] px-3 text-sm leading-6 items-center justify-between"
                          >
                            {item.name}
                            {#if item?.isNew}
                              <Badge variant="success" class="ml-auto">New</Badge>
                            {/if}
                          </a>
                        </li>
                      {/each}
                    </div>
                  {/each}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <!-- in:fly={{ x: -200, duration: 600 }} -->
  <!-- Static sidebar for desktop -->
  {#if isLoading}
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col mt-[57.9px]"  
      transition:slide|local={{ duration:300, axis:'x', delay:50 }}
    >
      <div
        class="flex grow flex-col gap-y-0 overflow-y-auto no-scrollbar dark:border-neutral-800 border-r bg-white dark:bg-neutral-950 pl-8 pr-4"
      >
        <nav class="flex flex-1 flex-col mt-11 mb-32">
          <a href="/" class="font-bold text-xl mx-1 mt-3 mb-2 text-gray-900 dark:text-white">Svelte Aceternity UI</a>
          <!-- Desktop Search Can Go Here -->
          <ul role="list" class="flex flex-1 flex-col mt-2">
            {#each componentsNav as item}
              <li class="mb-1.5">
                <div class="text-gray-500 dark:text-neutral-400 font-semibold text-sm leading-6 pt-2 pb-1 px-2 uppercase">
                  {item.heading}
                </div>
                <ul role="list" class="space-y-1">
                  {#each item.sub as subItem}
                    <li>
                      <a
                        href={subItem.link}
                        target={subItem.target_blank ? "_blank" : undefined}
                        rel={subItem.target_blank ? "noopener noreferrer" : undefined}
                        class="group {subItem.link == routeID
                          ? 'text-primary bg-gray-100 dark:bg-neutral-800/70 font-medium'
                          : 'text-gray-600 dark:text-neutral-400 hover:text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-900'} capitalize flex justify-between items-center gap-x-2.5 p-2 text-sm leading-6 select-none pl-3 py-[5.2px] rounded-md tracking-normal transition-all duration-200"
                      >
                        {subItem.name}
                        {#if subItem?.isNew}
                          <Badge variant="success" class="ml-auto">New</Badge>
                        {/if}
                      </a>
                    </li>
                  {/each}
                </ul>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
    </div>
  {/if}

  <!-- Mobile Header Bar -->
  <div
    class="sticky top-0 z-30 flex items-center gap-x-6 bg-white/80 dark:bg-neutral-950/80 border-b border-gray-200 dark:border-neutral-800 backdrop-blur-md px-4 py-4 shadow-sm sm:px-6 lg:hidden"
  >
    <button
      on:click={() => (mobileMenu = false)} <!-- Open menu -->
      type="button"
      class="-m-2.5 p-2.5 text-gray-700 dark:text-neutral-300 lg:hidden"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
    <a href="/" class="flex-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
      Svelte Aceternity UI
    </a>
    <!-- Mobile Search/Actions can go here -->
  </div>

  <main class="py-10 lg:pl-72">
    <div class="px-4 sm:px-6 lg:px-10">
      <slot></slot> <!-- Main page content injected here -->
    </div>
  </main>
</div>
