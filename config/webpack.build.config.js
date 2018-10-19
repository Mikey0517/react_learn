const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const merge = require( 'webpack-merge' );
const baseConfig = require( './webpack.base.config' );
const config = require( '../config/config.js' );
const utils = require( './utils' );

process.env.NODE_ENV = 'production';

let buildConfig = {
  mode: process.env.NODE_ENV,
  devtool: '#eval-source-map',
  output: {
    filename: utils.assetsPath( 'js/[name].[chunkhash].js' ),
    chunkFilename: utils.assetsPath( 'js/[id].[chunkhash].js' )
  },
  plugins: [
    new ExtractTextPlugin( {
      filename: utils.assetsPath( 'css/[name].[contenthash].css' )
    } ),
    new HtmlWebpackPlugin( {
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    } ),
  ]
};

module.exports = merge( baseConfig, buildConfig );