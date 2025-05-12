```markdown
# File: /lib/aceternity-ui/components/allAceternityUI.ts

This TypeScript file serves as the central registry and aggregation point for all Aceternity UI Svelte components. It is crucial for the documentation site as it provides a structured collection of metadata, preview components, installation instructions, and example code for each UI component in the library.

## Purpose

The primary purpose of `allAceternityUI.ts` is to create a single, easily consumable array (`allAceternityUI`) that the documentation website can use to dynamically generate pages for each component. This approach promotes modularity and makes it easy to add or update components in the documentation.

## Structure

The file generally follows this structure:

1.  **Type Imports**:
    *   Imports the `AceternityUI` type from `./alltypes.ts`. This type defines the expected structure for each component's entry in the `allAceternityUI` array.

    ```typescript
    import type { AceternityUI } from "./alltypes";
    ```

2.  **Component and Example Imports**:
    *   Imports the main Svelte component (e.g., `Lens.svelte`).
    *   Imports the raw source code of the main Svelte component using the `?raw` query (e.g., `LensCode from "./Lens/Lens.svelte?raw";`). This is a Vite-specific feature that allows importing files as strings.
    *   Imports the primary preview component for the component (e.g., `LensPreview.svelte`).
    *   Imports the raw source code of the preview component (e.g., `LensPreviewCode from "./Lens/LensPreview.svelte?raw";`).
    *   Imports any additional example components and their raw source code (e.g., `LensWholeComp.svelte`, `LensWholeCompCode from "./Lens/examples/LensWholeComp.svelte?raw";`).
    *   This pattern is repeated for every component family (Lens, BentoGrid, etc.).

    ```typescript
    // Example for Lens Component
    import Lens from "./Lens/Lens.svelte";
    import LensCode from "./Lens/Lens.svelte?raw";
    import LensPreview from "./Lens/LensPreview.svelte";
    import LensPreviewCode from "./Lens/LensPreview.svelte?raw";
    import LensWholeComp from "./Lens/examples/LensWholeComp.svelte";
    import LensWholeCompCode from "./Lens/examples/LensWholeComp.svelte?raw";
    // ... and so on for other components
    ```

3.  **Component Manifest Imports**:
    *   For many components, instead of detailing their structure directly in this file, it imports pre-defined `AceternityUI` objects from their respective manifest files (e.g., `acetTextHoverEffect` from `./text-hover-effect/acetTextHover.ts`). These manifest files encapsulate all the details for a specific component.

    ```typescript
    import { featuresSections } from "./feature-sections/feature-sections";
    import { acetTextHoverEffect } from "./text-hover-effect/acetTextHover";
    import { acetSvgMaskEffect } from "./SvgMaskEffect/acetSvgMask";
    // ... and many more
    ```

4.  **`allAceternityUI` Array Definition**:
    *   This is the main export of the file. It's an array where each element is an `AceternityUI` object.
    *   Each object represents a component and contains:
        *   `id`: A unique string identifier (e.g., "lens", "bento-grid").
        *   `title`: The display name of the component.
        *   `desc`: A brief description.
        *   `tags`: An array of keywords.
        *   `preview`: An object detailing the main preview:
            *   `comp`: The Svelte component to render for the preview.
            *   `allcode`: An array of `SingleCode` objects (code snippet, language, filename) for the preview.
            *   `isgrid`, `isgridCenter` (optional): Flags for layout styling in the docs.
        *   `installations`: An array of `Installation` objects, each containing:
            *   `desc` (optional): Description for the installation block.
            *   `allcode`: An array of `InstallationCode` objects (title, code, language, filename, optional class). This typically includes steps for installing dependencies, adding utility files, and copying component source code.
        *   `examples` (optional): An array of `Examples` objects, each with a `title`, `desc`, and a `preview` object similar to the main component preview.

    ```typescript
    export let allAceternityUI: AceternityUI[] = [
      // Example for the "Lens" component (structure might be simplified here)
      {
        id: "lens",
        title: "Lens",
        desc: "A lens component to zoom into images, videos, or practically anything.",
        tags: ["Cards", "Special", "Tailwind CSS"],
        preview: {
          comp: LensPreview, // The Svelte component for the preview
          allcode: [
            {
              code: LensPreviewCode, // Raw code of LensPreview.svelte
              filename: "LensPreview.svelte",
              language: "svelte",
            },
          ],
          isgridCenter: true,
        },
        installations: [
          {
            desc: "Install the package",
            allcode: [
              {
                title: "Install dependencies",
                code: "npm i clsx tailwind-merge",
                language: "shellscript",
                filename: "Terminal",
              },
              {
                title: "Add Util File",
                code: /* cn function code */,
                filename: "lib/util.ts",
                language: "ts",
              },
              {
                title: "Copy the Source Code",
                code: LensCode, // Raw code of Lens.svelte
                filename: "Lens.svelte",
                language: "svelte",
                class: "no-scrollbar overflow-y-auto h-[400px]",
              },
            ],
          },
        ],
        examples: [
          {
            title: "Basic with Animation",
            desc: "A basic example with animation",
            preview: {
              comp: BaiscWithAnimation, // Example Svelte component
              isgridCenter: true,
              allcode: [
                {
                  code: BaiscWithAnimationCode, // Raw code of BaiscWithAnimation.svelte
                  filename: "LensExample.svelte",
                },
              ],
            },
          },
          // ... more examples
        ],
      },

      // Example for "Bento Grid" which also directly defines its structure
      {
        id: "bento-grid",
        title: "Bento Grid",
        // ... similar structure as Lens, using BasicBentoCode, BentoSkeletonCode etc.
      },

      // Components imported from their own manifest files
      featuresSections,
      acetTextHoverEffect,
      acetSvgMaskEffect,
      acetCompare,
      // ... and so on for all other components
    ];
    ```

## How It Works

The documentation site (likely built with SvelteKit) imports the `allAceternityUI` array. It then iterates over this array to:

*   Create navigation links for each component.
*   Generate individual component pages.
*   On each component page, display:
    *   The title, description, and tags.
    *   The interactive preview component (`preview.comp`).
    *   The source code for the preview (`preview.allcode`).
    *   Detailed installation steps (`installations.allcode`).
    *   Various usage examples with their previews and code (`examples[].preview`).

## Adding a New Component

To add a new component to the Aceternity UI library and its documentation:

1.  **Create the Component**: Develop the Svelte component(s) in a new subdirectory under `svelte-animations-docs/src/lib/aceternity-ui/components/`.
2.  **Create Examples**: Develop one or more example Svelte components showcasing its usage.
3.  **Create a Manifest File (Recommended)**: Create a `acet[ComponentName].ts` file (e.g., `acetMyNewComponent.ts`) within the new component's directory. In this file, define an `AceternityUI` object for your component, importing its Svelte component, raw code, preview component, preview code, examples, and example codes.
4.  **Update `allAceternityUI.ts`**:
    *   Import the new component's manifest (e.g., `import { acetMyNewComponent } from "./my-new-component/acetMyNewComponent";`).
    *   Add the imported `acetMyNewComponent` object to the `allAceternityUI` array.
    *   Alternatively, if it's a simple component or you prefer not to create a separate manifest, you can directly define its `AceternityUI` object within `allAceternityUI.ts` by importing its components and raw code strings at the top of `allAceternityUI.ts`.
5.  **Update `alltypes.ts` (If Necessary)**: If the new component requires new prop structures or types that should be reflected in the documentation structure, update `alltypes.ts` accordingly.

This systematic approach ensures that all necessary information for documenting and showcasing a component is centrally managed and easily accessible to the documentation generation process.
```