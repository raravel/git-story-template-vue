module.exports = {
	"devServer": {
		"host": "222.117.116.134",
		"port": 9999
	},
	"transpileDependencies": [
		"vuetify"
	],
	"configureWebpack": {
		output: {
			filename: "dist/[name].js",
			chunkFilename: "dist/[name].js",
		}
	},
	"chainWebpack": config => {
		if (config.plugins.has("extract-css")) {
			const extractCSSPlugin = config.plugin("extract-css");
			extractCSSPlugin &&
				extractCSSPlugin.tap(() => [
					{
						filename: "dist/[name].css",
						chunkFilename: "dist/[name].css"
					}
				]);
		}
	}
}
