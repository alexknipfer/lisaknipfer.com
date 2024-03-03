// import { LoaderFunctionArgs } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
// import { ImageResponse } from '@vercel/og';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
// import { readFileSync } from 'fs';
// import { fileURLToPath } from 'url';

// import { OpenGraphImage } from '~/components/og-image';

// const getFont = () => readFileSync('./public/assets/fonts/GeistMedium.otf');

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const testUrl = new URL('/assets/fonts/GeistMedium.otf', url.origin);
  console.log('test url: ', testUrl);
  const fontData = await fetch(testUrl).then((res) => res.arrayBuffer());

  // return new ImageResponse(<OpenGraphImage />, {
  //   width: 1200,
  //   height: 630,
  //   fonts: [
  //     {
  //       name: 'Geist',
  //       data: fontData,
  //       style: 'normal',
  //     },
  //   ],
  // });
  const jsx = <div style={{ color: 'black' }}>hello, world</div>;
  // From satori docs example
  const svg = await satori(jsx, {
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
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const data = pngData.asPng();
  return new Response(data, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
