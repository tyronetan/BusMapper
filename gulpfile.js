"use strict";

var gulp = require("gulp");
var jshint = require("gulp-jshint");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var exitCode = 0;

function desc(msg) {
	console.log(msg);
}

gulp.task("default", ["lint", "test"]);

desc("lint everything");
gulp.task("lint", function() {
	return gulp.src(["tests/**/*.js", "src/**/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});


desc("test everything");
gulp.task("test", function() {
	function handleError(err) {
		exitCode = 1;
		console.log('Gulpfile ErrorHandler: ' + err.toString());
		this.emit('end');
	}

	return gulp.src(["tests/**/**/*.js", "tests/**/*.js"])
		.pipe(mocha({reporter: 'min'})).on("error", handleError);
});

gulp.on('err', function (err) {
    exitCode = 1;
    process.emit('exit'); // or throw err
});

// on exit, force Gulp to exit with the error code of 1 if any of the tasks failed
process.on('exit', function () {
    process.exit(exitCode);
});