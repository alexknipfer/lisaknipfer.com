import { Await, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs, MetaArgs, defer } from '@remix-run/node';

import { pageBySlugQuery } from '~/sanity/queries';
import { SanityPageWithBuilder } from '~/types/sanity';
import { client } from '~/sanity/client';
import { PageWrapper } from '~/components/page-wrapper';
import { Heading } from '~/components/heading';
import { PageContent } from '~/components/page-content';
import { Suspense } from 'react';
import { RecentlyPlayedTracks } from './recently-played-tracks';
import { spotify } from '~/lib/spotify.server';

export function meta({ data }: MetaArgs<typeof loader>) {
  return [
    { title: `${data?.page.SEO.metaTitle} | Lisa Knipfer` },
    { name: 'description', content: data?.page.SEO.metaDescription },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const tracks = spotify.getRecentlyPlayed();
  const page = await client.fetch<SanityPageWithBuilder>(pageBySlugQuery, {
    slug: new URL(request.url).pathname,
  });

  return defer({ page, tracks });
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
