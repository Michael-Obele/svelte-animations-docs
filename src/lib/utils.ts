import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

/**
 * Conditionally joins class names.
 * Uses clsx to construct the class string and twMerge to resolve Tailwind CSS class conflicts.
 * @param {...ClassValue} inputs - A list of class values (strings, arrays, or objects).
 * @returns {string} A string of combined and merged class names.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * A boolean constant that is true if the code is running in a browser environment,
 * and false otherwise (e.g., during server-side rendering).
 * Useful for conditional logic that should only execute on the client-side.
 */
export const isBrowser = typeof document !== "undefined";

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

/**
 * A Svelte transition function that creates a fly-in and scaling effect.
 * The element transitions from a specified offset (y and/or x) and scale (start) to its natural position and scale (1).
 * @param {Element} node - The HTML element to apply the transition to.
 * @param {FlyAndScaleParams} [params={ y: -8, x: 0, start: 0.95, duration: 150 }] - Optional parameters for the transition.
 * @param {number} [params.y=-8] - The initial vertical offset (pixels).
 * @param {number} [params.x=0] - The initial horizontal offset (pixels).
 * @param {number} [params.start=0.95] - The initial scale factor.
 * @param {number} [params.duration=150] - The duration of the transition in milliseconds.
 * @returns {TransitionConfig} The Svelte transition configuration object.
 */
export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};