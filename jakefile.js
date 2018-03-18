/* global desc, task, jake, fail, complete */

"use strict";

var Mocha = require("mocha");
var mocha = new Mocha({reporter: 'spec', ui: 'bdd'});

desc("Build and test");
task("default", ["lint", "test"]);

desc("lint everything");
task("lint", [], function() {
	var lint = require("./build/lint/lint_runner.js");

	var files = new jake.FileList();
	files.include("**/*.js");
	files.exclude("node_modules");
	files.exclude("build");

	var options = {
		node: true
	};

	var passed = lint.validateFileList(files.toArray(), options, {});
	if (!passed)
		fail("Lint failed");
});

function runTests(cb) {
	mocha.addFile('./tests/unit/server/_*.unit.js');
}

desc("Test everything");
task("test", [], function() {

});


desc("integrate");
task("integrate", ["default"], function() {
	console.log("1. make sure git status is clean");
	console.log("2. Build on the integration box");
	console.log("	a. Walk over to integration box");
	console.log("	b. git pull");
	console.log("	c. jake");
	console.log("3. git checkout integration");
	console.log("4. git merge master --no-ff --log");
	console.log("5. git checkout master");
});