import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HeaderName } from '~/types/header-name.enum';

const DEFAULT_MAX_AGE = 1;
const DEFAULT_STALE_WHILE_REVALIDATE = 59;

export function getCacheControl(
  maxAge = DEFAULT_MAX_AGE,
  staleWhileRevalidate = DEFAULT_STALE_WHILE_REVALIDATE,
) {
  return `s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`;
}

export function getCacheControlHeaders(
  maxAge = DEFAULT_MAX_AGE,
  staleWhileRevalidate = DEFAULT_STALE_WHILE_REVALIDATE,
) {
  return {
    [HeaderName.CACHE_CONTROL]: getCacheControl(maxAge, staleWhileRevalidate),
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
