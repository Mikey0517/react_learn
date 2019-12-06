const webpack = require( 'webpack' );
const webpackDevServer = require( 'webpack-dev-server' );
const config = require( '../config/webpack.dev.config' );
const devConfig = require( '../config/config' ).dev;

const host = process.env.HOST = '0.0.0.0';
const port = process.env.port = 3001;

config.entry.app.unshift( "webpack-dev-server/client?http://" + host + ":" + port + "/" );

let compiler = webpack( config );
let server = new webpackDevServer( compiler, {
  compress: true,
  contentBase: '/',
  historyApiFallback: true,
  host,
  hot: true,
  clientLogLevel: "none",
  noInfo: true,
  open: true,
  overlay: true,
  useLocalIp: true,
  proxy: devConfig.proxyTable,
} );

console.log( `Listening:${ port }` );
server.listen( port );