<script lang="ts">
  import { Motion } from "svelte-motion";

  /**
   * @component
   * Explosion creates a visual explosion effect using multiple animated particles (spans)
   * and a central gradient blur effect. It's typically triggered at a specific point
   * (e.g., a collision point) and uses `svelte-motion` for its animations.
   *
   * @prop style - Inline CSS style string to position the explosion absolutely.
   *               Example: "left: {x}px; top: {y}px; transform: translate(-50%, -50%);"
   */
  export let style: string;

  // Defines the properties for each particle in the explosion
  let spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));
</script>

<div class="absolute z-50 h-2 w-2" {style}>
  <Motion
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    
    let:motion
  >
    <div
      use:motion
      class="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
    />
  </Motion>

  {#each spans as span}
    <Motion
      initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
      animate={{ x: span.directionX, y: span.directionY, opacity: 0 }}
      transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
      let:motion
    >
      <span
        use:motion
        class="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
      />
    </Motion>
  {/each}
</div>
