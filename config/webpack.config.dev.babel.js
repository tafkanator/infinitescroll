import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const srcPath = path.resolve(__dirname, '..', 'src');
const buildPath = path.resolve(__dirname, '..', 'build');

export default {
	devtool: 'source-map',
	entry: [
		'webpack-dev-server/client?/',
		'webpack/hot/dev-server',
		path.join(srcPath, 'index'),
	],
	output: {
		path: buildPath,
		pathinfo: true,
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.scss'],
	},
	module: {
		loaders: [{
			test: /\.js$/,
			include: /src/,
			loader: 'babel-loader',
		}, {
			test: /\.scss/,
			loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
			include: /src/,
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.join(srcPath, 'index.template.html'),
			favicon: path.join(srcPath, 'gfx/favicon.ico'),
		}),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
		new webpack.HotModuleReplacementPlugin(),
	],
};
