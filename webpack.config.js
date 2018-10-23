var path = require('path');

module.exports = {
  mode: 'development',
  entry: './lib/little_llama.js',
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
}
