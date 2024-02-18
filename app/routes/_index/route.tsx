import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

import { homeQuery } from '~/sanity/queries';
import { SanityPageWithBuilder } from '~/types/sanity';
import { client } from '~/sanity/client';
// import { ScrollView } from "~/components/scroll-view";
// import { Header } from "~/components/header";
import { PageWrapper } from '~/components/page-wrapper';
import { Heading } from '~/components/heading';
import { PageContent } from '~/components/page-content';
import { PageBuilder } from '~/components/page-builder';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const home = await client.fetch<SanityPageWithBuilder>(homeQuery);

  return json(
    { home },
    { headers: { 'Cache-Control': 'max-age=1, stale-while-revalidate=59' } },
  );
};

export default function Index() {
  const { home } = useLoaderData<typeof loader>();

  return (
    <PageWrapper>
      <Heading level="h1">{home.title}</Heading>
      <PageContent>
        <PageBuilder pageBuilder={home.pageBuilder} />
      </PageContent>
    </PageWrapper>
  );
}
