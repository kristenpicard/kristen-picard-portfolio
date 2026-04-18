# kristen-portfolio

Personal portfolio (Vue 3). Ships as a static site suitable for GitHub Pages.

## GitHub Pages (deploy from branch, no Actions)

GitHub Pages must serve **built** files. This project builds into **`docs/`** so you can keep source at the repo root and use **Settings → Pages → Deploy from a branch → `main` → `/docs`**.

1. In [`package.json`](package.json), set **`homepage`** to your real site URL (and optionally **`repository.url`** to the same GitHub repo). Examples:
   - Project site: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - User site (repo `YOUR_USERNAME.github.io`): `https://YOUR_USERNAME.github.io/`
2. Build the Pages folder:
   ```bash
   npm run build:pages
   ```
3. Commit and push the generated **`docs/`** directory (including `.nojekyll` from `public/`).
4. On GitHub: **Settings → Pages** → **Deploy from a branch** → Branch **`main`**, folder **`/docs`**, Save.

Whenever you change the app, run **`npm run build:pages`** again, commit the updated `docs/`, and push.

**Asset path:** [`vue.config.js`](vue.config.js) sets production `publicPath` from `PAGE_PUBLIC_PATH`, or from `homepage`, or from the repo name in `repository.url`. Wrong `publicPath` causes a blank page or missing JS/CSS.

**Optional:** `PAGE_PUBLIC_PATH=/my-repo/ npm run build:pages` overrides the above for a one-off build.

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
