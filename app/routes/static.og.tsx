import { LoaderFunctionArgs } from '@remix-run/node';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import { OpenGraphImage } from '~/components/og-image';

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const title = requestUrl.searchParams.get('title') ?? 'Lisa Knipfer';
  const description = requestUrl.searchParams.get('description');
  const fontUrl = new URL('/assets/fonts/GeistMedium.otf', requestUrl.origin);
  const response = await fetch(fontUrl);
  const fontData = await response.arrayBuffer();

  const svg = await satori(
    <OpenGraphImage title={title} description={description} />,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );

  return new Response(new Resvg(svg).render().asPng(), {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
