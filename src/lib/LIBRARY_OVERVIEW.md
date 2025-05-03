# Library Overview: `/src/lib`

This folder contains the core libraries, UI components, utilities, and animation modules for the project. It is organized into subfolders by feature, with each subfolder containing Svelte components, TypeScript utilities, or supporting files.

---

## Best Practices for Svelte/SvelteKit Libraries
- **Component Documentation:**
  - Use JSDoc comments (`/** ... */`) for exported props in `<script>` blocks.
  - Use special HTML comments starting with `@component` for component-level documentation. These support Markdown and code blocks, and are surfaced by tools like VS Code.
  - Example:
    ```svelte
    <script>
      /** What should we call the user? */
      export let name = 'world';
    </script>
    <!--
    @component
    This is a documented component. Usage:
    ```svelte
    <MyComponent name="Arethra" />
    ```
    -->
    <main>Hello, {name}</main>
    ```
- **File Naming & Structure:**
  - Organize related components in folders (e.g., `components/ui`, `magicui/animations`).
  - Use `index.ts` for module entry points when exporting multiple modules.
- **Typescript:**
  - Prefer `.ts` for utility and type files, and `.svelte` for components.
- **Reusability:**
  - Components and utilities are designed for reusability across the project.

---

## Folder Structure & Key Files

- **aceternity-ui/**: Advanced UI components and web widgets.
- **carbon/**: Carbon design system integrations.
- **components/**: Core UI building blocks (buttons, tabs, badges, etc.), organized by type.
- **examples/**: Example Svelte components and demo code for learning and experimentation.
- **framer-motion/**: Utilities and components for Framer Motion-style animations in Svelte.
- **indieui/**: Indie UI components and supporting files.
- **luxe/**: Luxe UI components, cards, and advanced layouts.
- **magicui/**: Animation, backgrounds, text effects, and magic UI elements.
- **motionExamples/**: Motion and animation example components.
- **svg/**: SVG assets and icon libraries.
- **syntaxUI/**: Syntax highlighting UI components.
- **templates/**: Template files and starter layouts.
- **utils.ts**: Utility functions for use across the codebase.
- **index.ts**: Main entry point for exporting all public modules from `/lib`.

---

## Example: Documenting a Svelte Component

```svelte
<script>
  /** The user's display name */
  export let name = 'world';
</script>
<!--
@component
A greeting component that displays a personalized hello.
- Usage:
  ```svelte
  <Greeting name="Jane" />
  ```
-->
<main>
  <h1>Hello, {name}</h1>
</main>
```

---

## How to Read and Use This Library
- **Importing Components:**
  - Import components by referencing their path under `$lib`, e.g.:
    ```js
    import Button from '$lib/components/ui/button/button.svelte';
    ```
- **Using Utilities:**
  - Import helpers from `utils.ts` or other utility modules as needed.
- **Exploring Examples:**
  - Browse the `examples/` folder for ready-to-use demo components and learning resources.
- **Animations & Effects:**
  - Use `magicui/` and `framer-motion/` for advanced animation and UI effects.

---

## References
- [Svelte Docs: Component Structure](https://svelte.dev/docs)
- [Svelte Docs: Documenting Components](https://svelte.dev/docs/faq#how-do-i-document-components)
- [SvelteKit Docs: Project Structure](https://kit.svelte.dev/docs/project-structure)

---

**This folder is the foundation of your Svelte/SvelteKit UI and animation toolkit. All components and utilities should be documented using the above conventions for maximal clarity and LLM/developer usability.**
