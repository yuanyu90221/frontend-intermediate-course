let webpack = require('webpack');
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let path = require('path');
module.exports = {
  // 起始的 js
  entry: './assets/js/loadTwitch.js',
  // 輸出位址
  output: {
    path: path.join(__dirname, 'assets/js'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?presets[]=es2015']
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  // Plugins
  plugins: [
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
