<script lang="ts">
  import CollisionMechanism from "./CollisionMechanism.svelte";

  /**
   * @typedef {object} BeamConfig
   * @property {number} [initialX] - Initial X position of the beam (CSS value, e.g., in pixels).
   * @property {number} [translateX] - Target X position for beam animation (CSS value).
   * @property {number} [initialY] - Initial Y position of the beam (CSS value, e.g., "-200px").
   * @property {number} [translateY] - Target Y position for beam animation (CSS value, e.g., "1800px").
   * @property {number} [rotate] - Rotation angle in degrees for the beam.
   * @property {string} [className] - Deprecated: Additional CSS classes for the beam element (use `class` on `BeamConfig` directly).
   * @property {number} [duration] - Duration of the beam's animation cycle in seconds. Default is 8.
   * @property {number} [delay] - Initial delay before the beam animation starts in seconds. Default is 0.
   * @property {number} [repeatDelay] - Delay between repetitions of the beam animation in seconds. Default is 0.
   * @property {string} [class] - Additional CSS classes specifically for styling the beam's visual appearance (e.g., height).
   */

  /**
   * @component
   * BackgroundBeamCollision creates an animated background with beams that appear to
   * collide with a boundary at the bottom of the container, triggering an explosion effect.
   * It uses the `CollisionMechanism` and `Explosion` sub-components.
   *
   * @prop class - Optional CSS class(es) to apply to the main container.
   * @prop beams - An array of `BeamConfig` objects to configure individual beams.
   *               Default configurations are provided if this prop is not set.
   * @slot - Default slot for content to be overlaid on the beam effect.
   */

  let containerRef: HTMLDivElement | undefined; // Ref for the collision boundary (bottom div)
  let parentRef: HTMLDivElement | undefined;    // Ref for the main parent container

  let _class = "";
  export { _class as class };

  export let beams: BeamConfig[] = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      class: "h-6",
    },
    { initialX: 400, translateX: 400, duration: 5, repeatDelay: 14, delay: 4 },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      class: "h-20",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      class: "h-12",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      class: "h-6",
    },
  ];
</script>

<div
  bind:this={parentRef}
  class={`h-96 md:h-[92vh] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden ${_class}`}
>
  {#each beams as beam (beam.initialX ?? Math.random())} {/* Added a key for better list rendering, prefer unique IDs if possible */}
    <CollisionMechanism {beam} bind:containerRef bind:parentRef />
  {/each}

  <div class="relative z-10"> {/* Ensure slot content is above beams */}
    <slot />
  </div>

  <div
    bind:this={containerRef}
    class="absolute bottom-0 bg-neutral-100 dark:bg-neutral-900 w-full inset-x-0 pointer-events-none" /* Dark mode for bottom boundary */
    style="box-shadow: 0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
  ></div>
</div>
