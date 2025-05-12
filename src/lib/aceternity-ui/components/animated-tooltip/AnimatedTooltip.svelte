<script lang="ts">
  import {
    Motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
  } from "svelte-motion";

  /**
   * @typedef {object} TooltipItem
   * @property {number} id - A unique identifier for the item.
   * @property {string} name - The name to display in the tooltip and potentially as alt text.
   * @property {string} designation - The designation or role to display in the tooltip.
   * @property {string} image - URL or path to the image for the item.
   */

  /**
   * @component
   * AnimatedTooltip displays a row of items (typically user avatars/images).
   * On hovering an item, a tooltip appears with an animation, showing the item's
   * name and designation. The tooltip has a slight rotation and translation effect
   * based on mouse position within the hovered item.
   *
   * @prop items - An array of `TooltipItem` objects to display.
   */
  export let items: TooltipItem[];

  let hoveredIndex: number | null = null;
  const springConfig = { stiffness: 100, damping: 5 }; // Made const as it's not reassigned
  let x = useMotionValue(0); // Motion value to track horizontal mouse position within an item

  // Rotate the tooltip based on horizontal mouse position
  let rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  // Translate the tooltip horizontally based on mouse position
  let translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: MouseEvent & { currentTarget: EventTarget & HTMLImageElement }) => {
    const target = event.currentTarget;
    if (target) {
        const halfWidth = target.offsetWidth / 2;
        x.set(event.offsetX - halfWidth); // Set x relative to the center of the item
    }
  };
</script>

<div class="group flex flex-row -mr-4"> {/* Adjusted -mr-4 to counteract last item's -mr-4 if needed, or apply to items directly */}
  {#each items as item (item.id)} {/* Keyed by item.id for better list management */}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="relative -mr-4"
      on:mouseenter={() => (hoveredIndex = item.id)}
      on:mouseleave={() => (hoveredIndex = null)}
    >
      <AnimatePresence> {/* Removed show={true} as it's default, ensure it behaves as expected */}
        {#if hoveredIndex === item.id}
          <Motion
            let:motion
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX, // svelte-motion will subscribe to these stores
              rotate: rotate,       // svelte-motion will subscribe to these stores
              whiteSpace: "nowrap",
            }}
            key={`tooltip-${item.id}`} /* Added key for AnimatePresence child */
          >
            <div
              use:motion
              class="absolute -left-1/2 -top-16 z-50 flex translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
            >
              <div
                class="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              />
              <div
                class="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent"
              />
              <div
                class="relative z-30 whitespace-nowrap text-base font-bold text-white"
              >
                {item.name}
              </div>
              <div class="whitespace-nowrap text-xs text-white">
                {item.designation}
              </div>
            </div>
          </Motion>
        {/if}
      </AnimatePresence>
      <img
        on:mousemove={handleMouseMove}
        height={100}
        width={100}
        src={item.image}
        alt={item.name} /* Alt text for accessibility */
        class="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
      />
    </div>
  {/each}
</div>
