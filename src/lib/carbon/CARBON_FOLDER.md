# Folder: /lib/carbon

This folder contains Svelte components specifically designed to integrate and manage Carbon Ads (via `cdn.carbonads.com`) within the documentation website.

## Components

*   **`Carbon.svelte`**: Handles the dynamic loading, refreshing (on navigation), and cleanup of the Carbon Ads script for general documentation pages. It includes logic to prevent unnecessary refreshes when navigating between component examples.
*   **`CarbonLuxe.svelte`**: A variant of `Carbon.svelte` specifically tailored for the `/luxe/` section of the documentation, with navigation-refresh logic specific to that route path.

These components are intended for use within the documentation site's layout and are not part of the reusable UI component library itself. They only activate in production environments (`!dev`).