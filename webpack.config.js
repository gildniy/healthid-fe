const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      moment$: 'moment/moment.js',
    },
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader', 'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader', 'css-loader', 'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        use: {
          loader: 'file-loader',

        },
      },
      {
        test: /\.(tsv|csv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },

      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new WebpackPwaManifest({
      name: 'PharmIQ',
      short_name: 'PharmIQ',
      description: 'The heartbeat of smart pharmacies',
      background_color: '#FAF33E',
      orientation: 'landscape',
      theme_color: '#FAF33E',
      crossorigin: 'use-credentials',
      ios: {
        'apple-mobile-web-app-title': 'AppTitle',
        'apple-mobile-web-app-status-bar-style': 'black'
      },
      icons: [
        {
          src: path.resolve('./src/assets/images/pwa/512 x 512.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        },
        {
          src: path.resolve('./src/assets/images/pwa/192 x 192.png'),
          sizes: 192,
          destination: path.join('icons', 'ios'),
          ios: true
        },
      ]
    }),
    new Dotenv({
      systemvars: true
    }),
    new CleanWebpackPlugin(),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html'
    }),
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
