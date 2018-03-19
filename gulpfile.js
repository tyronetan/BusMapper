"use strict";

var gulp = require("gulp");
var jshint = require("gulp-jshint");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");

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

});