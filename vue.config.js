const { defineConfig } = require('@vue/cli-service')

/**
 * Asset base for production builds (GitHub Pages).
 * - User/Org site: repo named `<user>.github.io` → served at https://<user>.github.io/ → '/'
 * - Project site: repo `<name>` → https://<user>.github.io/<name>/ → '/<name>/'
 * In GitHub Actions, GITHUB_REPOSITORY is set automatically.
 * Local production build: set GITHUB_REPOSITORY=owner/repo-name npm run build
 */
function publicPath() {
  if (process.env.NODE_ENV !== 'production') return '/'
  const full = process.env.GITHUB_REPOSITORY || ''
  const repoName = full.includes('/') ? full.split('/')[1] : ''
  if (!repoName) return '/'
  if (/\.github\.io$/i.test(repoName)) return '/'
  return `/${repoName}/`
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
