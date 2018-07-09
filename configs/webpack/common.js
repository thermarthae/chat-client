const Path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const PACKAGE = require('../../package.json');
const Stylish = require('webpack-stylish');
const tsconfigPath = Path.resolve(__dirname, '../../tsconfig.json');

module.exports = {
	entry: './index.tsx',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	context: Path.resolve(__dirname, '../../src'),
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					'cache-loader',
					{
						loader: 'thread-loader',
						options: {
							workers: require('os').cpus().length - 1
						}
					},
					{
						loader: 'ts-loader',
						options: {
							configFile: tsconfigPath,
							happyPackMode: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					//MiniCssExtractPlugin.loader,
					{
						loader: 'style-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},

			{
				test: /\.scss$/,
				use: [
					//MiniCssExtractPlugin.loader,
					{
						loader: 'style-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							data: '@import \'variables\';',
							includePaths: [
								Path.resolve(__dirname, '../../src/style')
							]
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: PACKAGE.name,
			template: 'index.html.ejs'
		}),
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true,
			async: false,
			tsconfig: tsconfigPath
		}),
		new Stylish(),

		// new CopyWebpackPlugin([{ from: 'assets/img', to: 'assets/img' },]),
		// new MiniCssExtractPlugin({
		// 	filename: 'css/[name].css',
		// 	chunkFilename: 'css/[id].css'
		// })
	]
};
