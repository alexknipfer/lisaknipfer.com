import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import Sidebar from './components/sidebar';
import { client } from './sanity/client';
import { Settings } from './types/sanity';
import { settingsQuery } from './sanity/queries';
import { Header } from './components/header';
import { ENV } from './lib/env';
import styles from './global.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'preload',
    href: '/assets/fonts/GeistVariableVF.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async () => {
  const settings = await client.fetch<Settings>(settingsQuery);

  return json({
    ENV: {
      SANITY_PROJECT_ID: ENV.sanity.projectId,
      SANITY_DATASET: ENV.sanity.dataset,
      SANITY_API_VERSION: ENV.sanity.apiVersion,
    },
    settings,
  });
};

export default function App() {
  const { ENV, settings } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#181a1b" />
        <Meta />
        <Links />
      </head>
      <body>
        <main vaul-drawer-wrapper="">
          <div className="flex bg-white">
            <Sidebar settings={settings} />
            <div>
              <Header settings={settings} />
              <Outlet />
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
