const stdLibBrowser = require('node-stdlib-browser')
const { NodeProtocolUrlPlugin } = require('node-stdlib-browser/helpers/webpack/plugin')
const webpack = require('webpack')

module.exports = function override(config, env) {
    config.resolve = {
      ...config.resolve || {},
      alias: stdLibBrowser,
    }
    config.plugins = config.plugins.concat([
      new NodeProtocolUrlPlugin(),
      new webpack.ProvidePlugin({
        process: stdLibBrowser.process,
        Buffer: [stdLibBrowser.buffer, 'Buffer']
      })
    ])

    return config
}
