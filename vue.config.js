const { defineConfig } = require('@vue/cli-service')

/**
 * GitHub Pages project sites (`…/github.io/<repo>/`) need script/link URLs that resolve
 * next to `index.html`. A **relative** `publicPath` does that whether Pages is fed from
 * `/docs` or the repo root, and avoids 404s when absolute `/repo/` paths get out of sync.
 *
 * Optional override (absolute): `PAGE_ABSOLUTE_PATH=/vue-portfolio/ npm run build:pages`
 */
function publicPath() {
  if (process.env.NODE_ENV !== 'production') return '/'
  const abs = process.env.PAGE_ABSOLUTE_PATH
  if (abs) {
    let p = String(abs).trim()
    if (!p.startsWith('/')) p = `/${p}`
    if (!p.endsWith('/')) p = `${p}/`
    return p
  }
  return './'
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: publicPath(),
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Kristen Picard — Portfolio',
    },
  },
})
