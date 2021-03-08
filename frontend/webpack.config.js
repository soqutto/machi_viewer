const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  devtool: 'source-map',
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
