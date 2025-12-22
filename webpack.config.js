const path = require("path");

module.exports = {
    entry: {
        main: "./src/ts/main.ts",
        initialize_dark_mode: "./src/ts/initialize_dark_mode.ts",
        404: "./src/ts/404.ts",
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
