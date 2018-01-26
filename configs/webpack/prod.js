// production config
const merge = require("webpack-merge");
const Path = require("path");
const webpack = require("webpack");
const commonConfig = require("./common");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = merge(commonConfig, {
	entry: "./index.tsx",
	output: {
		filename: "js/bundle.min.js",
		path: Path.resolve(__dirname, "../../dist"),
		publicPath: "/"
	},
	devtool: "source-map",
	plugins: [
		new FaviconsWebpackPlugin({
			logo: "./assets/img/favicon.png",
			prefix: "icons/",
			inject: true,
			persistentCache: false,
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: true,
				favicons: true,
				firefox: true,
				opengraph: true,
				twitter: true,
				yandex: true,
				windows: true
			}
		}),
		new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify("production")})
	]
});
