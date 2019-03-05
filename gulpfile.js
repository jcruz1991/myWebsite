'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('js', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
        .pipe(gulp.dest('./dist/public/js/'))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        });
});

gulp.task('server', function() {
    return gulp.src('./app.js')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('assets', function() {
    return gulp.src('./assets/**/*.js')
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/'))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        });
});

gulp.task('sass', function () {
    return gulp.src('./public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('css', function () {
    return gulp.src('./public/css/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('./public/css/'))
        .pipe(gulp.dest('./dist/public/css/'));
});

gulp.task('html', function() {
    return gulp.src('./public/index.html')
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/public/'));
});

gulp.task('images', function() {
	return gulp.src('./public/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/public/img'))
});

gulp.task('watch:sass', function () {
    return gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('watch:js', () => {
    gulp.watch('./public/js/**/*.js', ['js']);
});

gulp.task('run', ['sass', 'css']);