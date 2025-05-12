<script lang="ts"> // Added lang="ts"
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  // The actual mask.svg content is typically inlined or managed by the build process
  // as suggested by acetSvgMask.ts. This import might be for local dev convenience.
  // import maskSvg from "./mask.svg"; 
  import { cn } from "$lib/utils";

  /**
   * @component
   * SvgMaskEffect creates a reveal effect where a portion of underlying content
   * is shown through a circular mask that follows the mouse cursor.
   * Hovering over the component expands the mask.
   *
   * It uses two named slots:
   * - `def`: Content that is revealed through the mask (typically appears on top).
   * - `reveal`: Content that is initially visible and over which the masked content is revealed.
   *
   * The component relies on a CSS variable `--mask-svg` which should point to an SVG
   * to be used as the mask. The `acetSvgMask.ts` setup usually handles providing this.
   *
   * @prop size - The initial size (diameter) of the circular mask in pixels. Default is 50.
   * @prop revealSize - The size (diameter) of the mask when the component is hovered. Default is 300.
   * @prop class - Optional CSS class(es) to apply to the main container.
   *
   * @slot def - The content to be revealed by the mask.
   * @slot reveal - The base content that is initially visible.
   */

  export let size = 50;
  export let revealSize = 300;
  let className = "";
  export { className as class };

  let isHovered = false;
  const mousePosition = writable({ x: 0, y: 0 }); // Made const as store itself is updated, not reassigned
  let containerRef: HTMLDivElement | undefined;

  const updateMousePosition = (e: MouseEvent) => { // Typed e
    if (!containerRef) return;
    const rect = containerRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosition.set({ x, y });
  };

  onMount(() => {
    if (containerRef) {
      containerRef.addEventListener("mousemove", updateMousePosition);
    }
    // Ensure the CSS variable for the mask is set.
    // Typically, this is handled by global styles or component-specific setup
    // as indicated in acetSvgMask.ts. The style block below is a fallback.
    // If mask.svg is in the same directory and build process handles it:
    // document.documentElement.style.setProperty('--mask-svg', `url(${maskSvg})`);
  });

  onDestroy(() => {
    if (containerRef) {
      containerRef.removeEventListener("mousemove", updateMousePosition);
    }
  });

  $: maskSize = isHovered ? revealSize : size;
</script>

<div bind:this={containerRef} class={cn("relative bg-white", className)}
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
>
  <!-- Layer that gets revealed by the mask -->
  <div
    class="w-full h-full flex items-center justify-center text-6xl absolute bg-black text-white bg-grid-white/[0.2]"
    style="
        mask-position: {$mousePosition.x - maskSize / 2}px {$mousePosition.y - maskSize / 2}px;
        -webkit-mask-position: {$mousePosition.x - maskSize / 2}px {$mousePosition.y - maskSize / 2}px; /* Prefixed version */
        mask-image: var(--mask-svg);
        -webkit-mask-image: var(--mask-svg); /* Prefixed version */
        mask-size: {maskSize}px;
        -webkit-mask-size: {maskSize}px; /* Prefixed version */
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat; /* Prefixed version */
        transition: mask-size 0.2s ease-out, -webkit-mask-size 0.2s ease-out; /* Smooth transition for mask size */
      "
  >
    <div class="absolute inset-0 bg-black h-full w-full z-0 opacity-50" />
    <div
      on:mouseenter={() => (isHovered = true)}
      on:mouseleave={() => (isHovered = false)}
      class="max-w-4xl mx-auto text-center text-white text-4xl font-bold relative z-20"
    >
      <slot name="def"></slot>
    </div>
  </div>

  <!-- Base layer, initially visible -->
  <div class="w-full h-full flex items-center justify-center text-black dark:text-white"> {/* Adjusted text color for default slot */}
    <slot name="reveal"></slot>
  </div>
</div>

<style>
  /* 
    It's generally recommended to define --mask-svg globally or via component props/context 
    if this component is reused, to avoid conflicts and ensure proper scoping.
    The acetSvgMask.ts file suggests inlining the SVG content or a similar setup.
    This :global(:root) is a fallback if the variable isn't set elsewhere.
  */
  :global(:root) {
    /* Make sure mask.svg is in the same directory or adjust path */
    /* For Vite, direct url() might need public assets or specific handling */
    /* Consider embedding SVG as a data URI for better encapsulation if acetSvgMask.ts doesn't handle it. */
    --mask-svg: url("./mask.svg"); 
  }
</style>
