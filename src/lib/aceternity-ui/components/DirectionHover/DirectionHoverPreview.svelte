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
