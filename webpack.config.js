const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",	// CHANGE TO "production" UPON RELEASE!
	entry: "./src/index.js",
	output: {
		filename: "main.bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			filename: "index.html",
			title: "ManyPong 2",
			headHtmlSnippet: "<style>body { padding: 0; margin: 0; }</style>",
		})
	]
};