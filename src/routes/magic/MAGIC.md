# Magic Route Documentation

This folder contains the Svelte Magic UI route, showcasing a collection of magical UI components and effects.

## Key Imports

```svelte
<script>
import MagicSidebar from "$lib/magicui/components/MagicSidebar/MagicSidebar.svelte";
import ComponentView from "$lib/luxe/components/codeblock/ComponentView.svelte";
import GradientLine from "$lib/luxe/components/codeblock/GradientLine.svelte";
import DotPattern from "$lib/magicui/backgrounds/DotPattern/DotPattern.svelte";
import AnimatedBeamMultipleInput from "$lib/magicui/components/AnimatedBeam/examples/AnimatedBeamMultipleInput.svelte";
import { cn } from "$lib/utils";
import { allMagicComponents } from "$lib/magicui/AllMagicComponents";
import * as Tabs from "$lib/components/ui/tabs";
import Badge from "$lib/components/ui/badge/badge.svelte";
import Carbon from "$lib/carbon/Carbon.svelte";
</script>
```

## Route Layout
- Uses `MagicSidebar` for navigation.
- Renders a slot for child content.

## Main Page (+page.svelte)
- SEO setup with `SvelteSeo` for meta tags.
- Imports and displays multiple demo components from Magic UI.
- Uses utility `cn` for className merging.

## Dynamic Component Pages ([compID]/+page.svelte)
- Dynamically loads component documentation based on the route parameter.
- Uses `allMagicComponents` to fetch metadata and code for each component.
- Displays code samples with `CodeBlock` and `ComponentView`.
- Handles Tailwind and TypeScript code blocks for each component.

## Example: Dynamic Import Usage
```svelte
<script lang="ts">
import { allMagicComponents } from "$lib/magicui/AllMagicComponents";
$: routeID = $page.params.compID;
$: comp = allMagicComponents.filter((c) => c.id === routeID)[0];
</script>
```

## Notes
- All imports reference `/src/lib` for reusable UI and utility code.
- Components are organized for easy demo and documentation.
- Each [compID] page shows source code and usage for LLM-friendly reading.

---
Keep this doc concise for LLM context. For full source, see the respective `.svelte` files in this folder.
