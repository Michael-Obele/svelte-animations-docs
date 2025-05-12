import type { ComponentType } from "svelte";

/**
 * Defines the structure for an Aceternity UI component's metadata.
 * This is used to generate documentation pages and component showcases.
 */
export type AceternityUI = {
  /** A unique identifier for the component (e.g., "lens", "bento-grid"). */
  id: string;
  /** The display title of the component. */
  title: string;
  /** A brief description of the component and its purpose. */
  desc?: string;
  /** An array of tags or keywords associated with the component (e.g., "Cards", "Special", "Tailwind CSS"). */
  tags?: string[];
  /** Optional configuration for the main preview of the component. */
  preview?: PreviewComponent;
  /** An array of installation instructions or steps. */
  installations: Installation[];
  /** Optional array of usage examples for the component. */
  examples?: Examples[];
};

/**
 * Represents a single set of installation instructions for a component.
 */
type Installation = {
  /** An optional description for this specific set of installation steps. */
  desc?: string;
  /** An array of code blocks related to the installation. */
  allcode: InstallationCode[];
};

/**
 * Defines the structure for a single code block within installation instructions or examples.
 */
type InstallationCode = {
  /** A title for the code block (e.g., "Install dependencies", "Add Util File"). */
  title: string;
  /** The actual code snippet as a string. */
  code: string;
  /** An optional description for this specific code snippet. */
  desc?: string;
  /** The programming language of the code snippet (e.g., "shellscript", "ts", "svelte"). */
  language?: string;
  /** An optional filename associated with the code snippet (e.g., "Terminal", "lib/util.ts"). */
  filename?: string;
  /** Optional CSS class(es) to apply to the code block container for styling (e.g., for scrollbars or height). */
  class?: string;
};

/**
 * Defines the structure for a component's preview section in the documentation.
 */
type PreviewComponent = {
  /** The Svelte component used for rendering the preview. */
  comp: ComponentType;
  /** An array of code snippets related to this preview. */
  allcode: SingleCode[];
  /** Optional flag indicating if the preview should be displayed in a grid layout. */
  isgrid?: boolean;
  /** Optional flag indicating if the preview content should be centered within its grid cell. */
  isgridCenter?: boolean;
  /** Optional CSS class(es) to apply to the preview container. */
  class?: string;
};

/**
 * Defines the structure for an example usage of a component.
 */
type Examples = {
  /** The title of the example. */
  title: string;
  /** An optional description of the example. */
  desc?: string;
  /** The preview configuration for this example. */
  preview: PreviewComponent;
};

/**
 * Defines the structure for a single code snippet, typically used within previews or examples.
 */
type SingleCode = {
  /** The actual code snippet as a string. */
  code: string;
  /** The programming language of the code snippet (e.g., "svelte", "typescript"). */
  language?: string;
  /** An optional filename associated with the code snippet (e.g., "LensPreview.svelte"). */
  filename?: string;
  /** Optional CSS class(es) to apply to the code block container for styling. */
  class?: string;
};
