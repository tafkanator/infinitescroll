import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const srcPath = path.resolve(__dirname, '..', 'src');
const buildPath = path.resolve(__dirname, '..', 'build');

export default {
	bail: true,
	devtool: 'source-map',
	entry: path.join(srcPath, 'index'),
	output: {
		path: buildPath,
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].chunk.js',
		publicPath: '/',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			include: /src/,
			loader: 'babel-loader',
		}, {
			test: /\.scss/,
			loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: ['css?sourceMap!sass?sourceMap'] }),
			include: /src/,
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.join(srcPath, 'index.template.html'),
			favicon: path.join(srcPath, 'gfx/favicon.ico'),
		}),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new ExtractTextPlugin('[name].[contenthash].css'),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compressor: {
				warnings: false,
			},
		}),
	],
};
