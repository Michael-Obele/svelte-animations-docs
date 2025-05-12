<script>
  import SvgMaskEffect from "./SvgMaskEffect.svelte";

  /**
   * @component
   * SvgMaskPreview demonstrates the `SvgMaskEffect` component.
   * It shows two pieces of text, one revealed on hover via the mask.
   */
</script>

<SvgMaskEffect class="h-[30rem] w-[60rem]">
  <div slot="def" class="px-36 py-20">
    Svelte is <span class="text-sky-500">Easy</span> & Everyone
    <span class="text-emerald-400">Loves</span> it.
  </div>
  <div
    slot="reveal"
    class="max-w-4xl mx-auto text-slate-800 text-center text-4xl font-bold"
  >
    React is <span class="text-red-600"> Hard </span> & Everyone Uses it.
  </div>
</SvgMaskEffect>
