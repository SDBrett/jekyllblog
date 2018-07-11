var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var download = require('gulp-download');
var exec = require('child_process').exec;
var fs = require('fs');
var gifsicle = require('imagemin-gifsicle');
var	gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var pump = require('pump');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var	shell = require('gulp-shell');
var uglify = require('gulp-uglify');

gulp.task('s3-push', function(cb) {
	exec('s3_website push', function(err, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
	});
});

gulp.task('minify-html', function() {
    return gulp.src('_site/**/*.html')
	  .pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true}))
	  .pipe(gulp.dest('_site'));
  });

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('minify-js', function () {
  pump([
        gulp.src('_site/**/*.js'),
        uglify(),
        gulp.dest('_site')
    ]
  );
});


gulp.task('jekyll', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'jekyll build'
		]));
});

gulp.task('dry-run', function(callback) {
	runSequence(
		'jekyll',
		'minify-html',
		'minify-js',
		callback
	);
});

gulp.task('deploy', function(callback) {
	runSequence(
		'jekyll',
		'minify-html',
		'minify-js',
		's3-push',
		callback
	);
});