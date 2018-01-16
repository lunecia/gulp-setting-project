const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require("gulp-babel");
const eslint = require("gulp-eslint");
const livereload = require("gulp-livereload");

gulp.task('views', function buildHTML() {
  gulp.src('src/pug/**/*.pug')
	  	.pipe(pug({
            pretty: true
        }))
	  	.pipe(gulp.dest("html"))
		.pipe(livereload());
});

gulp.task('babel', function() {
	gulp.src("src/js/*.js")
	    .pipe(babel())
	    .pipe(gulp.dest("assets/script"))
	    .pipe(livereload());
});

gulp.task('sass', function () {
    gulp.src('src/sass/*.sass')
	    .pipe(sourcemaps.init())
	    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest('assets/style'))
	    .pipe(livereload());
});

gulp.task('eslint', function() {
	gulp.src(["src/js/*.js","!node_modules/**"])
	    .pipe(eslint())
	    .pipe(eslint.format())
	    .pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('src/pug/**/*.pug',['views']);
	gulp.watch('src/sass/*.sass',['sass']);
	gulp.watch('src/js/*.js',['babel']);
});

gulp.task('default', ['watch','views','sass','babel','eslint']);