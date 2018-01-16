var config = require('./gulpconfig.json');
var	gulp = require('gulp');
var	shell = require('gulp-shell');
var cloudflare = require('gulp-cloudflare');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var gifsicle = require('imagemin-gifsicle');
var replace = require('gulp-replace');
var fs = require('fs');
var download = require('gulp-download');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');


gulp.task('minify-css', () => {
	return gulp.src('_site/assets/**/*.css')
	  .pipe(cleanCSS({compatibility: 'ie8'}))
	  .pipe(gulp.dest('_site/assets'));
  });

gulp.task('minify-html', function() {
    return gulp.src('_site/**/*.html')
      .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(gulp.dest('_site'));
  });

gulp.task('jekyll', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'jekyll build'
		]));
});

gulp.task('optimize-images', function () {
	return gulp.src(['_site/**/*.jpg', '_site/**/*.jpeg', '_site/**/*.gif', '_site/**/*.png'])
		.pipe(imagemin({
			progressive: false,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant(), jpegtran(), gifsicle()]
		}))
		.pipe(gulp.dest('_site'));
});

gulp.task('optimize-css', function() {
   return gulp.src('_site/assets/css/**/*.css')
	   .pipe(autoprefixer())
	   .pipe(uncss({
		   html: ['_site/**/*.html'],
		   ignore: []
	   }))
	   .pipe(cleanCSS({keepBreaks: false}))
	   .pipe(gulp.dest('_site/assets/css'));
});

gulp.task('optimize-html', function() {
	return gulp.src('_site/**/*.html')
		.pipe(htmlmin({
			quotes: true
		}))
		.pipe(replace(/<link href=\"\/css\/main.css\"[^>]*>/, function(s) {
			var style = fs.readFileSync('_site/assets/css/main.css', 'utf8');
			return '<style>\n' + style + '\n</style>';
		}))
		.pipe(gulp.dest('_site/'));
});

gulp.task('fetch-newest-analytics', function() {
	return download('https://www.google-analytics.com/analytics.js')
    	.pipe(gulp.dest('assets/'));
});

gulp.task('rsync-files', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'cd _site && rsync -az --delete . ' + config.remoteServer + ':' + config.remotePath
		]));
});

gulp.task('purge-cache', function() {
	var options = {
		token: config.cloudflareToken,
		email: config.cloudflareEmail,
		domain: config.cloudflareDomain
	};
 
	cloudflare(options);
});

gulp.task('raw-deploy', function(callback) {
	runSequence(
		'jekyll',
		'rsync-files',
		'purge-cache',
		callback
	);
});

gulp.task('dry-run', function(callback) {
	runSequence(
		'fetch-newest-analytics',
		'jekyll',
		'optimize-images',
		'optimize-css',
		'minify-html',
		callback
	);
});

gulp.task('deploy', function(callback) {
	runSequence(
		'fetch-newest-analytics',
		'jekyll',
		'optimize-images',
		'optimize-css',
		'optimize-html',
		'rsync-files',
		'purge-cache',
		callback
	);
});