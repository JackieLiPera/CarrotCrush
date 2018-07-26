const path = require('path')

module.exports = {
  entry: "./lib/carrotcrush.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
  	filename: "bundle.js"
  },
  devtool: 'source-map',
};
