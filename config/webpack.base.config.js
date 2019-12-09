const webpack = require( 'webpack' );
const path = require( 'path' );
const utils = require( './utils' );

let config = ( mode ) => {
  return {
    mode: mode,
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
            limit: 1000,
            name: utils.assetsPath( 'image/[name].[hash:7].[ext]' )
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: utils.assetsPath( 'fonts/[name].[hash:7].[ext]' )
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin( {
        'process.env.NODE_ENV': JSON.stringify( mode ),
      } )
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  }
} 

module.exports = config;