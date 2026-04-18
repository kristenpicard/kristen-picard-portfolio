# vue-portfolio

Personal portfolio (Vue 3). Ships as a static site suitable for GitHub Pages.

## GitHub Pages (deploy from branch, no Actions)

GitHub Pages must serve **built** files. This project builds into **`docs/`** so you can keep source at the repo root and use **Settings → Pages → Deploy from a branch → `main` → `/docs`**.

1. In [`package.json`](package.json), set **`homepage`** (optional metadata) to your site URL if you like; it is **not** required for asset paths anymore.
2. Build the Pages folder:
   ```bash
   npm run build:pages
   ```
3. Commit and push the generated **`docs/`** directory (including `.nojekyll` from `public/`).
4. On GitHub: **Settings → Pages** → **Deploy from a branch** → Branch **`main`**, folder **`/docs`**, Save.

Whenever you change the app, run **`npm run build:pages`** again, commit the updated `docs/`, and push.

**Asset path:** Production builds use a **relative** `publicPath` (`./`) so script and CSS URLs resolve correctly on `https://<user>.github.io/<repo>/` without depending on the repo name. If you ever need absolute paths:  
`PAGE_ABSOLUTE_PATH=/vue-portfolio/ npm run build:pages`

### “View site” opens but the page is blank

That usually means **`index.html` loaded but `*.js` returned 404** (open DevTools → Network, reload). Common causes:

- **Pages is not using `/docs`.** If the source is **`/` (root)** on `main`, GitHub serves the repo root (README, `package.json`) — not the built files inside `docs/`. Fix: **Settings → Pages → Branch `main`, folder `/docs`**, Save, wait a minute, hard-refresh.
- **`docs/` on GitHub is out of date.** Run `npm run build:pages`, commit **all** files under `docs/` (including `js/`, `css/`, `img/`, `.nojekyll`), push, wait for Pages to rebuild.

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
