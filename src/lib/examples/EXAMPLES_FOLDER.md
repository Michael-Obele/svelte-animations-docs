# Folder: /lib/examples

This folder contains example Svelte components and demo code for learning and experimentation. It is a resource for developers to understand how to use core components and utilities in real scenarios.

## Structure
- **comp/**: Example components demonstrating advanced Svelte features (e.g., transitions, crossfade, etc.)
- **AnimationsExamples.ts**: TypeScript file with animation demo logic
- **Examples.md**: Markdown summary of available examples

---

## Example: Crossfade Demo
```svelte
<script lang="ts">
  import { crossfade } from 'svelte/transition';
  let [send, receive] = crossfade({ duration: 400 });
</script>
<!--
@component
Example of using Svelte's crossfade transition for animated layout changes.
-->
<div on:click={() => ...} in:receive={{ key: 'layouta' }} out:send={{ key: 'layouta' }}>...</div>
```

---

**Browse this folder for ready-to-use demo components and learning resources.**
