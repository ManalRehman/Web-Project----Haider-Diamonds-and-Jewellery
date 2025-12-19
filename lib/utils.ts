import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Base URL for the Express API (used on the client)
// Configure via NEXT_PUBLIC_API_BASE_URL for production / deployment.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export function getApiUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
