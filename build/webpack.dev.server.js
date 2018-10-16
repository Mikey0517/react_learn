const webpack = require( 'webpack' );
const webpackDevServer = require( 'webpack-dev-server' );
const config = require( '../config/webpack.dev.config' );

const HOST = '0.0.0.0';
const port = 3000;

config.entry.app.unshift( "webpack-dev-server/client?http://" + HOST + ":" + port + "/" );

let compiler = webpack( config );
let server = new webpackDevServer( compiler, {
  hotOnly: true,
  inline: true,
} )

server.listen( port )