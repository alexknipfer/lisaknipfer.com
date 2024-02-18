import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

import { pageBySlugQuery } from '~/sanity/queries';
import { SanityPageWithBuilder } from '~/types/sanity';
import { client } from '~/sanity/client';
import { PageWrapper } from '~/components/page-wrapper';
import { Heading } from '~/components/heading';
import { PageContent } from '~/components/page-content';
import { PageBuilder } from '~/components/page-builder';

export async function loader() {
  const timeline = await client.fetch<SanityPageWithBuilder>(pageBySlugQuery, {
    slug: 'timeline',
  });

  return json(
    { timeline },
    { headers: { 'Cache-Control': 'max-age=1, stale-while-revalidate=59' } },
  );
}

export default function Timeline() {
  const { timeline } = useLoaderData<typeof loader>();

  return (
    <PageWrapper>
      <Heading level="h1">{timeline.title}</Heading>
      <PageContent>
        <PageBuilder pageBuilder={timeline.pageBuilder} />
      </PageContent>
    </PageWrapper>
  );
}
