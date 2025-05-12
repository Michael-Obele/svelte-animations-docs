<script>
    import { onMount } from 'svelte';
    import Particles from "@tsparticles/svelte";
    import { tweened } from 'svelte/motion';
    import { cn } from '$lib/utils'; // Assuming cn utility is available

    /**
     * @component
     * Sparkles creates a particle animation effect using the `@tsparticles/svelte` library.
     * It's configurable for background color, particle size, speed, color, and density.
     * The component fades in on mount.
     *
     * @prop id - A unique ID for the particle container. Essential if using multiple instances on one page.
     * @prop class - Optional CSS class(es) for the main container div.
     * @prop background - Background color of the particle container. Default is '#0d47a1'.
     * @prop minSize - Minimum size of the particles. Default is 1.
     * @prop maxSize - Maximum size of the particles. Default is 3.
     * @prop speed - Animation speed for particle opacity. Default is 4.
     * @prop particleColor - Color of the particles. Default is '#ffffff'.
     * @prop particleDensity - Density of particles. Default is 120.
     */
    
    export let id: string; // Required: A unique ID for the Particles component instance
    let className = '';
    export { className as class };
    export let background = '#0d47a1';
    export let minSize = 1;
    export let maxSize = 3;
    export let speed = 4;
    export let particleColor = '#ffffff';
    export let particleDensity = 120;
  
    let init = false; // Flag to ensure Particles component is only initialized onMount
    const opacity = tweened(0, { duration: 1000 });
  
    onMount(() => {
      // @ts-ignore
      //Slim bundle does not include all features, if you init with a config that requires a plugin/shape/updater not included that will throw an error
      //Ensure to import the full bundle or the specific features you need
      // import { particlesInit } from "@tsparticles/svelte";
      // import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
      // import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
      // init = particlesInit(async (engine) => {
          // await loadFull(engine); // for this sample the full bundle is loaded
          // await loadSlim(engine); // or Slim bundle
      // });
      init = true; // Initialize after potential particle engine setup (if needed uncomment above)
      opacity.set(1);  // Animate opacity to fade-in effect
    });
  
    const particlesLoaded = () => {
      opacity.set(1);  // Ensure opacity is set after particles are loaded
    };
  </script>
  
  <div class={cn("h-full w-full", className)} style="opacity: {$opacity};"> {/* Added h-full w-full for default sizing */}
    {#if init}
      <Particles
        id={id}
        options={{
          background: { color: { value: background } },
          fullScreen: { enable: false, zIndex: 1 }, // Assuming it's not meant to be fullscreen by default
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: false, mode: "repulse" }, // Disabled hover repulse by default
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: particleColor },
            move: {
              enable: true,
              speed: { min: 0.1, max: 1 }, // Adjusted speed for a calmer default
            },
            size: {
              value: { min: minSize, max: maxSize },
            },
            opacity: {
              value: { min: 0.1, max: 1 },
              animation: {
                enable: true,
                speed: speed,
                sync: false,
              },
            },
            number: {
              density: { enable: true, width: 400, height: 400 }, // Default density area
              value: particleDensity,
            },
          },
          detectRetina: true,
        }}
        on:particlesLoaded={particlesLoaded}
      />
    {/if}
  </div>
  
  <style>
    /* Removed redundant h-full/w-full as it's applied via cn() now */
  </style>
  