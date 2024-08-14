const path = require("node:path");
module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: "babel-loader",
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false,
        }
      },
    ],
  },
};
