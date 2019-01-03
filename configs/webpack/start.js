const isProd = process.env.NODE_ENV === 'production';

require('ts-node').register({
	compilerOptions: {
		module: 'commonjs',
		target: 'es5',
		resolveJsonModule: true,
		esModuleInterop: true
	}
});

if (isProd) {
	console.log('\x1b[36m%s\x1b[0m', 'Webpack config file: prod.config.ts');
	module.exports = require('./prod.config');
}
else {
	console.log('\x1b[36m%s\x1b[0m', 'Webpack config file: dev.config.ts');
	module.exports = require('./dev.config');
}
