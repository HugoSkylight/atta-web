# Atta website

Static, bilingual website for Atta. No framework, no backend, no tracking code.

## Run

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/> for English and <http://localhost:8000/zh/> for Chinese.

## Build

```sh
node build.mjs
```

The generator writes these committed files:

- `zh/index.html`, translated from `index.html` and the `ZH` dictionary in `i18n.js`
- `project/`, `privacy/`, `security/`, and `changelog/` in English
- `zh/project/`, `zh/privacy/`, `zh/security/`, and `zh/changelog/` in Chinese
- `sitemap.xml`, `llms.txt`, and `robots.txt`

Do not edit generated files by hand. Edit `pages.mjs` for page content, `build.mjs` for the shared shell, `index.html` for the English home page, `i18n.js` for translations, or `site.css` for page styles, then rebuild.

The generator reads the `ZH` object as data. It does not run the page scripts, does not render a DOM, and skips script and style bodies when translating `index.html`.

## Check

```sh
node build.mjs --check
```

The check rebuilds in memory and fails if a committed file differs. It also checks the page metadata, canonical and hreflang links, the share image size, local links, the sitemap URL set, the `llms.txt` page links, and the `robots.txt` sitemap line. It does not replace a browser check.

Open `/i18n-check.html` from the local server for the language URL test. That page is marked `noindex` and is not in the sitemap.

## Files

- `index.html`: English home page source, including the inline demos
- `pages.mjs`: bilingual content for the generated pages
- `i18n.js`: Chinese dictionary and the `I18N.t`, `I18N.text`, `I18N.on`, and `I18N.set` API
- `lang-link.js`: keeps a valid anchor when navigating to the other language URL
- `build.mjs`: static generator and `--check` mode
- `site.css`: styles for the generated pages
- `img/`: site images; `img/og.jpg` is the social share image

The share image is a one-time crop from `img/hero.webp`:

```sh
sips -s format jpeg -z 675 1200 img/hero.webp --out img/og.jpg
sips -c 630 1200 img/og.jpg
```

## Deployment and crawler files

The official site is <https://atta.nz/>. Cloudflare serves the committed files as static hosting; its project settings are configured outside this repository and are not recorded here. There is no `CNAME` file and no DNS record managed in this repository.

`_headers` sets UTF-8 response types for `llms.txt`, `robots.txt`, and `sitemap.xml`. Keep it in the published asset root. A UTF-8 file without a response charset can display incorrectly when a browser opens it as plain text.

`sitemap.xml` lists the `atta.nz` URLs. `robots.txt` is served from the domain root, so its `Allow: /` rule and sitemap line apply to the official host.

A copy may also remain available through GitHub Pages at the project URL <https://hugoskylight.github.io/atta-web/>. That copy is not the canonical address, and a `robots.txt` at the project path cannot control the `github.io` host.

This project does not add crawler restrictions for search indexing, user-requested AI retrieval, or model-training crawlers. `llms.txt` is a discoverable summary, not an indexing request or a guarantee of AI recommendations. A maintainer must submit the sitemap through the relevant webmaster tools if they want submission records.

## Content boundaries

The pages describe the public website and the product concept shown in the demos. They do not describe product internals, because the product implementation is private and has not been audited for this site. The demos use sample data.

No public support email is published. If the project needs one, the maintainer must provide it. Do not add a placeholder address.
