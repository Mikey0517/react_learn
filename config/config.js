const path = require( 'path' );

module.exports = {
  dev: {
    assetsSubDirectory: 'assets',
    proxyTable: {
      "/v8": {
        target: "https://c.y.qq.com",
        secure: false
      },
      "/play": {
        target: "http://localhost:8888",
        secure: false
      },
    }
  },
  build: {
    index: path.resolve( __dirname, '../dist/index.html' ),
    assetsSubDirectory: 'assets'
  }
}