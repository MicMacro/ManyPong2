/**
 * @file             : webpack.config.js
 * @author           : Michael M.
 * Date              : 27.04.2020
 * Last Modified Date: 27.04.2020
 * Last Modified By  : Michael M.
 */
// ManyPong (c) by The MicMacro Group
//
// ManyPong is licensed under a
// Creative Commons Attribution-ShareAlike 4.0 International License.
//
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.

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
