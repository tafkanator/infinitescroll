var gulp = require('gulp');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var path = require('path');

gulp.task('process-scripts', function() {
	// Single entry point to browserify
	gulp.src('src/main.js')
		.pipe(browserify({
			insertGlobals : true,
			debug : true
		}))
		.pipe(gulp.dest('./dist'))
});

gulp.task('process-less', function () {
	gulp.src('./src/*.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/*.js', ['process-scripts']);
	gulp.watch('src/*.less', ['process-less']);
});