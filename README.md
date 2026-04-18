# kristen-portfolio

Personal portfolio (Vue 3). Ships as a static site suitable for GitHub Pages.

## GitHub Pages

GitHub must serve the **built** site (`dist/` after `npm run build`), not the Vue source at the repo root. Otherwise you only see the README or a broken page.

### Recommended: GitHub Actions (this repo includes a workflow)

1. Push this repo to GitHub (workflow file: [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml)).
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Under **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
4. After the first run on `main`, open the workflow run and confirm **deploy** succeeded; the site URL is shown on the run summary and under Pages settings.

[`vue.config.js`](vue.config.js) sets `publicPath` automatically in CI from `GITHUB_REPOSITORY`:

- Repo **`yourname.github.io`** → assets load from site root (`/`).
- Any other repo name → assets load from **`/that-repo-name/`** (project page).

**Local production build** (e.g. to test a project URL):  
`GITHUB_REPOSITORY=yourname/your-repo npm run build`

### If you insist on “Deploy from a branch”

1. Run `npm run build` locally with the correct `GITHUB_REPOSITORY` as above (or temporarily hard‑code `publicPath` in `vue.config.js`).
2. Copy **everything inside** `dist/` into the folder GitHub Pages serves (`/` on `main`, or `/docs`, or the root of `gh-pages`).
3. Commit and push those static files. Keeping only source on `main` without a workflow will not publish the app.

## Portrait

The hero imports [`src/assets/portrait.png`](src/assets/portrait.png) as-is (no retouching in the repo—only layout scaling in the browser).

To replace it with another file (exact copy):

`python3 scripts/copy-portrait.py /path/to/your.png`

Restart `npm run serve` after swapping the asset.

Theme colors are centralized in [`src/styles/_photo-palette.scss`](src/styles/_photo-palette.scss) (greens-first, tuned from the portrait’s foliage and warm highlights).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
