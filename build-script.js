const packager = require('electron-packager');

packager({
	name: 'Linbox',
	dir: __dirname,
	platform: process.env.PLATFORM === 'win' ? 'win32' : 'darwin',
	out: __dirname + '/build',
	ignore: [
		'app',
		'.babelrc',
		'.editorconfig',
		'.gitignore',
		'build-script.js',
		'webpack.config.js'
	]
}, (err, appPath) => {
	if (err) {
		console.log(err);
		return false
	}
	console.log(`Build app to ${appPath}`);
});
