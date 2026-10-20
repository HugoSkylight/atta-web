#!/usr/bin/env node
// Static site generator for the Atta website. Node built-ins only.
// Reads index.html and the ZH dictionary in i18n.js, then writes the committed Chinese
// home page, the bilingual content pages, sitemap.xml, llms.txt, and robots.txt.
// It never runs page scripts and never serializes a rendered DOM.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { PAGES } from './pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://atta.nz/';
const LAST_MOD = '2026-10-20';
const CHECK = process.argv.includes('--check');

const read = path => readFileSync(join(ROOT, path), 'utf8');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// The ZH object is a pure data literal. Extract it instead of executing the i18n runtime.
const i18nSource = read('i18n.js');
const dictStart = i18nSource.indexOf('const ZH = {');
const dictEnd = i18nSource.indexOf('\n  };', dictStart);
if (dictStart < 0 || dictEnd < 0) throw new Error('i18n.js: cannot find the ZH dictionary');
const ZH = vm.runInNewContext('(' + i18nSource.slice(dictStart + 'const ZH = '.length, dictEnd + 4) + ')');
const t = (key, locale) => locale === 'zh' && Object.hasOwn(ZH, key) ? ZH[key] : key;

const SHELL_KEYS = [
  'Main', 'Project', 'Changelog', 'Privacy', 'Security',
  'Atta — See your AI team at a glance',
  'Too many terminals, and you forget which agent is doing what. Atta puts every agent on every machine into one live map, and the risky step waits for your nod.',
  'Product', 'Overview', 'Workbench', 'Team map', 'Flywheel', 'FAQ',
  'Project and availability', 'Website source', 'Issues', 'Legal',
  'Atta is a self-hosted AI workbench concept. This site is static.',
  'Website maintained by',
];
for (const key of SHELL_KEYS) if (!Object.hasOwn(ZH, key)) throw new Error(`i18n.js: missing shell key ${key}`);

const HOME_TITLE = 'Atta — See your AI team at a glance';
const HOME_DESC = 'Too many terminals, and you forget which agent is doing what. Atta puts every agent on every machine into one live map, and the risky step waits for your nod.';
const HOME = {
  en: { title: HOME_TITLE, description: HOME_DESC, url: SITE },
  zh: {
    title: t(HOME_TITLE, 'zh'),
    description: t(HOME_DESC, 'zh'),
    url: SITE + 'zh/',
  },
};

const pageUrl = (slug, locale) => SITE + (locale === 'zh' ? 'zh/' : '') + slug + '/';
const pagePath = (slug, locale) => (locale === 'zh' ? 'zh/' : '') + slug + '/index.html';

function schema(page, locale) {
  const lang = locale === 'zh' ? 'zh-Hans' : 'en';
  if (page.kind === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': SITE + '#website',
          url: SITE,
          name: 'Atta',
          description: locale === 'zh'
            ? '把每台机器上的 Agent 收进一张实时图的自托管 AI 工作台概念。'
            : 'A self-hosted AI workbench concept that puts agents on every machine into one live map.',
          inLanguage: ['en', 'zh-Hans'],
          publisher: { '@type': 'Person', name: 'Hugo Light', url: 'https://github.com/HugoSkylight' },
        },
        {
          '@type': 'SoftwareApplication',
          '@id': SITE + '#software',
          name: 'Atta',
          applicationCategory: 'DeveloperApplication',
          description: locale === 'zh'
            ? '用于跨机器指挥小型 AI Agent 团队的自托管 AI 工作台。尚未公开。'
            : 'A self-hosted AI workbench for directing a small team of AI agents across machines. Not publicly available.',
          url: pageUrl('project', locale),
          isPartOf: { '@id': SITE + '#website' },
        },
      ],
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    inLanguage: lang,
    isPartOf: { '@type': 'WebSite', '@id': SITE + '#website', url: SITE, name: 'Atta' },
    publisher: { '@type': 'Person', name: 'Hugo Light', url: 'https://github.com/HugoSkylight' },
  };
}

