const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: 'web',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isDev ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|styl|stylus)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            // 重用 stylus-loader 生成的 source map，加快打包速度
            options: {
              sourceMap: true,
            },
          },
          'stylus-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            // 使用 url-loader 处理图片等文件
            // 如果文件小于指定的字节，则转为 base64
            options: {
              limit: 10240,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].[hash:8].css' : '[name].[chunkhash:8].css',
      chunkFilename: isDev ? '[id].[hash:8].css' : '[id].[chunkhash:8].css',
    }),
  ],
};

if (isDev) {
  // 官方推荐的开发时的 source map 模式：#cheap-module-eval-source-map
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: '8080',
    host: 'localhost',
    // 将报错信息打到页面上
    overlay: {
      errors: true,
    },
    // 自动打开浏览器
    open: true,
    // 热更新
    hot: true,
  };
} else {
  config.entry = {
    app: path.resolve(__dirname, './src/index.js'),
    vendor: [
      'vue',
    ],
  };
  config.optimization = {
    splitChunks: {
      name: 'vendor',
    },
    runtimeChunk: {
      name: 'runtime',
    }
  };
  config.plugins.unshift(
    new CleanWebpackPlugin(),
  );
}

module.exports = config;
