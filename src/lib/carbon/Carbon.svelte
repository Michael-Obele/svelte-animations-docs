/**
 * @component Carbon
 * This component dynamically loads and manages the Carbon Ads script (`//cdn.carbonads.com/carbon.js`).
 * It ensures the ad script is loaded correctly on mount and refreshed during specific SvelteKit navigation events
 * to avoid stale ads or script conflicts. It only runs in production (`!dev`).
 * It injects the script into a specific div identified by a unique `localId`.
 */
<script lang="ts">
  import { onMount } from "svelte";
  import { isBrowser } from "$lib/utils";
  import { beforeNavigate } from "$app/navigation";
  import { dev } from "$app/environment";

  /** The source URL for the Carbon Ads script. */
  const src =
    "//cdn.carbonads.com/carbon.js?serve=CW7ICKJI&placement=animation-sveltevercelapp&format=cover";
  /** A unique ID generated for the container div to isolate the ad script instance. */
  const localId = crypto.randomUUID();

  /** Reference to the container HTML element where the Carbon Ads script will be injected. */
  let container: HTMLElement | null = null;

  /**
   * On component mount (client-side only and in production):
   * - Refreshes the Carbon Ads script initially.
   * - Sets up a cleanup function to remove the script and ad container when the component is destroyed.
   */
  onMount(() => {
    if (!dev) {
    refreshCarbonAds();

    return () => {
      const scriptNode = container?.querySelector(`[data-id="${localId}"]`);
      const carbonNode = container?.querySelector(`#carbonads`);
      scriptNode?.remove();
      carbonNode?.remove();
    };
    }
  });

  /**
   * Before SvelteKit navigation:
   * - Refreshes the Carbon Ads script under specific navigation conditions.
   * - Avoids refreshing if navigating between component examples within the same documentation section
   *   or to/from the main documentation index page for a component section.
   * @param {import('@sveltejs/kit').BeforeNavigate} navigation - The navigation event object.
   */
  beforeNavigate((navigation) => {
    let fromparam = navigation.from?.params.compID || "";
    let toparam = navigation.to?.params.compID || "";
    if(fromparam === '' || toparam==='') {
      return;
    }
    let pathname = navigation.from?.url.pathname.split("/")[1] || "magic";
    const isDocIndex = navigation.from?.route.id === `/${pathname}/${fromparam}`;
    if (isDocIndex) return;
    const goingToDocIndex = navigation.to?.route.id === `/${pathname}/${toparam}`;
    if (goingToDocIndex) return;
    refreshCarbonAds();
  });

  /**
   * Creates a new script element configured for Carbon Ads.
   * @returns {HTMLScriptElement} The configured script element.
   */
  function createCarbonScript() {
    const script = document.createElement("script");
    script.async = true;
    // Note: The script itself might look for the id '_carbonads_js',
    // but we also add a data-id for our own cleanup tracking.
    script.id = "_carbonads_js";
    script.src = src;
    script.type = "text/javascript";
    script.dataset.id = localId;
    return script;
  }

  /**
   * Refreshes the Carbon Ads script.
   * - Removes any existing Carbon Ads script and container associated with this component instance.
   * - Creates a new script element.
   * - Appends the new script to the designated container element in the DOM.
   * - Only runs in production and in the browser.
   */
  function refreshCarbonAds() {
    if (!dev) {
    if (!isBrowser) return;
    const scriptNode = container?.querySelector("[data-id='_carbonads_js']");
    const carbonAdsNode = container?.querySelector("#carbonads");

    carbonAdsNode?.remove();
    scriptNode?.remove();

    const script = createCarbonScript();
    container = document.getElementById(localId);
    if (container) {
      container.appendChild(script);
    }
    }
  }
</script>

{#if !dev}
<div id={localId} class=""></div>
{/if}
