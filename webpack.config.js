const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'client/public/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  devtool: 'eval',
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }],
  },
  resolve: ['', '.js', '.jsx'],
  plugins: [
    HtmlWebpackPluginConfig,
  ],
};
