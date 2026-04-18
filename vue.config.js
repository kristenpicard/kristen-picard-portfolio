const { defineConfig } = require('@vue/cli-service')

// GitHub Pages asset base:
// - Project site: https://<user>.github.io/<repo>/  →  publicPath: '/<repo>/'
// - User/org root site: https://<user>.github.io/  →  publicPath: '/'
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Kristen Picard — Portfolio',
    },
  },
})
