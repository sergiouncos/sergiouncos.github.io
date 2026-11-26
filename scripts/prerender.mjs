import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

await build({
  logLevel: 'warn',
  build: {
    ssr: 'entry-server.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.js' } },
  },
});

const { render, PAGES, SITE_URL } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const profilePattern = /(<script\s+id="portfolio-profile"\s+type="application\/ld\+json">)([\s\S]*?)(<\/script>)/;
const profileMatch = template.match(profilePattern);
if (!profileMatch) throw new Error('Profile metadata is missing from index.html');
const profile = JSON.parse(profileMatch[2]);

for (const [page, { path, title, description }] of Object.entries(PAGES)) {
  const url = `${SITE_URL}${path}`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, (_, before, after) => `${before}${url}${after}`)
    .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*(")/g,
      (_, before, after) => `${before}${escapeHtml(description)}${after}`)
    .replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*(")/g,
      (_, before, after) => `${before}${escapeHtml(title)}${after}`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, before, after) => `${before}${url}${after}`)
    .replace(profilePattern, (_, before, _data, after) =>
      `${before}${JSON.stringify({ ...profile, url, name: title, description }).replaceAll('<', '\\u003c')}${after}`);
  const content = await render(page);
  if (/<!--\$[?!]-->|<script\b|<div hidden id="S:/.test(content)) {
    throw new Error(`Incomplete prerendered content for ${path}`);
  }
  if (!html.includes('<div id="root"></div>')) throw new Error('Root element is missing from index.html');
  html = html.replace('<div id="root"></div>', () => `<div id="root">${content}</div>`);
  const directory = resolve('dist', `.${path}`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
  console.log(`Generated ${path}`);
}

const urls = Object.values(PAGES).map(({ path }) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n');
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
