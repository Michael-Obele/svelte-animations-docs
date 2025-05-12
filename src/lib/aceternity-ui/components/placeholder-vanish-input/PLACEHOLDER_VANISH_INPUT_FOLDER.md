```markdown
# Folder: /lib/aceternity-ui/components/placeholder-vanish-input

This folder contains the Svelte implementation of the **Placeholder Vanish Input** component. This component provides an input field with cycling placeholders and a unique "vanish" effect for the entered text upon submission.

## Core Components

1.  **`PlaceholderVanishInput.svelte`**:
    *   The main input component.
    *   It displays a series of placeholders that cycle automatically.
    *   When the user types text and submits (e.g., by pressing Enter or clicking a submit button), the entered text "vanishes" with a particle effect.
    *   This vanishing effect is achieved by:
        *   Drawing the input text onto an invisible HTML5 `<canvas>`.
        *   Getting the pixel data of the rendered text.
        *   Animating individual pixels (or small groups of pixels) as particles that move and fade out.
    *   Uses `svelte/transition`'s `fly` for placeholder text animations.
    *   Accepts props:
        *   `placeholders`: (string[], default: []) An array of strings to be used as cycling placeholders.
        *   `onSubmit`: (function) A callback function that is executed when the form is submitted (after the vanish animation starts).
    *   Internal state and logic:
        *   `currentPlaceholder`: Tracks the index of the currently displayed placeholder.
        *   `intervalRef`: Manages the interval for cycling placeholders.
        *   `value`: Bound to the input field's value.
        *   `animating`: A boolean to indicate if the vanishing animation is in progress.
        *   `canvasRef`, `inputRef`: References to the canvas and input elements.
        *   `newDataRef`: Stores particle data for the vanishing animation.
        *   Event handlers: `handleKeyDown` (for Enter key submission), `handleSubmit` (for form submission), `handleVisibilityChange` (to pause/resume placeholder animation).
        *   Functions: `startAnimation` (for placeholders), `draw` (to render text on canvas), `animate` (to animate particles), `vanishAndSubmit` (to orchestrate the vanishing effect and call `onSubmit`).

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/placeholder-vanish-input/PlaceholderVanishInput.svelte
    <script>
        import { onMount } from "svelte";
        import {  fly } from "svelte/transition";
        import { createEventDispatcher } from "svelte";

        /**
         * @component PlaceholderVanishInput
         * An input field with animated, cycling placeholders and a text-vanishing effect on submit.
         *
         * @prop placeholders - An array of strings for the cycling placeholders.
         * @prop onSubmit - Callback function triggered on form submission.
         */
        export let placeholders = [];
        export let onSubmit;

        let currentPlaceholder = 0;
        let intervalRef;
        let value = ""; // Bound to the input
        let animating = false;
        let canvasRef, inputRef; // Refs for canvas and input elements
        let newDataRef = []; // Stores particle data for animation
        const dispatch = createEventDispatcher();

        // --- Placeholder Cycling Logic ---
        const startAnimation = () => {
          intervalRef = setInterval(() => {
            currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
          }, 3000); // Change placeholder every 3 seconds
        };

        const handleVisibilityChange = () => {
          // Pause/resume animation based on tab visibility
        };

        onMount(() => {
          startAnimation();
          document.addEventListener("visibilitychange", handleVisibilityChange);
          return () => { /* cleanup */ };
        });

        // --- Vanishing Animation Logic ---
        const draw = () => {
          // Draws current input 'value' onto 'canvasRef'
          // Extracts pixel data into 'newDataRef' for particle animation
        };

        const animate = (start) => {
          // Animates particles in 'newDataRef' to create the vanish effect
          // Clears 'value' and sets 'animating = false' when done
        };

        const vanishAndSubmit = () => {
          animating = true;
          draw();
          const inputValue = inputRef?.value || "";
          if (inputValue) {
            const maxX = newDataRef.reduce(/* find max x for animation boundary */);
            animate(maxX);
          }
          // Note: onSubmit() is called within handleSubmit, typically after vanishAndSubmit
        };

        const handleKeyDown = (e) => {
          if (e.key === "Enter" && !animating) {
            vanishAndSubmit();
            // e.preventDefault() might be needed if it's inside a real form
          }
        };

        const handleSubmit = (e) => {
          e.preventDefault();
          vanishAndSubmit();
          onSubmit(); // Call the provided onSubmit prop
        };
    </script>

    <form
      class="w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow ..."
      on:submit={handleSubmit}
    >
      <canvas
        class="absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 ..."
        bind:this={canvasRef}
      ></canvas>

      <input
        bind:this={inputRef}
        bind:value
        on:keydown={handleKeyDown}
        type="text"
        class="w-full text-sm sm:text-base z-50 border-none bg-transparent h-full rounded-full focus:outline-none ... {animating ? 'text-transparent' : 'dark:text-white text-black'}"
      />

      <button
        disabled={!value || animating} /* Disable button if no value or animating */
        type="submit"
        class="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full ... flex items-center justify-center"
      >
        <!-- Submit Icon SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" ...>...</svg>
      </button>

      <!-- Placeholder Display -->
      <div class="absolute inset-0 flex items-center rounded-full pointer-events-none">
        {#if !value && placeholders.length > 0}
          {#key currentPlaceholder}
            <p
              class="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 ..."
              in:fly={{ y: 10, delay: 400 }}
              out:fly={{ y: -10 }}
            >
              {placeholders[currentPlaceholder]}
            </p>
          {/key}
        {/if}
      </div>
    </form>
    ```

