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

GitHub Pages serves the committed files from the repository. The site currently lives at <https://hugoskylight.github.io/atta-web/>. `sitemap.xml` lists those project URLs.

`robots.txt` is written for a future custom domain at the host root. At the GitHub Pages project path, `/atta-web/robots.txt` is not the host-root `robots.txt`, so it does not control crawling of `github.io`. It is still a valid file to move to a domain root later.

This project does not add crawler restrictions for search indexing, user-requested AI retrieval, or model-training crawlers. The project-path robots file cannot enforce host-wide policy. `llms.txt` is a discoverable summary, not an indexing request or a guarantee of AI recommendations. A maintainer must submit the sitemap through the relevant webmaster tools if they want submission records.

## Content boundaries

The pages describe the public website and the product concept shown in the demos. They do not describe product internals, because the product implementation is private and has not been audited for this site. The demos use sample data.

No public support email is published. If the project needs one, the maintainer must provide it. Do not add a placeholder address.
