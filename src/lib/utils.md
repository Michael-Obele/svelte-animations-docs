# File: /lib/utils.ts

This file contains utility functions and helpers used throughout the project.

## Best Practices
- Keep utility functions pure and reusable.
- Use TypeScript for type safety.
- Document each function with JSDoc comments.

## Example Utility Function
```ts
/**
 * Joins class names conditionally.
 * @param {...string[]} classes - List of class names
 * @returns {string} - Combined class string
 */
export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}
```

---

**Import utilities from this file wherever needed:**
```ts
import { cn } from '$lib/utils';
```

---

**All utilities should be documented for clarity and LLM/developer usability.**
