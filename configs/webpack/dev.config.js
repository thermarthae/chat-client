const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseCfg = require('./base.config');

module.exports = merge(baseCfg, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		inline: true,
		progress: true,
		hot: true,
		historyApiFallback: true,
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
							data: '@import \'~Style/variables\';'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
});
