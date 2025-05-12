<script lang="ts">
  import { onDestroy, onMount } from "svelte"; // Added onMount for potential initial setup if needed in future
  import { Motion, AnimatePresence } from "svelte-motion";

  /**
   * @component
   * AnimatedTestimonials displays a series of testimonials with engaging animations.
   * It cycles through testimonials, showing the author's image, name, designation, and quote.
   * Supports autoplay functionality.
   * Animation Inspired from Aceternity UI: https://ui.aceternity.com/components/animated-testimonials
   *
   * @prop testimonials - An array of testimonial objects to display.
   *   Each object should conform to the `Testimonial` type:
   *   `{ quote: string; name: string; designation: string; src: string; }`
   * @prop autoplay - If true, testimonials will automatically cycle every 5 seconds. Default is false.
   */

  /**
   * @typedef {object} Testimonial
   * @property {string} quote - The testimonial text.
   * @property {string} name - The name of the person giving the testimonial.
   * @property {string} designation - The designation or title of the person.
   * @property {string} src - URL or path to the image of the testimonial author.
   */
  export let testimonials: Testimonial[];
  export let autoplay: boolean = false;

  let active = 0; // Index of the currently active testimonial
  
  const handleNext = () => {
    active = (active + 1) % testimonials.length;
  };
  let handlePrev = () => {
    active = (active - 1 + testimonials.length) % testimonials.length;
  };

  const isActive = (index: number) => {
    return index === active;
  };

  // Generates a random Y-axis rotation for non-active testimonials
  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10; // Random rotation between -10 and 10 degrees
  };

  let interval: ReturnType<typeof setInterval> | undefined; // Typed interval

  // Watch the autoplay variable and set up/clear an interval
  $: {
    if (autoplay && testimonials && testimonials.length > 1) { // Ensure there's more than one testimonial for autoplay
      if (interval) clearInterval(interval); // Clear existing interval before setting a new one
      interval = setInterval(handleNext, 5000); // Cycle every 5 seconds
    } else {
      if (interval) clearInterval(interval);
    }
  }

  // Cleanup on component destruction
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div
  class="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20"
>
  {#if testimonials && testimonials.length > 0}
    <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20"> {/* Increased gap for better mobile spacing */}
      <div class="relative h-80 w-full">
        <AnimatePresence initial={false} let:item list={[{ key: active }]}> {/* initial={false} can prevent initial animation if not desired */}
          {#each testimonials as testimonial, index (testimonial.src || index)}  {/* Added key for better list reconciliation */}
            <Motion
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotateY: randomRotateY(), // Changed to rotateY for consistency
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotateY: isActive(index) ? 0 : randomRotateY(), // Changed to rotateY
                zIndex: isActive(index) ? testimonials.length : testimonials.length - 1 - index, // Simpler zIndex logic
                y: isActive(index) ? [0, -10, 0] : 0, // Reduced y-bounce for active item
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100, // Exit to the back
                rotateY: randomRotateY(), // Changed to rotateY
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              let:motion
            >
              <div use:motion class="absolute inset-0 origin-bottom">
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  class="h-full w-full rounded-3xl object-cover object-center shadow-lg"
                />
              </div>
            </Motion>
          {/each}
        </AnimatePresence>
      </div>
      <div class="flex justify-between flex-col py-4">
        {#if testimonials[active]} {/* Ensure testimonial data exists */}
        <Motion
          key={`text-${active}`}
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{ // This exit might not be visible due to AnimatePresence on the parent image
            y: -20,
            opacity: 0,
          }}
          transition={{
            duration: 0.3, // Slightly faster text animation
            ease: "easeInOut",
          }}
          let:motion
        >
          <div use:motion>
            <h3 class="text-2xl font-bold dark:text-white text-black">
              {testimonials[active].name}
            </h3>
            <p class="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            {#key `quote-${active}`} {/* Key for quote animation reset */}
              <p class="text-lg text-gray-600 dark:text-neutral-300 mt-8"> {/* Adjusted text color */}
                {#each testimonials[active].quote.split(" ") as word, wordIndex (word + wordIndex)}
                  <Motion
                    initial={{
                      filter: "blur(8px)", // Slightly less blur
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25, // Slightly faster word reveal
                      ease: "easeOut", // Changed easing
                      delay: 0.025 * wordIndex, // Adjusted delay
                    }}
                    let:motion
                  >
                    <span use:motion class="inline-block">
                      {word}&nbsp;
                    </span>
                  </Motion>
                {/each}
              </p>
            {/key}
          </div>
        </Motion>
        {/if}
        <div class="flex gap-4 pt-12 md:pt-0 mt-auto"> {/* mt-auto to push controls to bottom */}
          <button
            on:click={handlePrev}
            aria-label="Previous testimonial"
            class="h-8 w-8 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:scale-110 transition-transform duration-200"
            ><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg
          >
        </button>
        <button
          on:click={handleNext}
          aria-label="Next testimonial"
          class="h-8 w-8 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            class="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:scale-110 transition-transform duration-200"
            stroke-linejoin="round"
            ><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
          >
        </button>
      </div>
    </div>
  </div>
  {:else}
    <p class="text-center text-gray-500 dark:text-neutral-400">No testimonials to display.</p>
  {/if}
</div>
