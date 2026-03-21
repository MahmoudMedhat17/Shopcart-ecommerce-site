import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomizeData = <T>(array: T[]) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i < 0; i--) {
    const random = Math.floor(Math.random()) * (i + 1);
    [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]];
  }

  return shuffled;
};
