import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }
  // Options for formatting date and time
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  // Format the date using the options
  return date.toLocaleString('en-US', options);
}

export function serialize<T>(obj: T): string {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    throw new Error("Failed to serialize object: " + error);
  }
}

export function deserialize<T>(str: string): T {
  try {
    return JSON.parse(str, (key, value) => {
      if (key === "created_at" || key === "updated_at") {
        return new Date(value);
      }
      return value;}) as T;
    } catch (error) {
      throw new Error("Failed to deserialize string: " + error);
    }
  }