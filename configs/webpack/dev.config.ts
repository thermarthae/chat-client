import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './base.config';

const devConfig = merge(baseConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	devServer: {
		inline: true,
		progress: true,
		hot: true,
		historyApiFallback: true
	} as any,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
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
		new webpack.HotModuleReplacementPlugin()
	],
});
export default devConfig;
