# Templates Route Documentation

## Overview

The `/templates` route provides a collection of reusable website templates for different use cases such as portfolios, startups, and SaaS applications. These templates are built with Svelte, TailwindCSS, and various UI components from the library.

## Route Structure

- `+layout.svelte`: Provides the navigation sidebar for all template pages
- `+page.svelte`: Simple landing page for the templates section
- `[templateID]/+page.svelte`: Dynamic route for displaying individual templates
- `saas-template/+page.svelte`: Example of a specific template implementation

## Navigation Component

The templates section uses the `MagicSidebar` component to provide navigation between different templates. This is configured in the `+layout.svelte` file:

```svelte
<script lang="ts">
  import MagicSidebar from "$lib/magicui/components/MagicSidebar/MagicSidebar.svelte";

  type compNavs = {
    id: number;
    heading: string;
    sub: { name: string; link: string; isNew?: boolean }[];
  };
  let componentsNav: compNavs[] = [
    {
      id: 1,
      heading: "Templates",
      sub: [
        { name: "Developer Portfolio", link: "/templates/developer-portfolio" },
        { name: "Startup Template", link: "/templates/startup-template" },
        { name: "SAAS Template", link: "/templates/saas-template", isNew: true },
      ],
    },
  ];
</script>

<MagicSidebar {componentsNav}>
  <slot></slot>
</MagicSidebar>
```

## Dynamic Template Routes

The `[templateID]` dynamic route allows for displaying template details based on the provided ID. It integrates with the `allTemplates` collection from `$lib/templates/allTemplates`.

### Key Features:

- **Breadcrumb Navigation**: Shows the current location in the site hierarchy
- **Template Details**: Displays title, description, and preview image
- **Download & Preview Links**: Provides access to template files and live demos
- **Tech Stack Display**: Shows the technologies used in each template

## Available Templates

### SaaS Template

A comprehensive landing page template for SaaS products with features including:

- Dark mode support
- Mobile responsiveness
- Multiple page sections (Header, Hero, Features, Pricing, etc.)
- SEO optimization
- Scroll animations and micro-interactions

#### Implementation

The SaaS template uses the following components:

- `SubHeading.svelte`: A reusable component for section titles and content
- `RainbowButton`: An animated button component for primary actions
- UI components like Breadcrumb, Button, Badge, and Separator

## Using Templates

Templates can be accessed through:

1. **Direct navigation**: Visit `/templates/{template-id}`
2. **Navigation sidebar**: Use the sidebar to browse available templates
3. **Dynamic loading**: Load templates dynamically using the `[templateID]` parameter

## Template Component Structure

Each template typically includes:

- Title and description
- Preview image
- Feature list
- Tech stack information
- Installation/usage instructions
- Download/preview links

## Adding New Templates

New templates can be added by:

1. Creating a new directory in `/templates` with a descriptive name
2. Adding template files including `+page.svelte` and any required components
3. Adding the template to the `allTemplates` array in `$lib/templates/allTemplates`
4. Updating the navigation sidebar in `+layout.svelte`

## Tech Stack

Templates are built using:

- SvelteKit v2
- TailwindCSS v4
- Shadcn Svelte components
- Svelte Animations library

## Customization

Templates are designed to be customizable through:

- Global configuration files for text, images, and branding
- Component-based architecture for easy replacement or modification
- TailwindCSS classes for styling adjustments
- Dark/light mode support