const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const merge = require( 'webpack-merge' );
const baseConfig = require( './webpack.base.config' );

const mode = 'development';

let devConfig = {
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
  ]
};

module.exports = merge( baseConfig( mode ), devConfig );