function seoBlock(page, locale) {
  const en = page.kind === 'home' ? SITE : pageUrl(page.slug, 'en');
  const zh = page.kind === 'home' ? SITE + 'zh/' : pageUrl(page.slug, 'zh');
  const self = locale === 'zh' ? zh : en;
  const other = locale === 'zh' ? en : zh;
  const ogLocale = locale === 'zh' ? 'zh_CN' : 'en_US';
  const otherLocale = locale === 'zh' ? 'en_US' : 'zh_CN';
  const imageAlt = locale === 'zh'
    ? 'Atta 主视觉：暗色背景中，指挥官蚂蚁连接着多个 Agent 窗口'
    : 'Atta key art: a commander ant linked to agent screens on a dark background';
  return `<link rel="canonical" href="${self}">
<link rel="alternate" hreflang="en" href="${en}">
<link rel="alternate" hreflang="zh-Hans" href="${zh}">
<link rel="alternate" hreflang="x-default" href="${en}">
<link rel="alternate" type="text/markdown" href="${SITE}llms.txt" title="llms.txt">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Atta">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${self}">
<meta property="og:image" content="${SITE}img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:locale:alternate" content="${otherLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${SITE}img/og.jpg">
<script type="application/ld+json">${JSON.stringify(schema(page, locale))}</script>`;
}

// Translate known static text and attributes. Script and style bodies are returned untouched.
function translateHtml(html) {
  const parts = html.split(/(<(?=[/!a-zA-Z])[^>]*>)/);
  let skip = 0;
  return parts.map(part => {
    if (part.startsWith('<')) {
      if (/^<\/(script|style)\b/i.test(part)) { if (skip > 0) skip--; return part; }
      if (skip > 0) return part;
      if (/^<(script|style)\b/i.test(part)) { skip++; return part; }
      return part.replace(/\b(alt|aria-label|title|placeholder|content)="([^"]*)"/g, (whole, attr, value) => {
        const key = value.trim();
        return Object.hasOwn(ZH, key) ? `${attr}="${ZH[key].replace(/"/g, '&quot;')}"` : whole;
      });
    }
    if (skip > 0) return part;
    const key = part.trim();
    if (!key || !Object.hasOwn(ZH, key)) return part;
    return part.replace(key, () => ZH[key]);
  }).join('');
}

function replaceBlock(html, startMark, endMark, replacement) {
  const start = html.indexOf(startMark);
  const end = html.indexOf(endMark, start);
  if (start < 0 || end < 0) throw new Error(`cannot find ${startMark}`);
  return html.slice(0, start + startMark.length) + '\n' + replacement + '\n' + html.slice(end);
}

function langAnchor(locale, href) {
  const label = locale === 'zh' ? 'English' : '中文';
  const lang = locale === 'zh' ? 'en' : 'zh-Hans';
  const aria = locale === 'zh' ? 'Switch to English' : 'Switch to Chinese';
  return `<a class="lang" href="${href}" data-alt="${href}" hreflang="${lang}" lang="${lang}" aria-label="${aria}">${label}</a>`;
}

function zhHome() {
  let html = translateHtml(read('index.html'));
  html = html.replace('<html lang="en">', '<html lang="zh-Hans">');
  // The zh home lives one directory down. Rewrite local assets, including paths inside the demo script.
  html = html.replaceAll('img/', '../img/');
  html = html.replace('src="i18n.js"', 'src="../i18n.js"');
  html = html.replace('src="lang-link.js"', 'src="../lang-link.js"');
  html = html.replace('href="llms.txt"', 'href="../llms.txt"');
  html = replaceBlock(html, '<!-- seo:start -->', '<!-- seo:end -->', seoBlock({ ...HOME.zh, kind: 'home' }, 'zh'));
  html = html.replace(/<a class="lang"[^>]*>[^<]*<\/a>/, langAnchor('zh', '../'));
  return html;
}

