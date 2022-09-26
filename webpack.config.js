const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

/** @type { webpack.Configuration } */
module.exports = {
  entry: {
    'lib/index': './src/index.ts',
    'bin/ctts': './src/bin/ctts.ts',
  },
  output: {
    path: __dirname,
    library: {
      type: 'commonjs2',
    },
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
