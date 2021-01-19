const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: ["webpack/hot/dev-server", "/src/index.tsx"],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /(node_modules|proxy)/,
      },
      {
        test: /\.(gql|graphql)?$/,
        use: "graphql-tag/loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
}