function footer(locale, asset, home) {
  const L = key => t(key, locale);
  return `<footer class="site-foot">
  <div class="fname" aria-hidden="true">Atta</div>
  <div class="fgrid">
    <div class="fabout">
      <p>${L('Atta is a self-hosted AI workbench concept. This site is static.')}</p>
      <p class="small">${L('Website maintained by')} <a class="tlink" href="https://github.com/HugoSkylight">Hugo Light</a></p>
    </div>
    <nav aria-label="${L('Product')}">
      <h2 class="fh">${L('Product')}</h2>
      <ul>
        <li><a class="tlink" href="${home}">${L('Overview')}</a></li>
        <li><a class="tlink" href="${home}#core">${L('Workbench')}</a></li>
        <li><a class="tlink" href="${home}#topo">${L('Team map')}</a></li>
        <li><a class="tlink" href="${home}#fly">${L('Flywheel')}</a></li>
        <li><a class="tlink" href="${home}#faq">${L('FAQ')}</a></li>
      </ul>
    </nav>
    <nav aria-label="${L('Project')}">
      <h2 class="fh">${L('Project')}</h2>
      <ul>
        <li><a class="tlink" href="${home}project/">${L('Project and availability')}</a></li>
        <li><a class="tlink" href="${home}changelog/">${L('Changelog')}</a></li>
        <li><a class="tlink" href="https://github.com/HugoSkylight/atta-web">${L('Website source')}</a></li>
        <li><a class="tlink" href="https://github.com/HugoSkylight/atta-web/issues">${L('Issues')}</a></li>
        <li><a class="tlink" href="${asset}llms.txt">llms.txt</a></li>
      </ul>
    </nav>
    <nav aria-label="${L('Legal')}">
      <h2 class="fh">${L('Legal')}</h2>
      <ul>
        <li><a class="tlink" href="${home}privacy/">${L('Privacy')}</a></li>
        <li><a class="tlink" href="${home}security/">${L('Security')}</a></li>
      </ul>
    </nav>
  </div>
</footer>`;
}

function renderPage(entry, locale) {
  const content = entry[locale];
  const isZh = locale === 'zh';
  const asset = isZh ? '../../' : '../'; // from /zh/<slug>/ or /<slug>/ to the site root
  const home = '../'; // to the same-language home
  const langHref = isZh ? `../../${entry.slug}/` : `../zh/${entry.slug}/`;
  const page = { ...content, slug: entry.slug, url: pageUrl(entry.slug, locale), kind: 'page' };
  const nav = [
    ['project', 'Project'],
    ['changelog', 'Changelog'],
    ['privacy', 'Privacy'],
    ['security', 'Security'],
  ].map(([slug, key]) => `<li><a${slug === entry.slug ? ' aria-current="page"' : ''} href="../${slug}/">${t(key, locale)}</a></li>`).join('');
  return `<!doctype html>
<html lang="${isZh ? 'zh-Hans' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(content.title)}</title>
<meta name="description" content="${esc(content.description)}">
<meta name="author" content="Hugo Light">
<meta name="theme-color" content="#141016">
<link rel="icon" href="${asset}img/icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset}site.css">
<!-- seo:start -->
${seoBlock(page, locale)}
<!-- seo:end -->
</head>
<body>
<header class="site-head">
  <div class="wrap head-row">
    <a class="brand" href="${home}"><img src="${asset}img/icon.png" alt="" width="30" height="30">Atta</a>
    <nav aria-label="${t('Main', locale)}"><ul>${nav}</ul></nav>
    ${langAnchor(locale, langHref)}
  </div>
</header>
<main class="wrap prose" id="main">
  <p class="crumb"><a href="${home}">Atta</a> / ${esc(content.h1)}</p>
  <h1>${esc(content.h1)}</h1>
  <p class="lede">${esc(content.lede)}</p>
  ${content.body}
  <p class="updated">${isZh ? '最后更新：<time datetime="2026-10-20">2026 年 10 月 20 日</time>。' : 'Last updated <time datetime="2026-10-20">20 October 2026</time>.'}</p>
</main>
${footer(locale, asset, home)}
<script src="${asset}lang-link.js"></script>
</body>
</html>
`;
}

