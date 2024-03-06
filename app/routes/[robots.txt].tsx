export function loader() {
  const robotText = `
        User-agent: Googlebot
        Disallow: /nogooglebot/

        User-agent: *
        Allow: /
        Allow: /static/og/*

        Sitemap: https://lisaknipfer.com/sitemap.xml`;

  return new Response(robotText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
