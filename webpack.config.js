const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './client/src/index.tsx'),
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico|jpeg)$/,
        use: {
          loader: 'url-loader',
        },
    },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    publicPath: '/build',
    proxy: {
      '/': 'http://localhost:3000',
    },
    hot: true,
  },
};