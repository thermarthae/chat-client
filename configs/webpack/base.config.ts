import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { getTransformer } from 'ts-transform-graphql-tag';

import packageJson from '../../package.json';

const tsconfigPath = path.resolve(__dirname, '../../tsconfig.json');

const baseConfig: webpack.Configuration = {
	entry: './index.tsx',
	context: path.resolve(__dirname, '../../src'),
	resolve: {
		extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx'],
		alias: {
			Components: path.resolve(__dirname, '../../src/components/'),
			Utils: path.resolve(__dirname, '../../src/utils/')
		}
	},
	output: {
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			},
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
							getCustomTransformers: () => ({ before: [getTransformer()] }),
							configFile: tsconfigPath,
							happyPackMode: true
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							disable: true
						},
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: packageJson.name,
			template: 'index.html.ejs',
			favicon: 'favicon.png',

		}),
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true,
			async: false,
			tsconfig: tsconfigPath
		}),
	]
};
export default baseConfig;