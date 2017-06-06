var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        postcss: [require('postcss-cssnext')({
            features: {
              rem: false
            }
          })
          // ,
          // require('postcss-pxtorem')({
          //   rootValue: 20,
          //   propWhiteList: []
          // })
        ]
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      'src',
      'node_modules'
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    host: '0.0.0.0',
    port: 8080
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.output.publicPath = './dist/';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      "WEBPACK_CONIFG_HOST":'location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  ])
}else if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      "WEBPACK_CONIFG_HOST":'"http://amptest.wisedu.com/xsfwfw/"'
    })
  ])
}
