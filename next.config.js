const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

module.exports = withSass(withTypescript({
	cssModules: false,
	webpack(config) {
		config.resolve.plugins = [new TsConfigPathsPlugin()]
		return config
	}
}))
