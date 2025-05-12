<script lang="ts">
  import { cn } from "$lib/utils";

  /**
   * @component
   * AuroraBackground creates a visually appealing, animated background effect reminiscent of an aurora.
   * It uses complex CSS gradients and animations to achieve this effect.
   * The component centers its slotted content by default.
   *
   * A Svelte 5 specific version/playground is available at:
   * https://svelte.dev/playground/09c5ff84a8ea4591a71b5a36f642a490?version=5.18.0
   *
   * @prop class - Optional CSS class(es) to apply to the main container div, allowing for custom height, etc.
   * @prop showRadialGradient - If true, applies a radial gradient mask for an additional visual effect. Default is true.
   *
   * @slot - Default slot for content to be overlaid on the aurora background.
   */

  let _class: string = "";
  export { _class as class };
  export let showRadialGradient: boolean = true;

  // Note: The core aurora effect is achieved through complex Tailwind CSS arbitrary properties
  // and CSS variables defined in the `tailwind.config.ts` (animation keyframes for 'aurora').
</script>

<div
  class={cn(
    "relative flex flex-col h-[90vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg", // Removed z-50 from here, child has it
    _class
  )}
  {...$$restProps}
>
  <div class="absolute inset-0 overflow-hidden -z-10"> {/* Ensure aurora is behind content, changed z-10 to -z-10 */}
    <!--  I'm sorry but this is what peak developer performance looks like  trigger warning -->
    <div
      class={cn(
        `
    [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
    [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
    [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
    [background-image:var(--white-gradient),var(--aurora)]
    dark:[background-image:var(--dark-gradient),var(--aurora)]
    [background-size:300%,_200%]
    [background-position:50%_50%,50%_50%]
    filter blur-[10px] invert dark:invert-0
    after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
    after:dark:[background-image:var(--dark-gradient),var(--aurora)]
    after:[background-size:200%,_100%]
    after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
    pointer-events-none
    absolute -inset-[10px] opacity-50 will-change-transform`,

        showRadialGradient &&
          `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
      )}
    ></div>
  </div>
  <div class="z-10 text-center relative"> {/* Added relative and ensured content is above aurora */}
    <slot></slot>
  </div>
</div>
