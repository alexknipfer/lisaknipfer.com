// import { LoaderFunctionArgs } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
import { ImageResponse } from '@vercel/og';
// import { readFileSync } from 'fs';
// import { fileURLToPath } from 'url';

import { OpenGraphImage } from '~/components/og-image';

// const getFont = () => readFileSync('./public/assets/fonts/GeistMedium.otf');

export async function loader({ request }: LoaderFunctionArgs) {
  // const { protocol, host } = new URL(request.url);
  // console.log('meta: ', import.meta.url);
  // const fontData = await fetch(
  //   new URL('./public/assets/fonts/GeistMedium.otf', import.meta.url),
  // ).then((res) => res.arrayBuffer());
  const url = new URL(request.url);
  const testUrl = new URL('/assets/fonts/GeistMedium.otf', url.origin);
  console.log('test url: ', testUrl);
  const fontData = await fetch(testUrl).then((res) => res.arrayBuffer());

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
