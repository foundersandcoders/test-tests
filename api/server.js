"use strict";


var Hapi   = require("hapi");
var Path   = require('path');
var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 2000
});

server.views({
	engines: {
		"html": require("handlebars")
	},
	relativeTo: __dirname,
	path: '../views',
});

server.route(require("./handlers.js"));

module.exports = server;