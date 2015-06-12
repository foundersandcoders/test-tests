"use strict";


var http     = require("http");
var path     = require("path");
var ecstatic = require("ecstatic")(path.join(__dirname, "./"));

http.createServer(function (req, res) {

	return ecstatic(req, res);

}).listen(2555);