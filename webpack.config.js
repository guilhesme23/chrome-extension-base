const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const package = require('./package.json')

module.exports = {
  mode: 'production',
  node: {
    global: false,
  },
  entry: {
    index: path.resolve(__dirname, 'src/index.ts'),
    options: path.resolve(__dirname, 'src/options.ts')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlPlugin({
      filename: 'html/popup.html',
      template: 'html/popup.html',
      chunks: ['index'],
    }),
    new HtmlPlugin({
      filename: 'html/options.html',
      template: 'html/options.html',
      chunks: ['options'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'css',
          to: 'css'
        },
        {
          from: 'assets',
          to: 'assets'
        },
        {
          from: 'manifest.json',
          transform(content, path) {
            const manifest = JSON.parse(content)
            manifest['version'] = package.version
            return JSON.stringify(manifest)
          }
        }
      ]
    })
  ]
}