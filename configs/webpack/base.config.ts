import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { getTransformer } from 'ts-transform-graphql-tag';

import packageJson from '../../package.json';

const rootPath = path.resolve(__dirname, '../../');
const srcPath = path.resolve(rootPath, 'src');
const tsconfigPath = path.resolve(rootPath, 'tsconfig.json');

const baseConfig: webpack.Configuration = {
	entry: './index.tsx',
	context: srcPath,
	resolve: {
		extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
		alias: {
			'@src': srcPath
		}
	},
	output: {
		publicPath: '/'
	},
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
