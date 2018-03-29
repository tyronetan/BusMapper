"use strict";
var http = require("http");
var fs = require("fs");


var server;

exports.start = function(portNumber) {
	if(!portNumber) throw new Error("Server requires a port number");

	server = http.createServer();
	server.on("request", function(request, response) {
		console.log("Received request");

		fs.readFile("src/server/generated/test/test.html", (err, data) => {
			if(err) throw err;
			response.end(data);
		});

	});

	server.listen(portNumber);
};

exports.stop = function(callback) {
	console.log("server stopped");
	server.close(callback);
};