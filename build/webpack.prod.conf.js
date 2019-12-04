const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const min = process.env.MIN;

module.exports = {
  target: 'web',
  mode: "production",
  externals: [nodeExternals()],
  entry: {
    app: './src/index.js',
  },
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
    pathinfo: true,
    filename: min ? "index.min.js" : "index.js",
    chunkFilename: '[name]_.chunk.js'
  },
  // 解析
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json','.jsx']
  },
  // loader
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  // 插件
  plugins: [
    // new CleanWebpackPlugin(),
    new CompressionWebpackPlugin()
  ],
  optimization: {
    minimize: !!min
  },
  devtool: 'source-map'
}
