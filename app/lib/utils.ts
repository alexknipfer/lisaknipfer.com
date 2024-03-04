import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HeaderName } from '~/types/header-name.enum';
import { SanityPageWithBuilder } from '../types/sanity';
import { ENV } from './env';

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

export function getCommonPageMeta(data: SanityPageWithBuilder | undefined) {
  if (!data) {
    return [{ title: 'Lisa Knipfer' }];
  }

  const titleElements = [
    { title: data.SEO.metaTitle },
    {
      name: 'twitter:title',
      content: data.SEO.metaTitle,
    },
    {
      property: 'og:title',
      content: data.SEO.metaTitle,
    },
  ];

  const descriptionElements = [
    { name: 'description', content: data.SEO.metaDescription },
    {
      name: 'twitter:description',
      content: data.SEO.metaDescription,
    },
    {
      property: 'og:description',
      content: data.SEO.metaDescription,
    },
  ];

  const imageElements = [
    {
      name: 'twitter:image',
      content: `${ENV.baseUrl}/static/og`,
    },
    {
      property: 'og:image',
      content: `${ENV.baseUrl}/static/og`,
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  ];

  return [...titleElements, ...descriptionElements, ...imageElements];
}
