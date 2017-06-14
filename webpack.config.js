var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    "index": "./app/index/index.js",
    "vendors": ["./app/assets/scripts/jquery-ui.js", "./app/assets/scripts/jquery.colorpicker.js"]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: 'star/[hash:8].[name].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      'src': path.resolve(__dirname, 'app'),
      'views': path.resolve(__dirname, 'app/views'),
      'assets': path.resolve(__dirname, 'app/assets'),
      'style': path.resolve(__dirname, 'app/style'),
      'components': path.resolve(__dirname, 'app/components'),
    }
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' }, {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../app/filename') //https://github.com/webpack/css-loader/issues/295
        ],
        loader: "style-loader!css-loader"
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }, {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }, {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      }, {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: "file?name=fonts/[name].[ext]"
      }
    ]
  },
  plugins: [
    //通过一些计算方式减少chunk的大小的插件
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
    new webpack.ProvidePlugin({
      jquery: "jquery",
      jQuery: "jquery",
      $: "jquery"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index/index.html',
      chunks: ["vendors", "index"],
      inject: true,
      hash: true,
      // 压缩HTML文件
      minify: {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),

  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  vue: {
    loaders: {
      'scss': 'vue-style!css!sass',
    }
  },
  node: {
    fs: 'empty'
  },
  devtool: '#eval-source-map'
};

