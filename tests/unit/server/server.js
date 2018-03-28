/* jshint node: true */

"use strict";
var chai = require("chai"),
	should = chai.should(),
	expect = chai.expect;
var assert = require("assert");
var server = require("../../../src/server/server.js");
var http = require("http");
var chaiHttp = require("chai-http");


chai.use(chaiHttp);

describe("server", function() {
	it("should pass on 3 = 3", function(done) {
		expect(3).to.equals(3);
		done();
	});

	it("should get a hello world response on a request to server", (done) => {
		server.start(8080);
		let receivedData = false;

		chai.request("http://localhost:8880")
			.get("/")
			.end((err, res) => {
				expect(res).to.have.status(200);
				res.text.should.be.eql("Hello World");
				done();
			});
	});

	after(function() {
		server.stop(function() {});
	});
});