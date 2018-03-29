/* jshint node: true */

"use strict";
var chai = require("chai"),
	should = chai.should(),
	expect = chai.expect;
var assert = require("assert");
var server = require("../../../src/server/server.js");
var http = require("http");
var chaiHttp = require("chai-http");
var fs = require("fs");


chai.use(chaiHttp);
var port = 8880;
let host = "http://localhost";

function requestHttp(host, link, callback) {
	chai.request(host + ":" + port + link)
		.get("/")
		.end(callback);
}


describe("server", function() {
    	this.timeout(15000);

	it("should pass on 3 = 3", function(done) {
		expect(3).to.equals(3);
		done();
	});

	// it("should get a hello world response on a request to server", (done) => {
	// 	server.start(port);

	// 	requestHttp(host, port, (err, req) => {
	// 		expect(req).to.have.status(200);
	// 		expect(req.text).to.be.equals("Hello World");
	// 		done();
	// 	})
	// });

	it("should serve a file", (done) => {
		var testDir = "./src/server/generated/test";
		var testFile = testDir + "/test.html";
		var testData = "This is my test text data";

		fs.writeFileSync(testFile, testData);
		server.start(port, testFile);
		requestHttp(host, "", (err, req) => {
			expect(req).to.have.status(200);
			expect(req.text).to.be.equals(testData);
			server.stop(() => {
				fs.unlinkSync(testFile);
				expect(!fs.existsSync(testFile)).to.be.equals(true);
				done();
			});
		});

	});

	it("should serve a 404 page for everything except home page", (done) => {
		var testDir = "./src/server/generated/test";
		var testFile = testDir + "/test.html";
		var testData = "This is my test text data";

		fs.writeFileSync(testFile, testData);
		server.start(port, testFile);
		requestHttp(host, "/foobar", (err, req) => {
			expect(req).to.have.status(404);
			server.stop(() => {
				fs.unlinkSync(testFile);
				expect(!fs.existsSync(testFile)).to.be.equals(true);
				done();
			});
		});
	});

	it("should run callback function when stop completes", (done) => {
		server.stop(() => {
			done();
		});
		server.start(port);
	});

	it("should throw an error when a port number isn't provided", (done) => {
		expect(() => server.start()).to.throw(Error, "Server requires a port number");
		done();
	});

	after(function() {
		server.stop(function() {});
	});
});