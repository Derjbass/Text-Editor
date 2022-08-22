const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      // add service workers
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),

      // manifest
      new WebpackPwaManifest({
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Takes notes with JavaScript syntax highlighting!',
        start_url:'/',
        theme_color: '#225ca3',
        background_color: '#225ca3',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],

          }
        ]
      })
      
    ],

    module: {
      rules: [
        {
          use: ['style-loader', 'css-loader']
        },
        {
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/present-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            }
          }
        }
      ],
    },
  };
};
