var debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.min.js',
    publicPath: '/'
  },
  module: {
    loaders: [
        {
            test: /\.styl$/,
            loader: 'style-loader!css-loader?sourceMap!postcss-loader?browser=last 2 versions!stylus-loader'
        },
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.coffee$/,
            loader: "coffee-loader"
        },
        {
            test: /\.(coffee\.md|litcoffee)$/,
            loader: "coffee-loader?literate"
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192'
        },
        {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'url-loader'
        },
        {
            test: /\.jade$/,
            loader: "jade-loader?self"
        }
    ]
  },
  stylus:{
    use:[
      require('nib')(),
      require('rupture')(),
      require('jeet')()
    ]
  },
  plugins: debug?[]:[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle:false,sourcemap:false})
  ],
};
