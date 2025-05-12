
/**
 * Provides the source code string for the `cn` utility function.
 * This function is used for conditionally joining class names, leveraging
 * `clsx` for class name construction and `tailwind-merge` for resolving
 * Tailwind CSS class conflicts.
 */
export let cncode = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

 export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
 }
`
//  Download npm i  clsx tailwind-merge