## Examples

1.  **`PHVPreview.svelte`**:
    *   Demonstrates the usage of `PlaceholderVanishInput`.
    *   It defines an array of sample `placeholders` and a `handleSubmit` function to be passed as props.

    ```svelte svelte-animations-docs/src/lib/aceternity-ui/components/placeholder-vanish-input/PHVPreview.svelte
    <script>
      import PlaceholderVanishInput from "./PlaceholderVanishInput.svelte";

      const placeholders = [
        "Why is Svelte the Best Javascript Framework?",
        "Chal Bhai Kuch Type kar auur Magic dek..",
        "Jab we met is the best movie ever",
        "Bhai Share bhi kar de yaar",
        "Ek Tweet to banta hai",
      ];

      const handleSubmit = (e) => {
        // In a real scenario, you might get the value from the event if the component passed it,
        // or manage the input value in this parent component too.
        // The current PlaceholderVanishInput clears its own value after animation.
        console.log("Form submitted (vanish effect initiated)!");
      };
    </script>

    <div
      class="h-[35rem] w-full md:w-[40rem] mx-auto flex flex-col justify-center items-center px-4"
    >
      <h2
        class="mb-10 sm:mb-12 text-xl text-center sm:text-5xl bg-gradient-to-tr from-white from-20% via-neutral-400 to-neutral-600/80 to-90% text-transparent bg-clip-text font-semibold"
      >
        Svelte Aceternity UI
      </h2>

      <PlaceholderVanishInput {placeholders} {onSubmit} />
    </div>
    ```

## Manifest File (`acetPlaceholderVanishInput.ts`)

*   **`acetPlaceholderVanishInput.ts`**:
    *   Defines the component's metadata (ID: "placeholders-and-vanish-input", title, description, tags).
    *   Specifies the preview component (`PHVPreview`).
    *   Provides installation instructions, including dependencies (`clsx`, `tailwind-merge` for the `cn` utility, though `cn` is not directly used in the provided `PlaceholderVanishInput.svelte` but is a library standard), utility function setup, and the source code for `PlaceholderVanishInput.svelte`.

## Basic Usage

To use the `PlaceholderVanishInput` component:

1.  **Installation**:
    *   Ensure any utility functions like `cn` (if used elsewhere or planned) are set up (usually from `clsx` and `tailwind-merge`).
    *   Copy `PlaceholderVanishInput.svelte` into your project.
2.  **Using the Component**: Import it and provide the `placeholders` array and an `onSubmit` handler.

```svelte /dev/null/MyFormPage.svelte
<script>
  import PlaceholderVanishInput from '$lib/components/PlaceholderVanishInput.svelte'; // Adjust path

  const searchPlaceholders = [
    "Search for products...",
    "What are you looking for today?",
    "Type your query and press Enter",
  ];

  function handleSearchSubmit() {
    // This function is called when the input is submitted and vanishes.
    // The input value is managed internally by PlaceholderVanishInput.
    // If you need the value here, you'd typically have the input value bound
    // to a variable in this parent component, or dispatch it from the child.
    // For this component, the primary action is the visual effect and calling this function.
    alert("Search submitted!");
    // Perform actual search logic here
  }
</script>

<div class="container mx-auto p-8">
  <h1 class="text-2xl font-bold mb-6 dark:text-white text-center">Interactive Search</h1>
  <PlaceholderVanishInput
    placeholders={searchPlaceholders}
    onSubmit={handleSearchSubmit}
  />
</div>
```

**Key Considerations**:

*   **Value Handling**: The current `PlaceholderVanishInput` component manages its `value` internally and clears it after the vanish animation. If the parent component needs the submitted value, the `PlaceholderVanishInput` would need to be modified to dispatch the value or allow two-way binding. The `onSubmit` prop is called *after* the animation sequence that clears the internal value.
*   **Canvas Performance**: The vanish effect relies on canvas operations. For extremely long text inputs, performance might be a consideration, though it's generally fine for typical input lengths.
*   **Styling**: The component uses Tailwind CSS for styling. Ensure your project has Tailwind CSS configured.

Refer to `acetPlaceholderVanishInput.ts` for specific file contents and overall library setup.
```