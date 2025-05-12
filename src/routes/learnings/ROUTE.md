# `/learnings` Route Documentation

This document details the structure and functionality of the `/learnings` route in the Svelte Animations documentation project. This route serves as an educational resource for Framer Motion animations implemented with Svelte.

## Route Structure

```
/learnings/
├── +layout.svelte          # Shared layout with sidebar navigation
├── +page.svelte            # Root page with animation examples list
└── [learningID]/           # Dynamic route for animation tutorials
    └── +page.svelte        # Individual animation tutorial page
```

## Layout (`+layout.svelte`)

The `/learnings` route uses a sidebar navigation layout that provides access to all the animation tutorials:

```svelte
<script>
  import { motionLearnings } from '$lib/framer-motion/MotionsLearnings';
  import { page } from "$app/stores";
  import SideNav from "$lib/components/dev/tags/SideNav.svelte";
  $: routeID = $page.url.pathname.split("/");
</script>

<SideNav examplesList={motionLearnings}>
  <slot></slot>
</SideNav>
```

This layout:
- Imports motion animation examples from the `motionLearnings` array
- Uses the `SideNav` component to provide navigation for all animation tutorials
- Renders child content via the `<slot>` element

## Root Page (`+page.svelte`)

The root page at `/learnings` serves as an introduction to Framer Motion with Svelte, displaying a card-based grid of all available animation tutorials:

```svelte
<script>
  import HeadingOne from "$lib/components/dev/tags/HeadingOne.svelte";
  import Para from "$lib/components/dev/tags/Para.svelte";
  import { motionLearnings } from "$lib/framer-motion/MotionsLearnings";
  import ShowCard from "$lib/framer-motion/layouts/ShowCard.svelte";
</script>

<svelte:head>
  <title>Framer Motion using Svelte</title>
  <meta name="description" content="Learn Framer Motion Animations using Svelte" />
  <!-- Additional SEO tags -->
</svelte:head>

<div>
  <div class="px-10 mt-8">
    <HeadingOne>Framer Motion using Svelte</HeadingOne>
    <Para>
      Framer Motion is a production-ready motion library for React. we are going
      to use <a href="https://svelte-motion.gradientdescent.de">Svelte-Motion</a>
      which is a port of Framer Motion for Svelte.
    </Para>
  </div>
  <div class="flex justify-center items-center flex-wrap gap-6 mt-5">
    {#each motionLearnings as item}
      <ShowCard {item} />
    {/each}
  </div>
</div>
```

The page includes:
- Informative heading and introduction text
- Link to Svelte-Motion documentation
- Grid of animation example cards using `ShowCard` component
- Comprehensive SEO metadata

## Dynamic Tutorial Route (`/learnings/[learningID]`)

This dynamic route renders individual animation tutorials based on the `learningID` parameter:

```svelte
<script>
  import { page } from "$app/stores";
  import { motionLearnings } from "$lib/framer-motion/MotionsLearnings";
  
  $: exampleID = $page.params.learningID;
  $: singlePage = motionLearnings.filter(
    (example) => example.id === Number(exampleID)
  )[0];
</script>
```

Each tutorial page includes:
1. A "Back" navigation link
2. The animation example title
3. Live component demonstration in a `ComponentView` container
4. Installation instructions for dependencies
5. Source code with syntax highlighting

## Data Source

The route relies on the `motionLearnings` array which contains objects with properties:
- `id`: Numeric identifier used in the URL
- `name`: Display name for the animation example
- `desc`: Brief description of the animation
- `component`: The Svelte component that demonstrates the animation
- `code`: Source code (string or array of code objects)
- `image`: Preview image for cards (optional)
- `class`: Additional CSS classes (optional)

## Key Components Used

1. `HeadingOne` and `Para`: Typography components for consistent text styling
2. `ShowCard`: Card component for displaying animation examples on the index page
3. `ComponentView`: Container for live animation demonstrations
4. `CodeBlock`: Code display with syntax highlighting
5. `GradientLine`: Decorative element for visual enhancement

## Animation Categories

The animations covered in this route typically include:
- Basic animations (fade, slide, scale)
- Gesture animations (drag, hover effects)
- Keyframe animations
- Variants and orchestration
- Scroll-triggered animations
- Physics-based animations

This route serves as a comprehensive learning resource for developers looking to implement animations in their Svelte applications using the Svelte-Motion library.