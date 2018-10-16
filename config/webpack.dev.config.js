const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require( 'path' );
const utils = require('./utils');

process.env.NODE_ENV = 'development';

let config = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [
      path.join( __dirname, '../src/index.js' )
    ]
  },
  output: {
    path: path.join( __dirname, './dist/' ),
    publicPath: "/",
    filename: "[name].js"
  },
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
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
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
    new HtmlWebpackPlugin( {
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    } )
  ]
};

module.exports = config;