import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseContent = (rawContent) => {
	const lines = rawContent.split("\n\n");
	const parsed = [];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let buffer: any[] = [];

	// biome-ignore lint/complexity/noForEach: <explanation>
	lines.forEach((line) => {
		if (line.startsWith("\\[") || line.startsWith("\\(")) {
			parsed.push({ type: "math", content: line });
		}
	});

	console.log(parsed);

	return parsed;
};

export type Chat = {
	message: string;
	type: string;
	model_id: string;
};
