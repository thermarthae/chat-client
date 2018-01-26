module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"sourceType": "module"
	},
	"rules": {
		"no-console": 0,
		"eqeqeq": [
			"error", "always"
		],
		"brace-style": [
			"error", "stroustrup"
		],
		// "indent": [
		// 	"error", "tab"
		// ],
		"linebreak-style": [
			"error", "windows"
		],
		"quotes": [
			"error", "double"
		],
		"semi": ["error", "always"]
	}
};
