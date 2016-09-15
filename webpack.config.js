const path = require('path');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');

let config = {
	entry: {
		main: path.resolve('app/main')
	},
	output: {
		path: path.resolve('dist'),
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
			{ test: /\.styl$/, loader: ExtractPlugin.extract('css!stylus'), exclude: /node_modules/ },
			{ test: /\.(jpe?g|png|gif|svg)$/i,  loaders: [
				'url?limit=10000&name=assets/[name].[hash:8].[ext]',
				'image-webpack?{bypassOnDebug: true, progressive:true, interlaced:true, optimizationLevel: 7, pngquant:{quality: "65-70", speed: 5}}'
			]}
		]
	},
	resolve: {
		modulesDirectories: ['node_modules', 'app'],
		extensions: ['', '.js', '.jsx', '.styl']
	},
	plugins: [
		new ExtractPlugin('[name].bundle.css')
	],
	externals: {
		electron: 'require("electron")'
	}
};

if (process.env.NODE_ENV === 'production') {
	config.plugins = config.plugins.concat(
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({ output: { comments: false }})
	);
	config.resolve.alias = {
		moment: path.resolve('node_modules/moment/min/moment.min.js'),
		react: path.resolve('node_modules/react/dist/react.min.js'),
		'react-dom': path.resolve('node_modules/react-dom/dist/react-dom.min.js')
	};
}

module.exports = config;
