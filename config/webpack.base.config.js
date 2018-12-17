const path = require( 'path' );
const utils = require( './utils' );

let config = {
  entry: {
    app: [
      path.join( __dirname, '../src/index.js' )
    ]
  },
  output: {
    path: path.join( __dirname, '../dist/' ),
    publicPath: "/",
    filename: "[name].js"
  },
  resolve: { extensions: [ '.js', '.jsx' ] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join( __dirname, '../src' ),
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015', 'react' ]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath( 'image/[name].[hash:7].[ext]' )
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath( 'fonts/[name].[hash:7].[ext]' )
        }
      }
    ]
  },
}

module.exports = config;