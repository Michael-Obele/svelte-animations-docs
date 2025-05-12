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
    export let children = "coding"; // Content for the hover overlay
    export let childrenClassName = "";
    export let imageClassName = "";
    export let className = "";
  
    let ref: HTMLDivElement | undefined; // Reference to the main container div
    const direction = writable("left"); // Stores the detected mouse entry direction
  
    // Detects the direction from which the mouse enters the component
    function handleMouseEnter(event) {
      if (!ref) return;
  
      const directionValue = getDirection(event, ref);
      // console.log("direction", directionValue); // Debug log, consider removing for production
  
      switch (directionValue) {
        case 0:
          direction.set("top");
          break;
        case 1:
          direction.set("right");
          break;
        case 2:
          direction.set("bottom");
          break;
        case 3:
          direction.set("left");
          break;
        default:
          direction.set("left");
          break;
      }
    }
  
    function getDirection(ev, obj) {
      const { width: w, height: h, left, top } = obj.getBoundingClientRect();
      const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
      const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
      const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
      return d;
    }
  
    // Animation variants for the image container
    const variants = {
      initial: { x: 0, y: 0 }, // Ensure y is also reset for exit consistency
      exit: { x: 0, y: 0 },
      top: { y: 20 },
      bottom: { y: -20 },
      left: { x: 20 },
      right: { x: -20 },
    };
  
    // Animation variants for the text/children content
    const textVariants = {
      initial: { y: 0, x: 0, opacity: 0 },
      exit: { y: 0, x: 0, opacity: 0 },
      top: { y: -20, opacity: 1 }, // Adjusted y for a slight upward movement from top
      bottom: { y: 20, opacity: 1 }, // Adjusted y for a slight downward movement from bottom
      left: { x: -20, opacity: 1 }, // Adjusted x for a slight leftward movement from left
      right: { x: 20, opacity: 1 }, // Adjusted x for a slight rightward movement from right
    };
  </script>
  
  <div class="flex justify-center items-center h-[80vh]">
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
              <div
                class="group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-700"
              />
              <Motion
                transition={{ duration: 0.2, ease: "easeOut" }}
                variants={variants}
                let:motion
              >
                <div
                  use:motion
                  class={cn("h-full w-full relative bg-gray-50 dark:bg-black", imageClassName)}
                >
                  <!-- svelte-ignore a11y-img-redundant-alt -->
                  <img
                    alt="Hover aware image" {/* Improved alt text */}
                    class="h-full w-full object-cover scale-[1.15]"
                    src={imageUrl}
                  />
                </div>
              </Motion>
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
  