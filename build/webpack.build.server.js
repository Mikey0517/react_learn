const fs = require( 'fs' );
const webpack = require( 'webpack' );
const config = require( '../config/webpack.build.config' );

console.log( 'clear old build...' );
deleteFolder( config.output.path );

console.log( 'building for production...' );
webpack( config, ( err, stats ) => {
  if ( err ) throw err;

  process.stdout.write( stats.toString( {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  } ) + '\n\n' )

  if ( stats.hasErrors() ) {
    console.log( 'Build failed with errors.\n' );
    process.exit( 1 )
  }
} )

function deleteFolder( path ) {
  let files = [];
  if( fs.existsSync( path ) ) {
    files = fs.readdirSync( path );
    files.forEach( ( file ) => {
        let curPath = path + "/" + file;
        if( fs.statSync( curPath ).isDirectory() ) { // recurse
            deleteFolder( curPath );
        } else { // delete file
            fs.unlinkSync( curPath );
        }
    });
    fs.rmdirSync( path );
  }
}