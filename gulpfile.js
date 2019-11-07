var	gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var pump = require('pump');
var runSequence = require('run-sequence');
var	shell = require('gulp-shell');
var uglify = require('gulp-uglify');

gulp.task('minify-html', function() {
    return gulp.src('_site/**/*.html')
	  .pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true}))
	  .pipe(gulp.dest('_site'));
  });

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

gulp.task('build', function(callback) {
	runSequence(
		'jekyll',
		'minify-html',
		'minify-js',
		callback
	);
});