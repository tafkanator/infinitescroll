var gulp = require('gulp');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');

var outputDir = './app/gen';

gulp.task('html', function () {
	gulp.src('./app/*.html')
		.pipe(connect.reload());
});

gulp.task('js', function() {
	// Single entry point to browserify
	gulp.src('./app/js/main.js')
		.pipe(browserify({
			insertGlobals : true,
			debug : true
		}))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

gulp.task('less', function () {
	gulp.src('./app/less/main.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('./app/js/*.js', ['js']);
	gulp.watch('./app/less/*.less', ['less']);
	gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

gulp.task('default', ['js', 'less', 'connect', 'watch']);