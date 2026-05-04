import puppeteer, { type Browser, type Page } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { spawn, type ChildProcess } from 'child_process';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getAllRoutes } from './routes.js';

const DIST    = path.resolve('dist');
const PORT    = 4173;
const BATCH   = 6; // concurrent Puppeteer tabs

// On Vercel/Linux CI, use the @sparticuz/chromium bundle (it ships the
// system shared libs Vercel's build sandbox is missing). Locally, fall
// back to the user's installed Chrome via PUPPETEER_EXECUTABLE_PATH or
// the standard macOS path.
async function launchOptions() {
  if (process.env.VERCEL || process.platform === 'linux') {
    return {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    };
  }
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  return {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || macChrome,
    headless: true,
  };
}

async function startServer(): Promise<() => void> {
  const proc: ChildProcess = spawn(
    'npx',
    ['sirv', DIST, '--port', String(PORT), '--single', '--quiet'],
    { stdio: 'ignore', shell: process.platform === 'win32' }
  );

  // Poll until the server responds (max ~6 s)
  for (let i = 0; i < 30; i++) {
    try {
      await fetch(`http://localhost:${PORT}/`);
      return () => proc.kill();
    } catch {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  proc.kill();
  throw new Error(`sirv failed to start on port ${PORT}`);
}

async function renderRoute(browser: Browser, route: string): Promise<void> {
  const page: Page = await browser.newPage();
  try {
    await page.goto(`http://localhost:${PORT}${route}`, {
      // networkidle2 allows ≤2 open connections — handles Buildout iframe polling
      waitUntil: 'networkidle2',
      timeout: 30_000,
    });

    // Wait for React to mount (nav is present on every page).
    await page.waitForSelector('nav', { timeout: 15_000 });
    // Wait for react-helmet-async to commit its <head> updates.
    // CDP waitForFunction is unreliable in concurrent batch mode; JS-side
    // evaluate polling is more robust (proven in concurrent 2-tab tests).
    for (let i = 0; i < 200; i++) {
      const hasRh = await page.evaluate(
        () => document.head.querySelector('[data-rh]') !== null
      );
      if (hasRh) break;
      await new Promise(r => setTimeout(r, 50));
    }

    const html = await page.content();

    // /          → dist/index.html  (overwrite Vite's shell with rendered version)
    // /blog/foo  → dist/blog/foo/index.html  (directory index, served by Vercel)
    const segments = route === '/' ? [] : route.split('/').filter(Boolean);
    const outPath  = path.join(DIST, ...segments, 'index.html');

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, html, 'utf-8');
    console.log(`  ✓ ${route}`);
  } finally {
    await page.close().catch(() => {}); // ignore if browser already shutting down
  }
}

async function main(): Promise<void> {
  const routes = getAllRoutes();
  console.log(`\nPrerendering ${routes.length} routes (${BATCH} concurrent)…\n`);

  // Process / last: it overwrites dist/index.html, which sirv uses as the
  // SPA fallback for all other routes. Doing it first would give subsequent
  // routes the rendered homepage as their shell instead of the blank shell.
  const rootRoute    = routes.filter(r => r === '/');
  const nonRootRoutes = routes.filter(r => r !== '/');
  const ordered      = [...nonRootRoutes, ...rootRoute];

  const stopServer = await startServer();
  const browser = await puppeteer.launch(await launchOptions());

  const failed: string[] = [];
  try {
    for (let i = 0; i < ordered.length; i += BATCH) {
      await Promise.all(
        ordered.slice(i, i + BATCH).map(async route => {
          try {
            await renderRoute(browser, route);
          } catch (err) {
            failed.push(route);
            console.error(`  ✗ ${route}: ${(err as Error).message}`);
          }
        })
      );
    }
    if (failed.length > 0) {
      console.error(`\n${failed.length} routes failed: ${failed.join(', ')}`);
      process.exit(1);
    }
    console.log(`\nDone — ${ordered.length} routes prerendered into dist/\n`);
  } finally {
    await browser.close();
    stopServer();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
