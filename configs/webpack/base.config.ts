import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { getTransformer } from 'ts-transform-graphql-tag';
import copyWebpackPlugin from 'copy-webpack-plugin';

import packageJson from '../../package.json';

const rootPath = path.resolve(__dirname, '../../');
const srcPath = path.resolve(rootPath, 'src');
const tsconfigPath = path.resolve(rootPath, 'tsconfig.json');
const tslintPath = path.resolve(rootPath, 'tslint.json');

const baseConfig: webpack.Configuration = {
	entry: {
		tslib: 'tslib',
		main: './index.tsx',
	},
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
				use: {
					loader: 'ts-loader',
					options: {
						getCustomTransformers: () => ({ before: [getTransformer()] }),
						configFile: tsconfigPath,
						transpileOnly: true
					}
				}
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
			template: 'public/index.html.ejs',
			favicon: 'public/favicon.png',
			meta: {
				viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
				description: 'React App',
				'theme-color': '#1c1d2c',
			}
		}),
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true,
			async: false,
			tsconfig: tsconfigPath,
			tslint: tslintPath,
			useTypescriptIncrementalApi: true
		}),
		new copyWebpackPlugin([{ from: 'public/locales', to: 'locales' }]),
	]
};
export default baseConfig;
