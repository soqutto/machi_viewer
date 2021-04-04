const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './src/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['mockup'],
      template: './mockup/mockup.html',
      filename: './mockup.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              //sourceMap: enabledSourceMap
            }
          }
        ]
      },
      {
        test: /\.png/,
        use:
          'url-loader'
      }
    ]
  }
};
