'use strict';

const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

let config = {
  externals: {
    google: 'google'
  },
  entry: [
    path.resolve(__dirname, 'src/js/app.js'),
    path.resolve(__dirname, 'src/scss/app.scss'),
    path.resolve(__dirname, 'src/images/bg4.png'),
    path.resolve(__dirname, 'src/images/footer-castle.png'),
    path.resolve(__dirname, 'src/images/logo-source.png'),
    path.resolve(__dirname, 'src/images/logo.png'),
    path.resolve(__dirname, 'src/images/children1.png'),
    path.resolve(__dirname, 'src/images/children2.png'),
    // path.resolve(__dirname, 'src/images/children3.png'),
    // path.resolve(__dirname, 'src/images/children4.png'),
    // path.resolve(__dirname, 'src/images/children5.png'),
    path.resolve(__dirname, 'src/images/konkurs.png'),
    path.resolve(__dirname, 'src/images/customers/daniel.jpg'),
    path.resolve(__dirname, 'src/images/customers/elliot.jpg'),
    path.resolve(__dirname, 'src/images/customers/elyse.png'),
    path.resolve(__dirname, 'src/images/customers/helen.jpg'),
    path.resolve(__dirname, 'src/images/customers/jenny.jpg'),
    path.resolve(__dirname, 'src/images/customers/kristy.png'),
    path.resolve(__dirname, 'src/images/customers/matthew.png'),
    path.resolve(__dirname, 'src/images/customers/molly.png'),
    path.resolve(__dirname, 'src/images/customers/steve.jpg'),
    path.resolve(__dirname, 'src/images/customers/stevie.jpg'),
    path.resolve(__dirname, 'src/images/customers/veronika.jpg'),
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../assets'),
    publicPath: '/js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader' },
          // { loader: 'eslint-loader' }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                path.resolve(__dirname, 'node_modules/uikit/src/scss')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'node_modules'),
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      AJAX_URL: JSON.stringify('/wp-admin/admin-ajax.php'),
      WPF_URL: JSON.stringify('/wp-json/wpf/v1')
    }),
    new webpack.ProvidePlugin({
      google: 'google',
      'window.google': 'google'
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css'
    })
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config = {
      ...config,
      watch: true,
      watchOptions: {
        aggregateTimeout: 100
      },
      devtool: 'cheap-inline-module-source-map',
      devServer: {
        overlay: true
      }
    }
  }

  if (argv.mode === 'production') {
    optimization: {
      minimize: true
    }
  }

  return config
}