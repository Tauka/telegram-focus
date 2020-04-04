const path = require('path');
const ExtensionReloader  = require('webpack-extension-reloader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	watch: true,
	entry: {
		'content_script': './src/contentscript.js',
		background: './src/background_script.js'
	},
	plugins: [
		new ExtensionReloader({
			manifest: path.resolve(__dirname, "manifest.json"),
			port: 9090, // Which port use to create the server
			reloadPage: true, // Force the reload of the page also
			entries: { // The entries used for the content/background scripts or extension pages
				contentScript: 'content_script',
				background: 'background'
			}
		}),
		new CopyWebpackPlugin([
			{ from: "./manifest.json" },
			{ from: "./src/options.html" },
			{ from: "./src/options.js" },
			{ from: "./FTIcon.png" },
		]),
	]
}