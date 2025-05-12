```markdown
# Folder: /lib/aceternity-ui/components/glowing-effect

This folder contains the Svelte **GlowingEffect** component, designed to add an interactive, animated glow border to its parent element. The glow effect typically follows the mouse cursor around the border of the element.

## Core Components

1.  **`GlowingEffect.svelte`** (Svelte 4 only, as noted in examples/manifest):
    *   The main component that creates and manages the glowing border effect.
    *   It's intended to be placed as a direct child of the element that should receive the glow. The parent element should typically have `position: relative` and rounded corners (`rounded-[inherit]`).
    *   Uses JavaScript to track mouse/pointer movements (`handleMove`) and updates CSS custom properties (`--start`, `--active`, `--blur`, `--spread`, `--glowingeffect-border-width`) on its own div.
    *   The glowing effect is achieved via a `::after` pseudo-element styled with `repeating-conic-gradient` or `radial-gradient` (based on `variant`), masked to appear only as a border.
    *   The `--active` CSS variable controls the opacity of the glow, making it visible when the pointer is near or interacting.
    *   The `--start` CSS variable controls the angle/position of the animated part of the gradient, which is updated using `svelte-motion`'s `animate` function for smooth transitions.
    *   Accepts props for customization:
        *   `blur`: (number, default: 0) Pixel value for an optional blur effect on the glow.
        *   `inactiveZone`: (number, default: 0.7) A factor determining how close the mouse needs to be to the center to deactivate the glow (0 to 1).
        *   `proximity`: (number, default: 0) Additional distance around the element to trigger the active state.
        *   `spread`: (number, default: 20) Controls the size/spread of the conic gradient highlight.
        *   `variant`: (string, default: "default") Can be "default" (multi-color gradient) or "white" (black/transparent gradient, appears white in dark mode due to masking).
        *   `glow`: (boolean, default: false) If true, keeps the glow effect slightly visible even when not fully active (influences opacity).
        *   `className`: (string, optional) Additional CSS classes for the glow container itself.
        *   `movementDuration`: (number, default: 2) Duration in seconds for the glow highlight to animate to the mouse position.
        *   `borderWidth`: (number, default: 1) The width of the glowing border in pixels.
        *   `disabled`: (boolean, default: false) If true, disables the effect.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/glowing-effect/GlowingEffect.svelte
    <script lang="ts">
      import { onDestroy, onMount } from "svelte";
      import { animate } from "svelte-motion"; // Used for smooth angle animation

      // Props definition
      export let blur = 0;
      export let inactiveZone = 0.7;
      export let proximity = 0;
      export let spread = 20;
      export let variant = "default"; // "default" or "white"
      export let glow = false; // Persists a slight glow
      export let className = "";
      export let movementDuration = 2; // seconds
      export let borderWidth = 1; // px
      export let disabled = false;

      let containerRef: HTMLDivElement; // The glow effect div itself
      let lastPosition = { x: 0, y: 0 };
      let animationFrameRef: any;

      function handleMove(e?: MouseEvent | { x: number; y: number }) {
        if (!containerRef || disabled) return;

        if (animationFrameRef) {
          cancelAnimationFrame(animationFrameRef);
        }

        animationFrameRef = requestAnimationFrame(() => {
          if (!containerRef) return;

          const parentElement = containerRef.parentElement; // Glow is applied to parent
          if (!parentElement) return;

          const { left, top, width, height } = parentElement.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.x;
          const mouseY = e?.y ?? lastPosition.y;

          if (e) {
            lastPosition = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            containerRef.style.setProperty("--active", "0"); // Deactivate if too close to center
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          containerRef.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle = parseFloat(containerRef.style.getPropertyValue("--start")) || 0;
          let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, { // svelte-motion animate
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              if (containerRef) {
                containerRef.style.setProperty("--start", String(value));
              }
            },
          });
        });
      }

      onMount(() => {
        if (disabled) return;
        // Event listeners for pointer move and scroll
        const handleScroll = () => handleMove(); // Re-evaluate on scroll
        const handlePointerMove = (e: PointerEvent) => handleMove(e);

        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("pointermove", handlePointerMove, { passive: true });

        return () => {
          if (animationFrameRef) cancelAnimationFrame(animationFrameRef);
          window.removeEventListener("scroll", handleScroll);
          document.removeEventListener("pointermove", handlePointerMove);
        };
      });
    </script>

    <div
      bind:this={containerRef}
      class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity {glow ? 'opacity-100' : ''} {blur > 0 ? 'blur-[var(--blur)]' : ''} {disabled ? 'hidden' : ''} {className}"
      style="
        --blur: {blur}px;
        --spread: {spread};
        --start: 0; /* Initial angle for conic gradient */
        --active: 0; /* Controls opacity of the active glow */
        --glowingeffect-border-width: {borderWidth}px;
        --repeating-conic-gradient-times: 5; /* For white variant */
        /* Gradient definitions based on variant prop */
        --gradient: {variant === 'white'
        ? `repeating-conic-gradient(from 236.84deg at 50% 50%, var(--black), var(--black) calc(25% / var(--repeating-conic-gradient-times)))`
        : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
          radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
          /* ... other radial gradients for default variant ... */
          repeating-conic-gradient(
            from 236.84deg at 50% 50%, #dd7bbb 0%, #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
            #5a922c calc(50% / var(--repeating-conic-gradient-times)), #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
            #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
          )`};"
    >
      <div
        class="glow rounded-[inherit] after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
      />
    </div>
    ```

2.  **`GlowingEffectExample.svelte`**:
    *   An example component that demonstrates how to use `GlowingEffect.svelte`.
    *   It creates a grid of list items, where each list item has a `div` container with `position: relative` and rounded corners.
    *   The `GlowingEffect` component is placed as a direct child inside this container.
    *   Uses `lucide-svelte` for icons.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/glowing-effect/GlowingEffectExample.svelte
    <script>
      // Works in Svelte 4 only
      import Box from "lucide-svelte/icons/box";
      import Settings from "lucide-svelte/icons/settings"; // etc.
      import GlowingEffect from "./GlowingEffect.svelte";

      const items = [
        { area: "md:[grid-area:1/1/2/7] ...", icon: Box, title: "...", description: "..." },
        // ... more items
      ];
    </script>

    <ul class="grid grid-cols-1 mt-32 ...">
      {#each items as item}
        <li class="min-h-[14rem] list-none {item.area}">
          <div class="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3"> {/* Parent needs relative positioning */}
            <GlowingEffect
              spread={40}
              glow={true}
              proximity={64}
              inactiveZone={0.01}
            />
            <div class="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 ...">
              {/* Content of the card */}
              <div class="w-fit rounded-lg border border-gray-600 p-2">
                <svelte:component this={item.icon} class="h-4 w-4 ..." />
              </div>
              <div class="space-y-3">
                <h3 class="...">{item.title}</h3>
                <h2 class="...">{item.description}</h2>
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
    ```

