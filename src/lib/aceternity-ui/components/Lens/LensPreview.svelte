<script>
  import Lens from "./Lens.svelte";

  /**
   * @component
   * LensPreview demonstrates the `Lens` component with a sample image.
   * It binds the `hovering` state, although it's not directly used in this preview's logic.
   */
  let hovering = false;
</script>
  
  <div class="flex justify-center items-center  w-full">
    <div class="relative z-10">
      <Lens bind:hovering> {/* Changed to bind:hovering for clarity on its usage */}
          <!-- <img
            src="https://i.pinimg.com/564x/93/4e/a1/934ea1980ce72cf2d1e78913ef0f4130.jpg"
            alt="image_c"
            class="h-full w-[400px] scale-110 object-cover origin-center"
          /> -->
          <img
            src="https://i.pinimg.com/564x/d3/0c/84/d30c84f735785bb97b2f502dcfbecd16.jpg"
            alt="Magnified content example" <!-- More descriptive alt text -->
            class="h-full w-[380px] scale-110 object-cover origin-center"
          />
      </Lens>
    </div>
  </div>