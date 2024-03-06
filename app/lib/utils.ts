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

function buildOGImageUrl(metaName: string, metaDescription: string) {
  const url = new URL('/static/og', ENV.baseUrl);
  url.searchParams.set('title', metaName);
  url.searchParams.set('description', metaDescription);

  return url.toString();
}

export function getCommonPageMeta(data: SanityPageWithBuilder | undefined) {
  if (!data) {
    return [{ title: 'Lisa Knipfer' }];
  }

  const titleElements = [
    { title: `${data.SEO.metaTitle} | Lisa Knipfer}` },
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
      content: buildOGImageUrl(data.SEO.metaTitle, data.SEO.metaDescription),
    },
    {
      property: 'og:image',
      content: buildOGImageUrl(data.SEO.metaTitle, data.SEO.metaDescription),
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  ];

  return [...titleElements, ...descriptionElements, ...imageElements];
}
