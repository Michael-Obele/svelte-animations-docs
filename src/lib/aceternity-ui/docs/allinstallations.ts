/**
 * @file This file defines the structure for installation guides and provides
 * a collection of installation steps for setting up the project environment,
 * including SvelteKit, Tailwind CSS, and common utilities.
 */

/**
 * Defines the structure for a single installation guide section.
 */
type Installation = {
  /** A unique identifier for the installation guide (e.g., "install-sveltekit"). */
  id: string;
  /** The display title of the installation guide. */
  title: string;
  /** A brief description of what this installation guide covers. */
  desc: string;
  /** An array of code blocks and instructions for this installation section. */
  allcode: Code[];
};

/**
 * Defines the structure for a single code block or instruction within an installation guide.
 */
type Code = {
  /** A title for the code block or step (e.g., "Create a new project", "Install Tailwind CSS"). */
  title: string;
  /** The actual code snippet or command as a string. */
  code: string;
  /** An optional description elaborating on this specific step or code snippet. */
  desc?: string;
  /** The programming or shell language of the code snippet (e.g., "shellscript", "ts", "svelte"). */
  language?: string;
  /** An optional filename associated with the code snippet (e.g., "Terminal", "tailwind.config.ts"). */
  filename?: string;
};

/**
 * An array containing various installation guides for the project.
 * Each guide provides step-by-step instructions for different setup processes.
 */
export let allInstallations: Installation[] = [
  {
    id: "install-sveltekit",
    title: "Install Sveltekit",
    desc: "Install Sveltekit using npm. This guide walks through creating a new SvelteKit project, selecting a template, and configuring TypeScript and other optional tools like Prettier and Tailwind CSS.",
    allcode: [
      {
        title: "Create a new project",
        code: "npm create svelte@latest folder_name",
        language: "shellscript",
        filename: "Terminal",
      },
      {
        title: "On installation, you'll see the following prompts:",
        code: `Welcome to Sveltekit!

Which Svelte app template?
  > SvelteKit demo app 
  > Skeleton project ✅ 
  > Library project 
        
Add type checking with TypeScript?
  > Yes, using TypeScript syntax 
  > Yes, using JavaScript with JSDoc comments
  > No 
        
Select additional options 
  > Add ESLint for code linting
  > Add Prettier for code formatting ✅
  > Add Playwright for browser testing
  > Add Vitest for unit testing
  > Try the Svelte 5 preview
        
cd folder_name
npm install

npx svelte-add
CSS
  > Tailwind CSS ✅
# press enter to continue

Which package manager do you want to install dependencies with?
  > None
  > npm ✅
  > pnpm
  > yarn
  > bun

Successfully installed dependencies 
# ✨ Yeep! Your project is ready to go! ✨
        `,
        desc: "Select the options as per your requirement and proceed with the installation. Make sure to install Tailwind CSS for styling if prompted or follow the separate Tailwind CSS installation guide.",
        language: "shellscript",
        filename: "Terminal Output",
      },
      {
        title: "Start the development server",
        code: "npm run dev -- --open",
        language: "shellscript",
        filename: "Terminal",
      },
    ],
  },
  {
    id: "install-tailwindcss",
    title: "Install Tailwind CSS",
    desc: "Install Tailwind CSS with SvelteKit using the `svelte-add` utility. This is the recommended way to integrate Tailwind into a SvelteKit project.",
    allcode: [
      {
        title: "Create your project (if not already done)",
        code: `npm create svelte@latest folder_name
cd folder_name`,
        language: "shellscript",
        filename: "Terminal",
      },
      {
        title: "Install Tailwind CSS",
        code: `npx svelte-add@latest tailwindcss`,
        desc: "This command will install Tailwind CSS and configure it for your SvelteKit project. It typically modifies `svelte.config.js`, `vite.config.ts`, creates `tailwind.config.ts` and `postcss.config.cjs`, and updates your `app.html` and a basic layout/page.",
        language: "shellscript",
        filename: "Terminal",
      },
      {
        title: "Start your development server",
        code: "npm run dev -- --open",
        language: "shellscript",
        filename: "Terminal",
      },
    ],
  },
  {
    id: "add-utilities",
    title: "Add utilities",
    desc: "Install and configure commonly used utilities for Svelte Aceternity UI, such as `svelte-motion` for animations and `clsx` with `tailwind-merge` for managing CSS classes.",
    allcode: [
      {
        title: "Install dependencies",
        code: `npm i svelte-motion clsx tailwind-merge`,
        language: "shellscript",
        filename: "Terminal",
        desc: "`svelte-motion` is for animations, `clsx` for constructing class strings conditionally, and `tailwind-merge` for intelligently merging Tailwind CSS classes without style conflicts.",
      },
      {
        title: "Add utility function for class names (`cn`)",
        code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
        language: "typescript",
        filename: "src/lib/utils.ts",
        desc: "This utility function (`cn`) helps in conditionally applying and merging Tailwind CSS classes.",
      },
      {
        title: "Base Tailwind Config File (with color variables plugin)",
        code: `import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import svgToDataUri from "mini-svg-data-uri";
import type { Config } from "tailwindcss";
 
const config: Config= {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
   plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [\`--\${key}\`, val])
  );

  addBase({
    ":root": newVars, // Defines CSS variables in the :root scope
  });
}

export default config; // Ensure the config is exported
`,
        language: "typescript",
        filename: "tailwind.config.ts",
        desc: "A base `tailwind.config.ts` including a plugin to expose all Tailwind colors as CSS variables (e.g., `var(--blue-500)`). This can be useful for dynamic styling in Svelte components.",
      },
    ],
  },
];
