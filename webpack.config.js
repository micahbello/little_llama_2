var path = require('path');

module.exports = {
  entry: './lib/little_llama.js',
  output: {
    filename: './lib/bundle.js'
  },
  devtool: 'source-map',
}
