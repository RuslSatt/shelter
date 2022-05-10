const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: 'development',
   entry: {
      main: './main/js/index.js',
      pets: './pets/js/pets.js'
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
      assetModuleFilename: 'assets/images/[name][ext][query]',
      clean: true,
   },
   target: 'web',
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'dist'),
         watch: true,
      },
      open: true,
      hot: false,
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: "index.html",
         template: path.resolve(__dirname, 'src/index.html'),
         favicon: "./assets/ico/favicon.ico",
      }),
      new HtmlWebpackPlugin({
         filename: "pets.html",
         template: path.resolve(__dirname, 'src/pets.html'),
         favicon: "./assets/ico/favicon.ico",
      }),
      new MiniCssExtractPlugin({
         filename: 'css/[name].[contenthash].css',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.html$/i,
            loader: "html-loader",
         },
         {
            test: /\.s?css$/,
            use: [MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
               {
                  loader: "postcss-loader",
                  options: {
                     postcssOptions: {
                        plugins: [
                           [
                              "postcss-preset-env",
                              {
                                 // Options
                              },
                           ],
                        ],
                     },
                  },
               },
            ]
         },
         {
            test: /\.(png|jpg|svg)$/,
            type: 'asset/resource',
         },
         {
            test: /\.(xml|csv)$/,
            type: 'asset/resource',
            generator: {
               filename: 'static/[contenthash][ext][query]'
            }
         },
         {
            test: /\.(ttf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[contenthash][ext][query]'
            }
         },
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
      ]
   },
   optimization: {
      minimizer: [
         new TerserWebpackPlugin(),
         new CssMinimizerWebpackPlugin(),
         new ImageMinimizerPlugin ({
            minimizer: {
               implementation: ImageMinimizerPlugin.imageminMinify,
               options: {
                  plugins: [
                     ["gifsicle", { interlaced: true }],
                     ["jpegtran", { progressive: true }],
                     ["optipng", { optimizationLevel: 5 }],
                     [
                        "svgo",
                        {
                           plugins: extendDefaultPlugins([
                              {
                                 name: "removeViewBox",
                                 active: false,
                              },
                              {
                                 name: "addAttributesToSVGElement",
                                 params: {
                                    attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                 },
                              },
                           ]),
                        },
                     ],
                  ],
               },
            },
         }),
      ]
   }
};
