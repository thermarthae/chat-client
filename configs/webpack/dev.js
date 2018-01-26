// development config
const merge = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = merge(commonConfig, {
	entry: [
		"react-hot-loader/patch", // activate HMR for React
		"webpack-dev-server/client?http://localhost:8080", // bundle the client for webpack-dev-server and connect to the provided endpoint
		"webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
		"./index.tsx" // the entry point of our app
	],
	devServer: {
		hot: true, // enable HMR on the server
		historyApiFallback: true,
	},
	devtool: "cheap-module-eval-source-map",
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // enable HMR globally
		new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
		new FaviconsWebpackPlugin({
			logo: "./assets/img/favicon.png",
			prefix: "icons/",
			inject: true,
			persistentCache: true,
			icons: {
				android: false,
				appleIcon: false,
				appleStartup: false,
				coast: false,
				favicons: true,
				firefox: false,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		})
	],
});
