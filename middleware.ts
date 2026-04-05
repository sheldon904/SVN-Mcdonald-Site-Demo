const BOT_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'facebookcatalog',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'whatsapp',
  'telegrambot',
  'discordbot',
  'applebot',
  'pinterestbot',
  'rogerbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'w3c_validator',
  'vkshare',
  'redditbot',
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some((bot) => ua.includes(bot));
}

function isStaticAsset(pathname: string): boolean {
  return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|avif|map|json|xml|txt|pdf|mp4|webm)$/i.test(
    pathname
  );
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Skip static assets, API routes, and sitemap/robots
  if (
    isStaticAsset(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_vercel/') ||
    pathname.startsWith('/assets/') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt'
  ) {
    return;
  }

  const userAgent = request.headers.get('user-agent') || '';

  if (!isBot(userAgent)) {
    return;
  }

  // If a prerender token is configured, proxy bot requests to prerender.io
  const prerenderToken = process.env.PRERENDER_TOKEN;

  if (!prerenderToken) {
    // No prerender service configured — fall through to normal SPA rendering.
    // Google can render JS; other bots may see limited content.
    return;
  }

  const prerenderUrl = `https://service.prerender.io/${request.url}`;

  try {
    const prerenderResponse = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'User-Agent': userAgent,
      },
      redirect: 'follow',
    });

    if (prerenderResponse.ok) {
      const html = await prerenderResponse.text();

      // Detect soft 404s: pages that render noindex meta tags are not-found pages.
      // Return a true 404 status so crawlers don't waste crawl budget on them.
      const isSoft404 = html.includes('noindex, nofollow') || html.includes('<h1>404</h1>');
      const status = isSoft404 ? 404 : 200;

      return new Response(html, {
        status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Prerendered': '1',
        },
      });
    }
  } catch {
    // Prerender service failed — fall through to normal SPA rendering
  }

  return;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and API routes.
     * Vercel Edge Middleware processes this before rewrites/redirects.
     */
    '/((?!api/|_vercel/|assets/|images/|.*\\..*).*)',
  ],
};
