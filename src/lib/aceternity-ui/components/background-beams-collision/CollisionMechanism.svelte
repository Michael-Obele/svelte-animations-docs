<script lang="ts">
  import { Motion, AnimatePresence } from "svelte-motion";
  import Explosion from "./Explosion.svelte";
  import { onMount } from "svelte";

  /**
   * @typedef {object} BeamConfigMechanism - Configuration for a single beam's animation and appearance.
   * Similar to BeamConfig in the parent component.
   * @property {number} [initialX] - Initial X position of the beam.
   * @property {number} [translateX] - Target X position for beam animation.
   * @property {string} [initialY] - Initial Y position of the beam (e.g., "-200px").
   * @property {string} [translateY] - Target Y position for beam animation (e.g., "1800px").
   * @property {number} [rotate] - Rotation angle in degrees.
   * @property {number} [duration] - Duration of one animation cycle in seconds.
   * @property {number} [delay] - Initial delay before animation starts in seconds.
   * @property {number} [repeatDelay] - Delay between animation repetitions in seconds.
   * @property {string} [class] - CSS classes for styling the beam's appearance (e.g., height).
   */

  /**
   * @typedef {object} CollisionState
   * @property {boolean} detected - Whether a collision has been detected.
   * @property {{ x: number; y: number } | null} coordinates - The x and y coordinates of the collision relative to the parent, or null.
   */

  /**
   * @component
   * CollisionMechanism manages the animation of a single beam and detects its collision
   * with a designated container boundary. On collision, it triggers an explosion effect
   * and resets the beam's animation.
   *
   * @prop beam - Configuration object (`BeamConfigMechanism`) for the beam's animation and style.
   * @prop containerRef - A Svelte binding to the HTMLDivElement that acts as the collision boundary (usually the bottom of the viewport area).
   * @prop parentRef - A Svelte binding to the HTMLDivElement that is the main parent container of all beams, used for coordinate calculations.
   */
  export let beam: BeamConfigMechanism = {
    initialX: 0,
    translateX: 0,
    duration: 8,
    repeatDelay: 0,
  };
  export let containerRef: HTMLDivElement;
  export let parentRef: HTMLDivElement;

  let beamRef: HTMLDivElement | undefined; // Ref to the beam's div element
  let collision: CollisionState = { detected: false, coordinates: null };
  let cycleCollisionDetected = false; // Prevents multiple collision detections per animation cycle
  let beamKey = 0; // Used to re-key and re-trigger the beam's Motion component

  const checkCollision = () => {
    // Ensure all refs are defined before proceeding
    if (beamRef && containerRef && parentRef && !cycleCollisionDetected) {
      const beamRect = beamRef.getBoundingClientRect();
      const containerRect = containerRef.getBoundingClientRect();
      const parentRect = parentRef.getBoundingClientRect();

      // Check if the bottom of the beam has reached or passed the top of the collision container
      if (beamRect.bottom >= containerRect.top) {
        const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
        const relativeY = beamRect.bottom - parentRect.top;

        collision = {
          detected: true,
          coordinates: { x: relativeX, y: relativeY },
        };
        cycleCollisionDetected = true;
      }
    }
  };
  onMount(() => {
    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  });

  $: if (collision.detected && collision.coordinates) {
    setTimeout(() => {
      collision = { detected: false, coordinates: null };
      cycleCollisionDetected = false;
    }, 2000);
    setTimeout(() => {
      beamKey++; // This re-keys the Motion component below, effectively restarting its animation
    }, 2000);
  }
</script>

{#key beamKey} <!-- Re-render Motion component when beamKey changes to restart animation -->
<Motion
  initial={{
    translateY: beam.initialY || "-200px",
    translateX: beam.initialX || "0px",
    rotate: beam.rotate || 0,
  }}
  animate={{
    translateY: beam.translateY || "1800px",
    translateX: beam.translateX || "0px",
    rotate: beam.rotate || 0,
  }}
  transition={{
    duration: beam.duration || 8,
    repeat: Infinity,
    repeatType: "loop",
    ease: "linear",
    delay: beam.delay || 0,
    repeatDelay: beam.repeatDelay || 0,
  }}
  let:motion
>
  <div
    bind:this={beamRef}
    use:motion
    class={`absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent ${beam.class || ''}`}
  ></div>
</Motion>
{/key}
{#if collision.detected && collision.coordinates}
  <Explosion
    style="position: absolute; left: {collision.coordinates.x}px; top: {collision.coordinates.y}px; transform: translate(-50%, -50%);"
  />
{/if}
