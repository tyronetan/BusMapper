"use strict";

var chai = require("chai"),
	should = chai.should(),
	expect = chai.expect,
	chaiHttp = require("chai-http");
var assert = require("assert");
var express = require("express"),
	app = express();

const authKey = { "AccountKey": "KY8IopwARcWt937r6B8UyQ=="}, 
	authAccept = { "accept": "application/json" };

/* API Parameters */
var uri = "http://datamall2.mytransport.sg/",
	routesPath = "ltaodataservice/BusRoutes?",
	stopsPath = "ltaodataservice/BusStops?";


chai.use(chaiHttp);


describe("LTA Data Mall", function() {
	this.timeout(10000);

	describe("Bus Arrivals API", function() {
		it("a request to the bus arrivals API should return a json file.", function() {

		});

	});

	describe("Bus Stops API", function() {
		it("searching for a bus stop name should return a bus stop code", function(done) {
			chai.request(uri)
				.get(stopsPath + encodeURI("Victoria St"))
				.set("AccountKey", authKey.AccountKey)
				.set("Accept", authAccept.accept)
				.end((err, response) => {
					expect(response).to.have.status(200);
					should.not.exist(err);
					should.exist(response);
					console.log(response);
					done();
				});
		});
	});
});