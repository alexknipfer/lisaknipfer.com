import type { HeadersArgs, MetaArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

import { homeQuery } from '~/sanity/queries';
import { SanityPageWithBuilder } from '~/types/sanity';
import { client } from '~/sanity/client';
import { PageWrapper } from '~/components/page-wrapper';
import { Heading } from '~/components/heading';
import { PageContent } from '~/components/page-content';
import { PageBuilder } from '~/components/page-builder';
import { getCacheControl, getCacheControlHeaders } from '~/lib/utils';
import { HeaderName } from '~/types/header-name.enum';

export function meta({ data }: MetaArgs<typeof loader>) {
  return [
    { title: data?.SEO.metaTitle },
    { name: 'description', content: data?.SEO.metaDescription },
  ];
}

export async function loader() {
  const home = await client.fetch<SanityPageWithBuilder>(homeQuery);

  return json(home, {
    headers: getCacheControlHeaders(1, 59),
  });
}

export function headers({ loaderHeaders }: HeadersArgs) {
  return {
    [HeaderName.CACHE_CONTROL]:
      loaderHeaders.get(HeaderName.CACHE_CONTROL) || getCacheControl(),
  };
}

export default function Index() {
  const home = useLoaderData<typeof loader>();

  return (
    <PageWrapper>
      <Heading level="h1">{home.title}</Heading>
      <PageContent>
        <PageBuilder pageBuilder={home.pageBuilder} />
      </PageContent>
    </PageWrapper>
  );
}
