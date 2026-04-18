# kristen-portfolio

Personal portfolio (Vue 3). Ships as a static site suitable for GitHub Pages.

## GitHub Pages

1. In [`vue.config.js`](vue.config.js), set `publicPath` to match your hosting URL:
   - **Project page** (`https://<username>.github.io/<repo>/`): use `publicPath: '/<repo>/'` (must match the repository name exactly, including trailing slash style Vue expects).
   - **User or organization site** (`https://<username>.github.io/`): keep `publicPath: '/'`.
2. Build: `npm run build`
3. Deploy the contents of the `dist/` folder to GitHub Pages (branch `gh-pages`, or `/docs` folder on `main`, or your preferred Pages source).

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
