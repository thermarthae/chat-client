import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import baseConfig from './base.config';

const prodConfig = merge(baseConfig, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, '../../dist'),
		filename: 'js/[name].[chunkhash:8].min.js',
		chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css'
		}),
		new BundleAnalyzerPlugin(),
	]
});
export default prodConfig;

//TODO html minify
//TODO css minify => webpack 5
