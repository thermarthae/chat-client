const path = require('path');
const webpackServeWaitpage = require('webpack-serve-waitpage');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');

module.exports = {
	name: 'dev',
	extends: path.join(__dirname, 'base.config.js'),
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	serve: {
		content: path.resolve(__dirname, '../../dist'),
		add: (app, middleware, options) => {
			app.use(webpackServeWaitpage(options));
			app.use(convert(history({})));
		}
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
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
							data: '@import \'variables\';'
						}
					}
				]
			}
		]
	}
};
