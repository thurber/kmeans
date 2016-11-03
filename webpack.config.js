var Webpack = require('webpack')
var DashboardPlugin = require('webpack-dashboard/plugin')

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    loader: 'babel',
  },
  {
    test: /\.json$/,
    loader: 'json',
  },
  {
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass'],
  },
]

const prod = {
  output: {
    path: './docs/',
    filename: '[name].min.js',
    publicPath: '/',
    library: 'growth-charts',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
  entry: {
    'index': './src/index.js',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        'max_line_len': 500
      }
    }),
  ],
  module: {
    loaders: loaders,
  },
}

const dev = {
  output: {
    path: './docs/',
    filename: '[name].min.js',
    publicPath: '/'
  },
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:8282',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ]
  },
  devServer: {
    contentBase: './docs',
    hot: true,
    quiet: true,
    host: '0.0.0.0',
    port: 8282,
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
  module: {
    loaders: loaders.slice(1).concat(
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot-loader/webpack', 'babel']
      }
    ),
  },
}

switch (process.env.npm_lifecycle_event) {
  case 'build':
    module.exports = prod
    break;
  default:
    module.exports = dev
}