3.  **`acetGlowingEffect.ts`**:
    *   The manifest file for the GlowingEffect component.
    *   Defines the `AceternityUI` object with metadata (id, title, description, tags: "glowing", "svelte 4 only").
    *   Specifies the preview component (`GlowingEffectExample`).
    *   Provides installation instructions, including dependencies (`clsx`, `tailwind-merge`, `svelte-motion`), utility function (`cn`), and the source code for `GlowingEffect.svelte`.

## Basic Usage

To use the `GlowingEffect` component:

1.  **Installation**: Ensure `clsx`, `tailwind-merge`, and `svelte-motion` are installed. Set up the `cn` utility function.
2.  **Parent Styling**: The parent element that will have the glow effect needs `position: relative;` and ideally rounded corners (e.g., `rounded-xl`). The `GlowingEffect` component itself should inherit these rounded corners (`rounded-[inherit]`).
3.  **Placement**: Place the `<GlowingEffect />` component as a direct child of the element you want to have the glowing border.

```svelte /dev/null/MyGlowingCard.svelte
<script>
  import GlowingEffect from '$lib/aceternity-ui/components/glowing-effect/GlowingEffect.svelte';
  // Ensure $lib/utils.ts with cn function exists if using it inside GlowingEffect
</script>

<div class="p-10 flex justify-center items-center bg-neutral-900">
  <div class="relative w-72 h-48 bg-neutral-800 rounded-xl p-6 text-white shadow-lg">
    <!-- GlowingEffect is a direct child of the element to be glowed -->
    <GlowingEffect
      spread={30}
      glow={true}
      borderWidth={2}
      movementDuration={1.5}
      variant="default" <!-- or "white" -->
    />

    <!-- Content of your card/element -->
    <h3 class="text-xl font-semibold">Glowing Card Title</h3>
    <p class="mt-2 text-sm text-neutral-300">
      This card has an interactive glowing border that follows the mouse.
    </p>
  </div>
</div>

<style>
  /* Basic styling for the example */
  .p-10 { padding: 2.5rem; }
  .flex { display: flex; }
  .justify-center { justify-content: center; }
  .items-center { align-items: center; }
  .bg-neutral-900 { background-color: #171717; }
  .relative { position: relative; }
  .w-72 { width: 18rem; }
  .h-48 { height: 12rem; }
  .bg-neutral-800 { background-color: #262626; }
  .rounded-xl { border-radius: 0.75rem; }
  .p-6 { padding: 1.5rem; }
  .text-white { color: white; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
  .text-xl { font-size: 1.25rem; }
  .font-semibold { font-weight: 600; }
  .mt-2 { margin-top: 0.5rem; }
  .text-sm { font-size: 0.875rem; }
  .text-neutral-300 { color: #d4d4d4; }
</style>
```

**Important Notes**:

*   The component is marked as "Svelte 4 only" in its manifest, likely due to its use of `svelte-motion`. Ensure compatibility if using Svelte 5 or newer versions, as `svelte-motion` might behave differently or require adjustments.
*   The intricate glow effect relies heavily on CSS custom properties and complex `background` and `mask-image` styles. Understanding these CSS features can be helpful for deep customization.

Refer to `acetGlowingEffect.ts` for detailed installation steps and dependencies.
```