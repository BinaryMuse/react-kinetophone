module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + "/build",
    filename: "react-kinetophone.js",
    library: "ReactKinetophone",
    libraryTarget: "umd"
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  }
};
