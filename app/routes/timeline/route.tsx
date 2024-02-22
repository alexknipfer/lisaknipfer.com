import { useLoaderData } from '@remix-run/react';
import { HeadersFunction, json } from '@remix-run/node';

import { pageBySlugQuery } from '~/sanity/queries';
import { SanityPageWithBuilder } from '~/types/sanity';
import { client } from '~/sanity/client';
import { PageWrapper } from '~/components/page-wrapper';
import { Heading } from '~/components/heading';
import { PageContent } from '~/components/page-content';
import { PageBuilder } from '~/components/page-builder';
import { getCacheControl, getCacheControlHeaders } from '~/lib/utils';
import { HeaderName } from '~/types/header-name.enum';

export const loader = async () => {
  const timeline = await client.fetch<SanityPageWithBuilder>(pageBySlugQuery, {
    slug: 'timeline',
  });

  return json(
    { timeline },
    {
      headers: getCacheControlHeaders(),
    },
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  [HeaderName.CACHE_CONTROL]:
    loaderHeaders.get(HeaderName.CACHE_CONTROL) || getCacheControl(),
});

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
