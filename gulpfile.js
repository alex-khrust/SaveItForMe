let preprocessor = 'sass'; // Preprocessor (sass, scss, less, styl)
let fileswatch   = 'html,htm,txt,json,md,woff2'; // List of files extensions for watching & hard reload (comma separated)
let imageswatch  = 'jpg,jpeg,png,webp,svg'; // List of images extensions for watching & compression (comma separated)

const { src, dest, parallel, series, watch, lastRun } = require('gulp');
const sass         = require('gulp-sass');
const scss         = require('gulp-sass');
const less         = require('gulp-less');
const styl         = require('gulp-stylus');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const rsync        = require('gulp-rsync');
const del          = require('del');

// Local Server

function browsersync() {
	browserSync.init({
		server: { baseDir: '.' },
		notify: false,
    // port: 8080,
		// online: true, // Work offline without internet connection
		// tunnel: true, tunnel: "SaveItForMe",
	})
}

// Custom Styles

function styles() {
	return src('./' + preprocessor + '/main.*')
	.pipe(eval(preprocessor)())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: false }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
	.pipe(dest('css'))
	.pipe(browserSync.stream())
}

// Scripts & JS Libraries

function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
		// 'node_modules/swiper/js/swiper.min.js', // Слайдер Swiper
		// 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
		'js/app.js' // app.js. Always at the end
		])
	.pipe(concat('app.min.js'))
	.pipe(uglify()) // Minify JS (opt.)
	.pipe(dest('js'))
	.pipe(browserSync.stream())
}

// Images

function images() {
	return src('images/src/**/*')
	.pipe(newer('images/dest'))
	.pipe(imagemin())
	.pipe(dest('images/dest'))
}

function cleanimg() {
	return del('images/dest/**/*', { force: true })
}

// Deploy

function deploy() {
	return src('.')
	.pipe(rsync({
		root: '.',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}

// Watching

function startwatch() {
	watch('./' + preprocessor + '/**/*', parallel('styles'));
	watch(['./**/*.js', '!js/*.min.js'], parallel('scripts'));
	watch(['./**/*.{' + imageswatch + '}'], parallel('images'));
	watch(['./**/*.{' + fileswatch + '}']).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.assets      = series(cleanimg, styles, scripts, images);
exports.styles      = styles;
exports.scripts     = scripts;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.deploy      = deploy;
exports.default     = parallel(images, styles, scripts, browsersync, startwatch);
