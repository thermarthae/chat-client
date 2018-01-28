const merge = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common");
const Path = require("path");
//const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = merge(commonConfig, {
	mode: "production",
	devtool: "source-map",
	output: {
		filename: "js/bundle.min.js",
		path: Path.resolve(__dirname, "../../dist"),
		publicPath: "/"
	},
	plugins: [
		// new FaviconsWebpackPlugin({
		// 	logo: "./assets/img/favicon.png",
		// 	prefix: "icons/",
		// 	inject: true,
		// 	persistentCache: false,
		// 	icons: {
		// 		android: true,
		// 		appleIcon: true,
		// 		appleStartup: true,
		// 		coast: true,
		// 		favicons: true,
		// 		firefox: true,
		// 		opengraph: true,
		// 		twitter: true,
		// 		yandex: true,
		// 		windows: true
		// 	}
		// }),
		new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify("production")})
	]
});
