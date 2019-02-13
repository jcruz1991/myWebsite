'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('js', () => {
    gulp
        .src('./public/js/*.js')
        .pipe(
            babel({
                presets: ['es2015']
            })
        )
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/js'))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        });
});

gulp.task('watch:js', () => {
    gulp.watch('./public/js/**/*.js', ['js']);
});

gulp.task('sass', function () {
    return gulp.src('./public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('css', function () {
    gulp.src('./public/css/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch:sass', function () {
    gulp.watch('./public/scss/**/*.scss', ['sass']);
});


gulp.task('run', ['sass', 'css']);