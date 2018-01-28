const merge = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common");
//const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = merge(commonConfig, {
	mode: "development",
	devtool: "cheap-module-eval-source-map",
	output: {
		publicPath: "/"
	},
	devServer: {
		hot: true,
		historyApiFallback: true,
		inline: true,
		progress: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// new FaviconsWebpackPlugin({
		// 	logo: "./assets/img/favicon.png",
		// 	prefix: "icons/",
		// 	inject: true,
		// 	persistentCache: true,
		// 	icons: {
		// 		android: false,
		// 		appleIcon: false,
		// 		appleStartup: false,
		// 		coast: false,
		// 		favicons: true,
		// 		firefox: false,
		// 		opengraph: false,
		// 		twitter: false,
		// 		yandex: false,
		// 		windows: false
		// 	}
		// }),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		})
	],
});
