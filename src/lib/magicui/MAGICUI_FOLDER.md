# Folder: /lib/magicui

This folder contains animation utilities, backgrounds, text effects, and magic UI elements for Svelte and SvelteKit.

## Structure
- **SpecialEffects/**: Special animation and effect components
- **animations/**: Animation utilities
- **backgrounds/**: Animated backgrounds and patterns
- **buttons/**: Animated and interactive button components
- **components/**: General magic UI components
- **device-mocks/**: Device mockup components
- **text-animations/**: Animated text and text effects

---

## Example: Animated Gradient Text
```svelte
<script>
  /** Text to animate */
  export let text = 'Magic!';
</script>
<!--
@component
Animated gradient text component for eye-catching UI.
-->
<span class="animated-gradient">{text}</span>
```

---

**Use this folder for advanced animation and UI effects in your Svelte apps.**
