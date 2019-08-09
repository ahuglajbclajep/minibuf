const WorkerPlugin = require("worker-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); // from webpack
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/** @type {(env: typeof process.env, argv: { mode: string }) => import("webpack").Configuration} */
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
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({ template: "src/index.html" }),
      new GenerateSW({
        skipWaiting: true,
        clientsClaim: true,
        // see https://github.com/GoogleChrome/workbox/issues/2064
        inlineWorkboxRuntime: true,
        sourcemap: false
      })
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
