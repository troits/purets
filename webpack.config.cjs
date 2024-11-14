const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    target: "web",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
    },
    devtool: "inline-source-map",
    plugins: [new HtmlWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node-modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};
