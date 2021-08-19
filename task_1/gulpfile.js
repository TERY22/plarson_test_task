const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      browsersync  = require('browser-sync'),
      postCss      = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      pug          = require('gulp-pug'),
      data         = require('./data');

gulp.task('pug', () => {
	return gulp.src('./src/**/*.pug')
		.pipe(pug({
			locals: data.locals,
			pretty: true
		}))
		.pipe(gulp.dest('./build'))
		.pipe(browsersync.stream())
});


gulp.task('css', () => {
    return gulp.src('./src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postCss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browsersync.stream())
});

gulp.task('sync', () => {
    browsersync.init({
        proxy: 'test',
        open: false,
        notify: false
    })
});

gulp.task('build', ['pug', 'css']);

gulp.task('watch', () => {
    gulp.watch(['./src/**/*.scss'], ['css']);
	gulp.watch(['./src/**/*.pug'], ['pug']);
    gulp.watch(['./build/**/*.css',
				'./build/**/*.pug',
                ]).on('change', browsersync.reload);
});

gulp.task('default', ['build', 'sync', 'watch']);