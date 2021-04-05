const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const SOURCE_PATH = path.resolve(__dirname, 'src');
const PUBLIC_PATH = path.resolve(__dirname, 'public');

const devConfig = {

   mode: 'development',

   name: 'dev',

   entry: SOURCE_PATH,

   resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
   },

   module: {
      rules: [{ test: /\.(js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }, { test: /\.(ts)x?$/, use: ['babel-loader', 'ts-loader'], exclude: /node_modules/ }],
   },

   plugins: [
      new HtmlWebpackPlugin({ template: path.join(PUBLIC_PATH, 'index.html') })
   ],

   devtool: 'source-map',

   devServer: {
      port: 1996,
      open: true
   }

};

const prodConfig = {

   mode: 'production',

   name: 'prod',

   entry: path.join(SOURCE_PATH, 'index.tsx'),

   output: {
      filename: 'my-slice.js',
      path: path.resolve(__dirname, 'build'),
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: path.join(PUBLIC_PATH, 'index.html'),
         inject: true
      })
   ],

   resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
   },

   module: {
      rules: [{ test: /\.(js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }, { test: /\.(ts)x?$/, use: ['babel-loader', 'ts-loader'], exclude: /node_modules/ }],
   }

};

module.exports = [
   devConfig,
   prodConfig
];