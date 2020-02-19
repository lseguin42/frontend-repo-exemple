const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
    }
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({ title: 'Demo App' })]
};
