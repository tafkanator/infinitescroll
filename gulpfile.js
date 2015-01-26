var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('process-scripts', function() {
	// Single entry point to browserify
	gulp.src('src/main.js')
		.pipe(browserify({
			insertGlobals : true,
			debug : true
		}))
		.pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
	gulp.watch('src/*.js', ['process-scripts'])
});