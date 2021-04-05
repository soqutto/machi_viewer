const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Mode
  mode: 'development',

  // Entrypoints
  entry: {
    index: './src/index.js',
    mockup: './mockup/index.js'
  },

  // Output
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  // Module settings
  module: {
    rules: [
      // SCSS
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ['postcss-100vh-fix', 'autoprefixer'],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
              sourceMap: true,
            },
          },
        ]
      },

      // CSS
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            }
          }
        ]
      },

      // PNG
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
        },
      },

      // Other assets
      {
        test: /.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
        }
      },
    ]
  },

  // Plugin settings
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './src/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['mockup'],
      template: './mockup/index.html',
      filename: './mockup.html'
    })
  ],

  // DevServer settings
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    open: false,
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
};
