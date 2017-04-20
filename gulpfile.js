const gulp = require('gulp');
const eslint = require("gulp-eslint");
const babel = require("gulp-babel");
const sass = require('gulp-sass');
const pug = require('gulp-pug');
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
    gulp.src('src/scss/*.scss')
	    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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
	gulp.watch('src/pug/**/*.pug',['views']);
	gulp.watch('src/scss/*.scss',['sass']);
	gulp.watch('src/js/*.js',['babel']);
});

gulp.task('default', ['watch','views','sass','babel','eslint']);