# File: /lib/index.ts

This file serves as the main entry point for exporting all public modules, components, and utilities from the `/lib` directory.

## Best Practices
- Export only what should be public API for consumers of the library.
- Use clear and descriptive export names.
- Keep the file organized by grouping related exports together.
- Update this file when adding or removing major components or utilities.

## Example
```ts
export { default as Button } from './components/ui/button/button.svelte';
export { cn } from './utils';
// ...other exports
```

---

**Consumers can import from `$lib` directly for easy access to all public modules:**
```ts
import { Button, cn } from '$lib';
```

---

**Keep this file up to date for a smooth developer experience.**
