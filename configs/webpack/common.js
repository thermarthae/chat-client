const Path = require("path");
const AwesomeTS = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const CopyWebpackPlugin = require("copy-webpack-plugin");
const PACKAGE = require("../../package.json");

module.exports = {
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
	context: Path.resolve(__dirname, "../../src"),
	module: {
		rules: [{
				test: /\.js$/,
				use: [
					"babel-loader", "source-map-loader"
				],
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				use: "awesome-typescript-loader"
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
							loader: "css-loader",
							options: {
								sourceMap: true,
								importLoaders: 1
							}
						},
						"postcss-loader",
					]
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
							loader: "css-loader",
							options: {
								sourceMap: true,
								importLoaders: 1
							}
						},
						{
							loader: "sass-loader",
							options: {
									data: "@import 'variables';",
									sourceMap: true,
									includePaths: [
										Path.join(__dirname, "../../src/style")
									]
							}
						},
						"postcss-loader",
					]
				})
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					"file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
					"image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false"
				]
			}
		]
	},
	plugins: [
		new AwesomeTS.CheckerPlugin(),
		//new CopyWebpackPlugin([{ from: "assets/img", to: "assets/img" },]),
		new HtmlWebpackPlugin({
			title: PACKAGE.name,
			template: "index.html.ejs"
		}),
		new ExtractTextPlugin("css/[name].css")
	],
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}
};
