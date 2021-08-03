// @ts-nocheck
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const path = require("path");
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
//process.env.NODE_ENV == 'production' ? 'production' : 'development';
module.exports = {
  mode: "development", //默认是开发模块
  entry: path.resolve(__dirname, '../packages/t-ui/index.ts'),
  output: {
    path: path.join(__dirname, "../build"),
    filename: "index.js",
    libraryTarget: 'umd',
    library: 't-ui'
  },
  externals: {
    react: {
        root: 'react',
        commonjs: 'react',
        commonjs2: 'react'
    }
},
  devtool: "source-map",
  devServer: {
    port: 3903,
    // open: true,
    hot: true, //热更新插件
    inline: true, //实时刷新
  },
  resolve: {
    // alias: {
    //   "@": path.resolve(__dirname, "src"),
    //   "~": path.resolve(__dirname, "node_modules"),
    // },
    //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
    extensions: [".ts", ".tsx", ".js",".jsx", ".json"]
  },
  module: {
    rules: [{
        test: /\.(j|t)sx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          compilerOptions: {
            module: "es2015",
          },
        },
      },
      {
        enforce: "pre",
        test: /\.(j|t)sx?$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 0
            },
          },
          {
            loader: "postcss-loader",
          
          },
          "less-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader','postcss-loader', 'sass-loader']
      },
      {//.(eot|woff2|woff|ttf|svg)
        test: /\.(jpg|png|gif|svg|jpeg|eot|woff2|woff|ttf)$/,
        use: ["url-loader"],
      },
    ],
  },
  plugins: [
    //合并额外的js包(暂时无用)
    // new CommonsChunkPlugin('lib', './dist/js/lib.js', jsExtract),
    //设置全局使用的变量
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,"../docs/public/template.html"),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {}
    }),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
   
  ],
};