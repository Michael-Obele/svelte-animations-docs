```markdown
# Folder: /lib/aceternity-ui/components/animated-testimonials

This folder contains the Svelte implementation of the **Animated Testimonials** component, designed to showcase testimonials with smooth animations for the image and text content.

## Core Components

1.  **`AnimatedTestimonials.svelte`**:
    *   The main component that displays and animates a list of testimonials.
    *   It takes an array of `testimonials` objects, each containing `quote`, `name`, `designation`, and `src` (image URL).
    *   Uses `svelte-motion` (`Motion`, `AnimatePresence`) to create animations:
        *   Images transition with opacity, scale, rotation, and z-index changes. The active image has a slight bounce effect.
        *   Text (name, designation, quote) fades and slides in.
        *   The quote text reveals word by word with a blur and slide effect.
    *   Includes previous/next buttons for manual navigation.
    *   Supports an `autoplay` prop (boolean, default: false) to automatically cycle through testimonials every 5 seconds.
    *   Manages the active testimonial index and handles interval cleanup `onDestroy`.
    *   Requires a `Testimonial` type definition (usually provided or inferred).

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/animated-testimonials/AnimatedTestimonials.svelte
    <script lang="ts">
      import { onDestroy, onMount } from "svelte";
      import { Motion, AnimatePresence } from "svelte-motion";

      /**
       * @component AnimatedTestimonials ... (rest of component docs)
       * @prop testimonials - Array of Testimonial objects.
       * @prop autoplay - Enable automatic cycling.
       */

      /**
       * @typedef {object} Testimonial
       * @property {string} quote
       * @property {string} name
       * @property {string} designation
       * @property {string} src
       */
      export let testimonials: Testimonial[];
      export let autoplay: boolean = false;

      let active = 0;
      // ... (navigation logic, isActive, randomRotateY, interval handling) ...
    </script>

    <div class="max-w-sm md:max-w-4xl mx-auto ...">
      {#if testimonials && testimonials.length > 0}
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
          <!-- Image Animation Section -->
          <div class="relative h-80 w-full">
            <AnimatePresence initial={false} let:item list={[{ key: active }]}>
              {#each testimonials as testimonial, index (testimonial.src || index)}
                <Motion
                  initial={{ /* ... initial styles ... */ }}
                  animate={{ /* ... active/inactive styles ... */ }}
                  exit={{ /* ... exit styles ... */ }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  let:motion
                >
                  <div use:motion class="absolute inset-0 origin-bottom">
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      <!-- ... attributes ... -->
                    />
                  </div>
                </Motion>
              {/each}
            </AnimatePresence>
          </div>

          <!-- Text Animation Section -->
          <div class="flex justify-between flex-col py-4">
            {#if testimonials[active]}
            <Motion
              key={`text-${active}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              let:motion
            >
              <div use:motion>
                <h3 class="text-2xl font-bold ...">{testimonials[active].name}</h3>
                <p class="text-sm text-gray-500 ...">{testimonials[active].designation}</p>
                <!-- Word-by-word quote animation -->
                {#key `quote-${active}`}
                  <p class="text-lg text-gray-600 ... mt-8">
                    {#each testimonials[active].quote.split(" ") as word, wordIndex (word + wordIndex)}
                      <Motion
                        initial={{ filter: "blur(8px)", opacity: 0, y: 5 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ /* ... word transition ... */ }}
                        let:motion
                      >
                        <span use:motion class="inline-block">{word}&nbsp;</span>
                      </Motion>
                    {/each}
                  </p>
                {/key}
              </div>
            </Motion>
            {/if}
            <!-- Navigation Buttons -->
            <div class="flex gap-4 pt-12 md:pt-0 mt-auto">
              <button on:click={handlePrev} ...> PrevIcon </button>
              <button on:click={handleNext} ...> NextIcon </button>
            </div>
          </div>
        </div>
      {:else}
        <p class="text-center ...">No testimonials to display.</p>
      {/if}
    </div>
    ```

2.  **`ExampleAT.svelte`**:
    *   Demonstrates the usage of `AnimatedTestimonials.svelte`.
    *   Defines an array of sample `testimonials` data and passes it to the component.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/animated-testimonials/ExampleAT.svelte
    <script>
      import AnimatedTestimonials from "./AnimatedTestimonials.svelte";

      /**
       * @component ExampleAT ... (rest of component docs)
       */

      const testimonials = [
        { quote: "...", name: "Sarah Chen", designation: "...", src: "..." },
        { quote: "...", name: "Michael Rodriguez", designation: "...", src: "..." },
        // ... more testimonials
      ];
    </script>

    <AnimatedTestimonials {testimonials} />
    ```

3.  **`animatedTestimonials.ts`**:
    *   The manifest file for the Animated Testimonials component.
    *   Defines the `AceternityUI` object with metadata (id, title, description, tags), the preview component (`ExampleAT`), and installation instructions (dependencies like `svelte-motion`, `clsx`, `tailwind-merge`, utility function, source code).

## Basic Usage

```svelte /dev/null/MyTestimonialsUsage.svelte
<script>
  import AnimatedTestimonials from '$lib/aceternity-ui/components/animated-testimonials/AnimatedTestimonials.svelte';

  const myTestimonials = [
    {
      quote: "This Svelte component is fantastic!",
      name: "Jane Doe",
      designation: "Web Developer",
      src: "/images/jane-doe.jpg" // Replace with actual image path
    },
    {
      quote: "The animations are incredibly smooth.",
      name: "John Smith",
      designation: "UI Designer",
      src: "/images/john-smith.jpg" // Replace with actual image path
    }
    // Add more testimonials as needed
  ];
</script>

<div class="my-12">
  <AnimatedTestimonials testimonials={myTestimonials} autoplay={true} />
</div>
```

Refer to `animatedTestimonials.ts` for detailed installation steps and dependencies (`clsx`, `tailwind-merge`, `svelte-motion`).
```