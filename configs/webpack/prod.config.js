const path = require('path');
const merge = require('webpack-merge');
const baseCfg = require('./base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseCfg, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: 'js/bundle.min.js',
		chunkFilename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, '../../dist')
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
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
							data: '@import \'~Style/variables\';'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../../')
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css'
		}),
		new BundleAnalyzerPlugin(),
	]
});
//TODO html minify
//TODO css minify => webpack 5
