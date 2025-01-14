import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const countToken = (inputText: string) => {
    return inputText
        .trim()
        .split(/\s+/)
        .filter((word) => word).length;
};
