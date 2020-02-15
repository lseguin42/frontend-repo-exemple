module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
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
    path: __dirname + '/dist'
  }
};