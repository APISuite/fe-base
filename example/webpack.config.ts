import path from "path";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import dotenv from "dotenv";

export default {
  mode: "development",

  entry: path.resolve(__dirname, "src", "index.tsx"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(svg|webp|jpg|png|woff2)$/,
        use: ["file-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "dist", "index.html"),
      template: path.resolve(__dirname, "src", "index.html"),
      favicon: path.resolve(__dirname, "src", "favicon.ico"),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed),
    }),
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".svg"],
    alias: {
      react: path.resolve("./node_modules", "react"),
      "react-dom": path.resolve("./node_modules", "react-dom"),
    },
  },

  devServer: {
    https: {
      cert: fs.readFileSync(path.join(__dirname, "ssl", "localhost.pem")),
      key: fs.readFileSync(path.join(__dirname, "ssl", "localhost-key.pem")),
    },
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 5050,
    disableHostCheck: true,
  },

  devtool: "inline-source-map",
};
