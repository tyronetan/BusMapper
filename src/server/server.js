"use strict";
var http = require("http");
var fs = require("fs");


var server;
var defaultServerURL = "./src/server/file.html";

exports.start = function(portNumber, htmlFileToServe=defaultServerURL) {
	if(!portNumber) throw new Error("Server requires a port number");

	server = http.createServer();
	server.on("request", function(request, response) {
		console.log("Received request from url " + request.url);
		if(request.url === "/" || request.url === "/index.html/") {
			fs.readFile(htmlFileToServe, (err, data) => {
				if(err) throw err;
				response.end(data);
			});
		}
		else {
			response.statusCode = 404;
			response.end();
		}

	});

	server.listen(portNumber);
};

exports.stop = function(callback) {
	console.log("server stopped");
	server.close(callback);
};