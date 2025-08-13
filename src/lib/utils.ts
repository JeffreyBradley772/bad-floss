import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // reference for server-side
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
}

export function getApiUrl(path: string) {
  return `${getBaseUrl()}${path}`;
}
