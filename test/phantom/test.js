"use strict";

var assert = require("assert");

var page = require('webpage').create();

page.onConsoleMessage = function(msg) {

  console.log('Page title is ' + msg);
};

page.open('http://localhost:2555', function (status) {

	page.evaluate(function() {

		console.log(document.title);
	});
	phantom.exit();
});