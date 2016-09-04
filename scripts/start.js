/* eslint-disable no-console */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../config/webpack.config.dev.babel';

const clearConsole = () => {
	process.stdout.write('\x1B[2J\x1B[0f');
};

const formatMessage = (message) =>
	message
		// Make some common errors shorter:
		.replace(
			// Babel syntax error
			'Module build failed: SyntaxError:',
			'Syntax error:'
		)
		.replace(
			// Webpack file not found error
			/Module not found: Error: Cannot resolve 'file' or 'directory'/,
			'Module not found:'
		)
		// Internal stacks are generally useless so we strip them
		.replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
		// Webpack loader names obscure CSS filenames
		.replace('./~/css-loader!./~/postcss-loader!./~/sass-loader!', '');

const compiler = webpack(config);

compiler.plugin('invalid', () => {
	clearConsole();
	console.log('Compiling...');
});

compiler.plugin('done', (stats) => {
	const hasErrors = stats.hasErrors();
	const hasWarnings = stats.hasWarnings();

	if (!hasErrors && !hasWarnings) {
		clearConsole();
		console.log('Build successful!');

		return;
	}

	clearConsole();

	const json = stats.toJson();

	const formattedErrors = json.errors.map(message =>
		`Error in ${formatMessage(message)}`
	);

	if (hasErrors) {
		console.log('Failed to compile.');
		console.log();

		formattedErrors.forEach(message => {
			console.log(message);
			console.log();
		});

		// If errors exist, ignore warnings.
		return;
	}

	const formattedWarnings = json.warnings.map(message =>
		`Error in ${formatMessage(message)}`
	);

	if (hasWarnings) {
		console.log('-- Compiled with warnings');
		console.log();
		formattedWarnings.forEach(message => {
			console.log(message);
			console.log();
		});
	}
});

new WebpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	historyApiFallback: true,
	noInfo: false,
	quiet: false,
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
	},
}).listen(3000, '0.0.0.0', (err) => {
	if (err) {
		return console.log(err);
	}
	clearConsole();

	return console.info('Starting dev server at http://localhost:3000/');
});
