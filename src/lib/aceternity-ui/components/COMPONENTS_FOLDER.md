# Folder: /lib/aceternity-ui/components

This directory houses the core Svelte components that make up the Aceternity UI Svelte library. Each subdirectory typically contains a specific UI component, its examples, and related files.

## Structure

-   **Component Subdirectories (e.g., `BentoGrid/`, `Lens/`, `Compare/`, etc.):** Each folder encapsulates a distinct UI component. Inside, you'll generally find:
    -   The main Svelte component file (e.g., `BentoGrid.svelte`).
    -   Associated Svelte files for sub-components or specific parts (e.g., `BentoGridItem.svelte`).
    -   An `examples/` subdirectory showcasing usage patterns.
    -   A manifest file (e.g., `acetBentoGrid.ts`) defining the component's metadata, installation steps, and linking examples for documentation purposes.
    -   Any necessary assets like SVGs or helper scripts specific to the component.
-   **`allAceternityUI.ts`**: This TypeScript file serves as the central registry for all components within the library. It imports the individual component manifest files (like `acetBentoGrid.ts`) and aggregates them into the `allAceternityUI` array. This array is crucial for dynamically generating the documentation site's component pages and showcases.
-   **`alltypes.ts`**: This file defines the shared TypeScript types used throughout the component manifests and potentially within the components themselves. It ensures consistency in how component metadata, installation instructions, and examples are structured (e.g., the `AceternityUI` type).

## Overview

The components cover a wide range of UI elements and effects, including:

-   Layouts (e.g., `BentoGrid`, `LayoutGrid`)
-   Interactive Effects (e.g., `Lens`, `Compare`, `DirectionHover`, `SvgMaskEffect`, `FollowPointer`, `GlareCard`, `WobbleCard`)
-   Background Effects (e.g., `AuroraBackground`, `BackgroundLines`, `BackgroundBeamCollision`, `Sparkles`)
-   Cards & Display (e.g., `CardHoverEffect`, `Cards`, `Timeline`, `AnimatedTestimonials`)
-   Navigation & Input (e.g., `Sidebar`, `FloatingDock`, `PlaceholderVanishInput`, `AnimatedTooltip`)
-   Styling & Decoration (e.g., `HoverBorderGradient`, `Spotlight`, `GlowingEffect`, `ColorfulText`)

Refer to the individual component subdirectories and their manifest (`.ts`) files for detailed API documentation, usage examples, and installation instructions.