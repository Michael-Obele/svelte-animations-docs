```markdown
# Folder: /lib/aceternity-ui/components/DirectionHover

This folder contains the Svelte implementation of the **Direction Hover** effect, inspired by Aceternity UI. It creates a direction-aware hover animation where content slides in from the direction the user's mouse enters the component.

## Core Components

1.  **`DirectionHover.svelte`**:
    *   The main component that wraps an image and slotted content.
    *   It uses JavaScript to detect the mouse entry direction (top, right, bottom, left) relative to the component's bounding box.
    *   Leverages `svelte-motion` (`Motion`, `AnimatePresence`) to animate:
        *   The image itself (slight translation opposite to the entry direction).
        *   The slotted `children` content (sliding in from the entry direction).
    *   Accepts props for customization:
        *   `imageUrl`: (string) Path/URL to the main image.
        *   `children`: (slot) Content (like text or other elements) to display on hover.
        *   `childrenClassName`: (string, optional) CSS classes for the children's container.
        *   `imageClassName`: (string, optional) CSS classes for the image container.
        *   `className`: (string, optional) CSS classes for the main component wrapper.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/DirectionHover/DirectionHover.svelte
    <script>
        import { Motion, AnimatePresence } from "svelte-motion";
        import { writable } from "svelte/store";
        import { cn } from "$lib/utils";

        /**
         * @component
         * DirectionHover creates a direction-aware hover effect for an image.
         * When the mouse enters the component, content (children) animates in
         * from the direction of entry, and the image itself can also animate.
         *
         * @prop imageUrl - URL of the image to display.
         * @prop children - Default slot content, typically text or other elements, that animates on hover.
         * @prop childrenClassName - Optional CSS class(es) for the container of the children slot content.
         * @prop imageClassName - Optional CSS class(es) for the image element's container.
         * @prop className - Optional CSS class(es) for the main component container.
         */

        export let imageUrl =
          "https://i.pinimg.com/736x/98/d8/f2/98d8f20aebc103a2bd97d15c6c56fca1.jpg";
        // ... (props and logic as in the component file) ...

        let ref: HTMLDivElement | undefined;
        const direction = writable("left");
        // ... (handleMouseEnter, getDirection logic) ...

        const variants = { /* ... image animation variants ... */ };
        const textVariants = { /* ... text animation variants ... */ };
    </script>

    <div class="flex justify-center items-center h-[80vh]"> {/* Example wrapper */}
      <Motion let:motion>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          use:motion
          class={cn(
            "md:h-96 w-60 h-60 md:w-96 bg-transparent rounded-lg overflow-hidden relative group/card",
            className
          )}
          bind:this={ref}
          on:mouseenter={handleMouseEnter}
        >
          <AnimatePresence let:item list={[{ key: "s" }]}>
            <Motion
              initial="initial"
              whileHover={$direction}
              exit="exit"
              let:motion
            >
              <div class="relative h-full w-full" use:motion>
                <!-- Overlay -->
                <div
                  class="group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-700"
                />
                <!-- Animated Image -->
                <Motion
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  variants={variants}
                  let:motion
                >
                  <div
                    use:motion
                    class={cn("h-full w-full relative bg-gray-50 dark:bg-black", imageClassName)}
                  >
                    <img
                      alt="Hover aware image"
                      class="h-full w-full object-cover scale-[1.15]"
                      src={imageUrl}
                    />
                  </div>
                </Motion>
                <!-- Animated Children/Text -->
                <Motion
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  variants={textVariants}
                  let:motion
                >
                  <div
                    use:motion
                    class={cn("text-white absolute bottom-4 left-4 z-40", childrenClassName)}
                  >
                    <slot>{children}</slot>
                  </div>
                </Motion>
              </div>
            </Motion>
          </AnimatePresence>
        </div>
      </Motion>
    </div>
    ```

2.  **`DirectionHoverPreview.svelte`**:
    *   An example component demonstrating the usage of `DirectionHover.svelte`.
    *   It provides a sample image URL and sample text content for the overlay.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/DirectionHover/DirectionHoverPreview.svelte
    <script>
      import DirectionHover from "./DirectionHover.svelte";

      /**
       * @component
       * DirectionHoverPreview serves as a usage example for the `DirectionHover` component.
       * It displays a sample image with overlay text that animates based on hover direction.
       */
    </script>

    <div class="h-[28rem] relative flex items-center justify-center">
      <DirectionHover imageUrl="https://i.pinimg.com/564x/49/f4/0d/49f40d48ee9372e7e6ebcd312b2ce6c5.jpg">
        <p class="font-bold text-xl">In the mountains</p>
        <p class="font-normal text-sm">$1299 / night</p>
      </DirectionHover>
    </div>
    ```

3.  **`acetDirectionHover.ts`**:
    *   The manifest file for the DirectionHover component.
    *   Defines the `AceternityUI` object containing metadata (id, title, description, tags), preview component (`DirectionHoverPreview`), and installation instructions (dependencies, utility function, source code).

## Basic Usage

```svelte /dev/null/MyDirectionHoverUsage.svelte
<script>
  import DirectionHover from '$lib/aceternity-ui/components/DirectionHover/DirectionHover.svelte';
  import myImageUrl from '$lib/assets/my-image.jpg'; // Replace with actual image path
</script>

<div class="my-8 flex justify-center">
  <DirectionHover
    imageUrl={myImageUrl}
    className="w-80 h-80"
    imageClassName="bg-neutral-200"
    childrenClassName="p-4"
  >
    <!-- Content to show on hover -->
    <h3 class="text-lg font-bold">Overlay Title</h3>
    <p class="text-sm">Some descriptive text appears here.</p>
  </DirectionHover>
</div>
```

Refer to `acetDirectionHover.ts` for detailed installation steps and dependencies (`clsx`, `tailwind-merge`, `svelte-motion`).
```