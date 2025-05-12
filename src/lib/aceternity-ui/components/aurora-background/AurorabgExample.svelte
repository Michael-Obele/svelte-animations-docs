<script>
  import AuroraBackground from "./AuroraBackground.svelte";

  /**
   * @component
   * AurorabgExample demonstrates the `AuroraBackground` component with sample
   * text content and a call-to-action button.
   */
</script>

<AuroraBackground class="px-4 md:px-28"> {/* Adjusted padding for better responsiveness */}
  <div class="text-3xl md:text-6xl font-bold text-white/90 dark:text-white/80 text-center"> {/* Ensure text is visible on light bg too */}
    Svelte is Fast & Amazing 🚀
  </div>
  <div class="font-extralight text-base md:text-4xl text-neutral-200 dark:text-neutral-200 py-4 my-2">
    web development for the rest of us
  </div>
  <a
    class="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 hover:opacity-90 transition-opacity"
    href="https://svelte.dev"
    target="_blank"
    rel="noopener noreferrer" /* Added for security/SEO best practice */
  >
    Visit Docs
  </a>
</AuroraBackground>
