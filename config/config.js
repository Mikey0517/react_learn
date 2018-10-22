const path = require( 'path' );

module.exports = {
  dev: {
    assetsSubDirectory: 'assets',
  },
  build: {
    index: path.resolve( __dirname, '../dist/index.html' ),
    assetsSubDirectory: 'assets'
  }
}