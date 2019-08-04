const TerserPlugin = require("terser-webpack-plugin");

const WorkerPlugin = require("worker-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, { mode }) => {
  const dev = mode === "development";
  return {
    mode: "development",
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader"
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, `css-loader?sourceMap=${dev}`]
        }
      ]
    },
    plugins: [
      new WorkerPlugin({ globalObject: false }),
      new HtmlWebpackPlugin({ template: "src/index.html" }),
      new MiniCssExtractPlugin()
    ],
    resolve: { extensions: [".ts", ".tsx", ".js"] },
    optimization: {
      minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
    },
    devtool: dev ? "inline-source-map" : "none",
    devServer: {
      contentBase: "./dist",
      overlay: true,
      watchContentBase: true
    }
  };
};
