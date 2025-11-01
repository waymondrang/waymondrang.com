const path = require("path");

module.exports = {
    entry: {
        main: "./src/main.ts",
        initialize: "./src/initialize.ts",
        404: "./src/404.ts",
    },
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
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "public/bundle"),
    },
};
