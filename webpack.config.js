const path = require("path"); // eslint-disable-line

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    // target: "node" <-- Caso você queira programar para o nodejs
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"], // <-- Vai mudar os imports na hora da transpilação
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "frontend", "assets", "js"),
    },
    devtool: "source-map",
};
