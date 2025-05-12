<script lang="ts">
  import { scale as scaleTransition } from "svelte/transition"; // Renamed to avoid conflict with transform: scale

  /**
   * @component
   * Lens provides a magnifying glass effect for its slotted content.
   * It can operate in a dynamic mode (following the mouse) or a static mode (fixed lens position).
   * The zoom level and lens size are configurable.
   *
   * @prop zoomFactor - The magnification level for the lens. Default is 1.5.
   * @prop lensSize - The diameter of the lens circle in pixels. Default is 170.
   * @prop isStatic - If true, the lens position is fixed to the `position` prop values.
   *                 If false, the lens follows the mouse cursor. Default is false.
   * @prop position - An object { x, y } specifying the lens center coordinates.
   *                 Used when `isStatic` is true, or as the initial position if `isStatic` is false.
   *                 Defaults to { x: 200, y: 150 }.
   * @prop hovering - A boolean state that is true when the mouse is over the component.
   *                 This prop can be bound to (`bind:hovering`) to get the hover state in the parent.
   *                 Defaults to false.
   *
   * @slot - Default slot for the content to be magnified.
   */
  export let zoomFactor = 1.5;
  export let lensSize = 170;
  export let isStatic = false;
  export let position = { x: 200, y: 150 }; // Initial position, or static position
  export let hovering: boolean = false; // Default to false, parent can bind to it

  let mousePositionInternal = { x: position.x, y: position.y }; // Use 'position' for initial internal mouse pos

  const handleMouseMove = (e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePositionInternal = { x, y };
    if (!isStatic) {
      // When not static, the 'position' prop effectively becomes controlled by the mouse
      // This ensures the lens follows the mouse.
      position = { x, y };
    }
  };

  $: lensCenterX = isStatic ? position.x : mousePositionInternal.x;
  $: lensCenterY = isStatic ? position.y : mousePositionInternal.y;
</script>
  
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="relative overflow-hidden rounded-2xl z-20  cursor-none"
    on:mouseenter={() => (hovering = true)}
    on:mouseleave={() => (hovering = false)}
    on:mousemove={handleMouseMove}
  >
    <slot></slot> {#if hovering}
  <!-- Combined logic for lens rendering -->
  <div
    in:scaleTransition
    out:scaleTransition={{ duration: 400 }}
    class="absolute inset-0 overflow-hidden"
    style="
        mask-image: radial-gradient(circle {lensSize / 2}px at {lensCenterX}px {lensCenterY}px, black 100%, transparent 100%);
        -webkit-mask-image: radial-gradient(circle {lensSize / 2}px at {lensCenterX}px {lensCenterY}px, black 100%, transparent 100%);
        transform-origin: {lensCenterX}px {lensCenterY}px;
        z-index: {isStatic ? 'auto' : 50}; 
      "
    >
    <div
      class="absolute inset-0"
      style="transform: scale({zoomFactor}); transform-origin: {lensCenterX}px {lensCenterY}px;"
    >
      <slot></slot>
    </div>
  </div>
  {/if}
</div>
  