function sitemap() {
  const pairs = [
    [SITE, SITE + 'zh/'],
    ...PAGES.map(p => [pageUrl(p.slug, 'en'), pageUrl(p.slug, 'zh')]),
  ];
  const urls = pairs.map(([en, zh]) => `  <url>
    <loc>${en}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zh}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
  </url>
  <url>
    <loc>${zh}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zh}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

const llms = `# Atta

> Atta is a self-hosted AI workbench concept for directing a small team of AI agents across machines. It is not publicly available: no download, installer, hosted service, account, or sign-up exists.

## Product status

- Availability: private, maintained by its author. No public release date is published.
- Public code: this website only. The product implementation is private and no product license is published.
- Demos: the home page demos are scripted examples with sample data, not a live product.
- Models: the concept is model-agnostic. The demos do not run a model.

## Pages

- [Home](${SITE}): product concept and interactive demos.
- [Project and availability](${pageUrl('project', 'en')}): what the demos show and current availability.
- [Changelog](${pageUrl('changelog', 'en')}): website changes with commit links.
- [Privacy](${pageUrl('privacy', 'en')}): website privacy only.
- [Security](${pageUrl('security', 'en')}): website security scope and reporting.
- [中文首页](${SITE}zh/): Chinese home page.
- [项目与可用性](${pageUrl('project', 'zh')}): 中文项目说明。
- [更新日志](${pageUrl('changelog', 'zh')}): 中文网站更新记录。
- [隐私](${pageUrl('privacy', 'zh')}): 中文网站隐私说明。
- [安全](${pageUrl('security', 'zh')}): 中文网站安全说明。

## Contact

- Website issues: https://github.com/HugoSkylight/atta-web/issues
- Maintainer: Hugo Light, https://github.com/HugoSkylight
- No public email address is published.

## Notes

- The site is static HTML, CSS, and JavaScript. It has no backend, forms, accounts, or tracking code.
- This file summarizes the public pages. It adds no private product details and no content that is hidden from readers.
`;

const robots = `# This file is served from the root of the official site.
User-Agent: *
Allow: /

Sitemap: ${SITE}sitemap.xml
`;

const outputs = new Map();
outputs.set('zh/index.html', zhHome());
for (const entry of PAGES) {
  outputs.set(pagePath(entry.slug, 'en'), renderPage(entry, 'en'));
  outputs.set(pagePath(entry.slug, 'zh'), renderPage(entry, 'zh'));
}
outputs.set('sitemap.xml', sitemap());
outputs.set('llms.txt', llms);
outputs.set('robots.txt', robots);

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1] : '';
}

function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0xd9) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
    }
    i += 2 + len;
  }
  return null;
}

function linksIn(html) {
  const links = [];
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) links.push(m[1]);
  for (const m of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) links.push(part.trim().split(/\s+/)[0]);
  }
  return links;
}

function linkPath(from, link) {
  const clean = link.split('#')[0].split('?')[0];
  if (!clean || /^(?:https?:|mailto:|data:|javascript:|\/\/)/.test(clean)) return null;
  const url = new URL(clean, 'https://example.test/' + from);
  let path = decodeURIComponent(url.pathname).replace(/^\//, '');
  if (!path || path.endsWith('/')) path += 'index.html';
  return path;
}

function validate() {
  const errors = [];
  const files = new Set(outputs.keys());
  const index = read('index.html');

  const expectMeta = (html, label, title, description, canonical, lang) => {
    if (attr(html, /<html lang="([^"]+)"/) !== lang) errors.push(`${label}: html lang is not ${lang}`);
    if (attr(html, /<title>([\s\S]*?)<\/title>/) !== title) errors.push(`${label}: title mismatch`);
    if (attr(html, /<meta name="description" content="([^"]*)"/) !== description) errors.push(`${label}: description mismatch`);
    if (attr(html, /<link rel="canonical" href="([^"]+)"/) !== canonical) errors.push(`${label}: canonical mismatch`);
    const alt = new Map();
    for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) alt.set(m[1], m[2]);
    for (const key of ['en', 'zh-Hans', 'x-default']) if (!alt.has(key)) errors.push(`${label}: missing hreflang ${key}`);
    if (!html.includes(`<meta property="og:image" content="${SITE}img/og.jpg">`)) errors.push(`${label}: og:image missing`);
    if (!html.includes('<meta name="twitter:card" content="summary_large_image">')) errors.push(`${label}: twitter card missing`);
    if (!html.includes('<h1')) errors.push(`${label}: no h1`);
  };

  expectMeta(index, 'index.html', HOME.en.title, HOME.en.description, SITE, 'en');
  expectMeta(outputs.get('zh/index.html'), 'zh/index.html', HOME.zh.title, HOME.zh.description, HOME.zh.url, 'zh-Hans');
  for (const entry of PAGES) {
    for (const locale of ['en', 'zh']) {
      const path = pagePath(entry.slug, locale);
      const c = entry[locale];
      expectMeta(outputs.get(path), path, c.title, c.description, pageUrl(entry.slug, locale), locale === 'zh' ? 'zh-Hans' : 'en');
    }
  }

  for (const [path, html] of outputs) {
    if (/(?:Owner login|Open my workbench|Log in to my workbench|href="#"|support@)/.test(html)) {
      errors.push(`${path}: contains a removed login CTA, empty link, or unverified contact`);
    }
    for (const m of html.matchAll(/https:\/\/github\.com\/HugoSkylight\/([A-Za-z0-9_.-]+)/g)) {
      if (m[1] !== 'atta-web') errors.push(`${path}: links to an unverified GitHub repository ${m[1]}`);
    }
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      let data;
      try { data = JSON.parse(m[1]); } catch { errors.push(`${path}: invalid JSON-LD`); continue; }
      const walk = value => {
        if (!value || typeof value !== 'object') return;
        for (const [key, child] of Object.entries(value)) {
          if (['offers', 'aggregateRating', 'review', 'license', 'price', 'priceCurrency'].includes(key)) {
            errors.push(`${path}: JSON-LD contains unsupported ${key}`);
          }
          walk(child);
        }
      };
      walk(data);
    }
    if (path !== 'index.html' && path !== 'zh/index.html') {
      const scripts = [...html.matchAll(/<script\b[^>]*>/g)].map(m => m[0]);
      for (const tag of scripts) {
        if (!/application\/ld\+json/.test(tag) && !/src="(?:\.\.\/)+lang-link\.js"/.test(tag)) {
          errors.push(`${path}: unexpected script ${tag}`);
        }
      }
    }
    for (const link of linksIn(html)) {
      const resolved = linkPath(path, link);
      if (!resolved) continue;
      if (!files.has(resolved) && !existsSync(join(ROOT, resolved))) errors.push(`${path}: broken link ${link} -> ${resolved}`);
    }
  }

  for (const m of index.matchAll(/https:\/\/github\.com\/HugoSkylight\/([A-Za-z0-9_.-]+)/g)) {
    if (m[1] !== 'atta-web') errors.push(`index.html: links to an unverified GitHub repository ${m[1]}`);
  }

  const locs = new Set([...outputs.get('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
  const wanted = new Set([SITE, SITE + 'zh/', ...PAGES.flatMap(p => [pageUrl(p.slug, 'en'), pageUrl(p.slug, 'zh')])]);
  if (locs.size !== 10) errors.push(`sitemap.xml: expected 10 URLs, found ${locs.size}`);
  for (const url of wanted) if (!locs.has(url)) errors.push(`sitemap.xml: missing ${url}`);
  for (const url of locs) if (!wanted.has(url)) errors.push(`sitemap.xml: unexpected ${url}`);
  if (outputs.get('sitemap.xml').includes('i18n-check')) errors.push('sitemap.xml: test page must not be listed');

  for (const m of outputs.get('llms.txt').matchAll(/\((https:\/\/[^)]+)\)/g)) {
    if (!m[1].startsWith(SITE)) continue;
    const url = new URL(m[1]);
    let path = url.pathname.replace(/^\//, '');
    if (!path || path.endsWith('/')) path += 'index.html';
    if (!files.has(path) && !existsSync(join(ROOT, path))) errors.push(`llms.txt: broken page link ${m[1]}`);
  }

  if (!outputs.get('robots.txt').includes('Allow: /')) errors.push('robots.txt: missing Allow: /');
  if (!outputs.get('robots.txt').includes(`Sitemap: ${SITE}sitemap.xml`)) errors.push('robots.txt: sitemap URL mismatch');

  const og = join(ROOT, 'img/og.jpg');
  if (!existsSync(og)) errors.push('img/og.jpg: missing share image');
  else {
    const size = jpegSize(readFileSync(og));
    if (!size || size.width !== 1200 || size.height !== 630) errors.push(`img/og.jpg: expected 1200x630, got ${size ? `${size.width}x${size.height}` : 'unknown'}`);
  }

  if (!index.includes('href="project/"') || !index.includes('href="privacy/"') || !index.includes('href="security/"')) {
    errors.push('index.html: footer trust links missing');
  }

  return errors;
}

if (CHECK) {
  const drift = [];
  for (const [path, content] of outputs) {
    if (!existsSync(join(ROOT, path))) drift.push(`${path}: missing`);
    else if (read(path) !== content) drift.push(`${path}: differs from generator output`);
  }
  const errors = [...drift, ...validate()];
  if (errors.length) {
    console.error(errors.map(e => 'FAIL ' + e).join('\n'));
    process.exit(1);
  }
  console.log(`OK ${outputs.size} generated files match, metadata, links, sitemap, llms, and robots pass`);
} else {
  for (const [path, content] of outputs) {
    mkdirSync(dirname(join(ROOT, path)), { recursive: true });
    writeFileSync(join(ROOT, path), content);
  }
  const errors = validate();
  if (errors.length) {
    console.error(errors.map(e => 'FAIL ' + e).join('\n'));
    process.exitCode = 1;
  }
  console.log(`wrote ${outputs.size} files`);
}
