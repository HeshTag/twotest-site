let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass')(require('node-sass'));
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();

function styleScss(done) {

	gulp.src('./resource/scss/**/*')
	  .pipe(sourcemaps.init())
	  .pipe( sass({
	  	errorLogToConsole: true,
	  	outputStyle: 'compressed'
	  }) )
	  .on('error', console.error.bind(console))
	  .pipe( autoprefixer({
	  	overrideBrowserslist: require('./package.json').overrideBrowserslist
	  }) )
	  .pipe( rename({suffix: '.min'}) )
	  // .pipe(sourcemaps.write('./'))
	  .pipe(sourcemaps.write())
	  .pipe( gulp.dest('./public/css/') )
	  .pipe(browserSync.stream());

	done();
}

function browserReload(done) {
	browserSync.reload();
	done();
}

function server(done) {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 3000
	});
	done();
}

function watchFiles() {
	gulp.watch('./resource/scss/**/*', styleScss);
	gulp.watch('./**/*.html', browserReload);
	gulp.watch('./**/*.php', browserReload);
	gulp.watch('./**/*.js', browserReload);
}

gulp.task('default', gulp.parallel(server, gulp.series(styleScss, watchFiles)));

// exports.def = defaultSomeTask;

// Bootstrap 5
// https://www.youtube.com/watch?v=kaLZgD-Ctss&list=PLD-piGJ3Dtl3qZFKzosT47lCCMEcqMK_L&index=1
// https://www.youtube.com/watch?v=z6a2BGeYwpk&list=PLD-piGJ3Dtl3qZFKzosT47lCCMEcqMK_L&index=2 
// https://www.youtube.com/watch?v=5Q-lv5xuFu0&list=PLD-piGJ3Dtl3qZFKzosT47lCCMEcqMK_L&index=3 
// https://www.youtube.com/watch?v=cyyy1nisy1I&list=PLD-piGJ3Dtl3qZFKzosT47lCCMEcqMK_L&index=4 
// https://www.youtube.com/watch?v=EP4qGTSEs4U&list=PLD-piGJ3Dtl3qZFKzosT47lCCMEcqMK_L&index=5 
// https://www.youtube.com/watch?v=A6r6c5aX4XE&list=PLD-piGJ3Dtl3qZFKzosT47lCCMEcqMK_L&index=6