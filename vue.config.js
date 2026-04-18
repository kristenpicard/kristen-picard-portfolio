const { defineConfig } = require('@vue/cli-service')

function readPackage() {
  try {
    return require('./package.json')
  } catch {
    return {}
  }
}

/** @param {string} p e.g. /my-repo or /my-repo/ */
function normalizePublicPath(p) {
  let x = String(p).trim()
  if (!x.startsWith('/')) x = `/${x}`
  if (!x.endsWith('/')) x = `${x}/`
  return x
}

/**
 * Production asset base for GitHub Pages.
 * 1) PAGE_PUBLIC_PATH=/repo/  (override)
 * 2) package.json "homepage" URL → path segment
 * 3) package.json repository GitHub URL → /RepoName/ (or / for *.github.io)
 * 4) fallback "/"
 */
function publicPath() {
  if (process.env.NODE_ENV !== 'production') return '/'

  if (process.env.PAGE_PUBLIC_PATH) {
    return normalizePublicPath(process.env.PAGE_PUBLIC_PATH)
  }

  const pkg = readPackage()

  if (pkg.homepage && typeof pkg.homepage === 'string') {
    try {
      const { pathname } = new URL(pkg.homepage)
      if (pathname && pathname !== '/') {
        const base = pathname.replace(/\/+$/, '')
        return `${base}/`
      }
      return '/'
    } catch {
      // fall through
    }
  }

  const raw =
    typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url
  if (raw && typeof raw === 'string') {
    const normalized = raw.replace(/^git\+/, '').replace(/\.git$/, '')
    const m = normalized.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/i)
    if (m) {
      const repo = m[2]
      if (/\.github\.io$/i.test(repo)) return '/'
      return `/${repo}/`
    }
  }

  console.warn(
    '[vue.config] Set package.json "homepage" to your Pages URL, add a GitHub "repository" URL, or set PAGE_PUBLIC_PATH for a correct asset path. Using "/".'
  )
  return '/'
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
