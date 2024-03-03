import { ImageResponse } from '@vercel/og';
import { readFileSync } from 'fs';

import { OpenGraphImage } from '~/components/og-image';

const getFont = () => readFileSync('./public/assets/fonts/GeistMedium.otf');

export async function loader() {
  return new ImageResponse(<OpenGraphImage />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Geist',
        data: getFont(),
        style: 'normal',
      },
    ],
  });
}
