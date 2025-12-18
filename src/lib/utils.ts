import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if a service/item is "new" (created within the last 7 days)
 * @param createdAt - The creation date (string or Date)
 * @returns boolean - true if created within 7 days, false otherwise
 */
export const isNew = (createdAt: string | Date): boolean => {
  const creationDate = new Date(createdAt);
  const currentDate = new Date();
  const daysDifference = Math.floor(
    (currentDate.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return daysDifference <= 7;
};

/**
 * Converts an object to FormData
 * @param data - The object to convert
 * @returns FormData instance
 */
export function objectToFormData(data: Record<string, unknown>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // Skip null, undefined, and empty string values
    if (value === null || value === undefined || value === "") return;

    // Handle File objects
    if (value instanceof File) {
      formData.append(key, value);
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(
          `${key}[${index}]`,
          item instanceof File ? item : String(item),
        );
      });
    }
    // Handle objects
    else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    }
    // Handle primitives
    else {
      formData.append(key, String(value));
    }
  });

  return formData;
}
