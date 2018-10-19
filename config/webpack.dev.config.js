const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const merge = require( 'webpack-merge' );
const baseConfig = require( './webpack.base.config' );

process.env.NODE_ENV = 'development';

let devConfig = {
  mode: process.env.NODE_ENV,
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin( {
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    } )
  ]
};

module.exports = merge( baseConfig, devConfig );