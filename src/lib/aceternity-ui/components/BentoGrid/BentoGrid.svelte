<script>
  import { cn } from "$lib/utils";

  /**
   * @component
   * BentoGrid is a layout component that arranges items in a responsive grid.
   * It's designed to showcase content in a visually appealing and organized manner,
   * typically used for feature displays, portfolios, or image galleries.
   *
   * @slot - Default slot for `BentoGridItem` components.
   * @prop class - Optional CSS class to apply to the grid container.
   */

  let _class = "";
  export { _class as class };
</script>

<div
  class={cn(
    "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
    _class
  )}
>
  <slot></slot>
</div>
