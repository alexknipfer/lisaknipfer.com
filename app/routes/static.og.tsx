import { LoaderFunctionArgs } from '@remix-run/node';
import { ImageResponse } from '@vercel/og';
// import { readFileSync } from 'fs';
// import { fileURLToPath } from 'url';

import { OpenGraphImage } from '~/components/og-image';

// const getFont = () => readFileSync('./public/assets/fonts/GeistMedium.otf');

export async function loader({ request }: LoaderFunctionArgs) {
  const { protocol, host } = new URL(request.url);
  const fontData = await fetch(
    `${protocol}//${host}/assets/fonts/GeistMedium.otf`,
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(<OpenGraphImage />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Geist',
        data: fontData,
        style: 'normal',
      },
    ],
  });
}
