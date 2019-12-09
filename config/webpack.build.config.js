const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const merge = require( 'webpack-merge' );
const baseConfig = require( './webpack.base.config' );
const config = require( '../config/config.js' );
const utils = require( './utils' );

const mode = 'production';

let buildConfig = {
  output: {
    filename: utils.assetsPath( 'js/[name].[chunkhash].js' ),
    chunkFilename: utils.assetsPath( 'js/[id].[chunkhash].js' )
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract( {
          fallback: "style-loader",
          use: "css-loader"
        } )
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin( {
      filename: utils.assetsPath( 'css/[name].[chunkhash].css' )
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
    new BundleAnalyzerPlugin( {
      analyzerHost: '127.0.0.1', // 分析界面的启动url地址
      analyzerPort: 8888,
      openAnalyzer: false
    } )
  ],
};

module.exports = merge( baseConfig( mode ), buildConfig );