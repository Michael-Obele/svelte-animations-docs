# Fun

This folder contains a large Svelte page that demonstrates various Indie UI and card components, as well as badges and separators. Below is the Svelte 5 import code and the full source for the main page file.

---

## +page.svelte

**Import:**
```svelte
// This is a SvelteKit page file, imported automatically by the router.
```

**Source:**
```svelte
<script>
  import { page } from "$app/stores";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Bento4Variant1 from "$lib/indieui/components/bentogrids/bento4/bento4Variant1.svelte";
  import Bento4Variant2 from "$lib/indieui/components/bentogrids/bento4/bento4Variant2.svelte";
  import Bento4Variant4 from "$lib/indieui/components/bentogrids/bento4/bento4Variant4.svelte";
  import Bentro4Variant3 from "$lib/indieui/components/bentogrids/bento4/bentro4Variant3.svelte";
  import Bento5Variant1 from "$lib/indieui/components/bentogrids/bento5/Bento5Variant1.svelte";
  import Bento5Variant2 from "$lib/indieui/components/bentogrids/bento5/Bento5Variant2.svelte";
  import Bento5Variant3 from "$lib/indieui/components/bentogrids/bento5/Bento5Variant3.svelte";
  import Bento5Variant4 from "$lib/indieui/components/bentogrids/bento5/Bento5Variant4.svelte";
  import Bento6Variant1 from "$lib/indieui/components/bentogrids/bento6/Bento6Variant1.svelte";
  import Bento6variant2 from "$lib/indieui/components/bentogrids/bento6/Bento6variant2.svelte";
  import Bento6Variant3 from "$lib/indieui/components/bentogrids/bento6/Bento6Variant3.svelte";
  import Bento6Variant4 from "$lib/indieui/components/bentogrids/bento6/Bento6Variant4.svelte";
  import CardImage1 from "$lib/indieui/components/cards/cardimages/CardImage1.svelte";
  import CardImage2 from "$lib/indieui/components/cards/cardimages/CardImage2.svelte";
  import CardImage3 from "$lib/indieui/components/cards/cardimages/CardImage3.svelte";
  import CardImage4 from "$lib/indieui/components/cards/cardimages/CardImage4.svelte";
  import MultiLayerCard1 from "$lib/indieui/components/cards/muiltlayers/MultiLayerCard1.svelte";
  import MultiLayerCard2 from "$lib/indieui/components/cards/muiltlayers/MultiLayerCard2.svelte";
  import MultiLayerCard3 from "$lib/indieui/components/cards/muiltlayers/MultiLayerCard3.svelte";
  import MultiLayerCard4 from "$lib/indieui/components/cards/muiltlayers/MultiLayerCard4.svelte";
  import SimpleCardVariant1 from "$lib/indieui/components/cards/simple/SimpleCardVariant1.svelte";
  import SimpleCardVariant2 from "$lib/indieui/components/cards/simple/SimpleCardVariant2.svelte";
  import SimpleCardVariant3 from "$lib/indieui/components/cards/simple/SimpleCardVariant3.svelte";
  import SimpleCardVariant4 from "$lib/indieui/components/cards/simple/SimpleCardVariant4.svelte";
  import SimpleCardVariant5 from "$lib/indieui/components/cards/simple/SimpleCardVariant5.svelte";
  import SimpleCardVariant6 from "$lib/indieui/components/cards/simple/SimpleCardVariant6.svelte";
  import SkeletonVariant1 from "$lib/indieui/components/loaders/skeleton/skeletonVariant1.svelte";
  import SkeletonVariant2 from "$lib/indieui/components/loaders/skeleton/skeletonVariant2.svelte";
  import HeaderExample from "$lib/indieui/components/other/header/examples/HeaderExample.svelte";
  import Separator from "$lib/indieui/components/other/separator/Separator.svelte";
  import { fade, slide } from "svelte/transition";
  $: routeId = $page.url.pathname;
  let innerWidth = 0;
</script>

<!-- The rest of the file demonstrates the use of many Indie UI components, cards, badges, separators, and more. See the file for full implementation details. -->
```

---

For the full showcase and layout, see the +page.svelte file directly in this folder.
