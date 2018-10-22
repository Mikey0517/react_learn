const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const merge = require( 'webpack-merge' );
const baseConfig = require( './webpack.base.config' );

process.env.NODE_ENV = 'development';

let devConfig = {
  mode: 'development',
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin( {
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    } ),
    new webpack.DefinePlugin( {
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
   } )
  ]
};

module.exports = merge( baseConfig, devConfig );