const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    'lib/index': './src/index.ts',
    'bin/ctts': './src/bin/ctts.ts',
  },
  output: {
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
};
