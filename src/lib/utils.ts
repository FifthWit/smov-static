import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getCookieAsBoolean(name: string): boolean {
    const cookies = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${name}=`));
    const value = cookies ? cookies.split("=")[1] : null;
    return value === "true"; // Convert the string "true" to a boolean
}
