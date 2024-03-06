import { Await, useLoaderData } from '@remix-run/react';
import {
  HeadersArgs,
  LoaderFunctionArgs,
  MetaFunction,
  defer,
} from '@remix-run/node';

import { pageBySlugQuery } from '~/sanity/queries';
import { SanityPageWithBuilder } from '~/types/sanity';
import { client } from '~/sanity/client';
import { PageWrapper } from '~/components/page-wrapper';
import { Heading } from '~/components/heading';
import { PageContent } from '~/components/page-content';
import { Suspense } from 'react';
import { RecentlyPlayedTracks } from './recently-played-tracks';
import { spotify } from '~/lib/spotify.server';
import {
  getCacheControl,
  getCacheControlHeaders,
  getCommonPageMeta,
} from '~/lib/utils';
import { HeaderName } from '~/types/header-name.enum';

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  getCommonPageMeta(data?.page);

export async function loader({ request }: LoaderFunctionArgs) {
  const tracks = spotify.getRecentlyPlayed();
  const page = await client.fetch<SanityPageWithBuilder>(pageBySlugQuery, {
    slug: new URL(request.url).pathname,
  });

  return defer({ page, tracks }, { headers: getCacheControlHeaders() });
}

export function headers({ loaderHeaders }: HeadersArgs) {
  return {
    [HeaderName.CACHE_CONTROL]:
      loaderHeaders.get(HeaderName.CACHE_CONTROL) || getCacheControl(),
  };
}

export default function Timeline() {
  const { page, tracks } = useLoaderData<typeof loader>();

  return (
    <PageWrapper>
      <Heading level="h1" className="mb-6">
        {page.title}
      </Heading>
      <PageContent>
        <Suspense>
          <Await resolve={tracks}>
            {(tracks) => <RecentlyPlayedTracks tracks={tracks} />}
          </Await>
        </Suspense>
      </PageContent>
    </PageWrapper>
  );
}
