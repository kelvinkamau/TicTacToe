/**
 * Created by Boneless on 17-Nov-17.
 */
var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function () {
connect.server({
    port: 8889
})})
gulp.task('default', ['connect']);