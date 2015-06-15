// Run some jQuery on a html fragment
var jsdom = require("jsdom");
var test  = require("tape");

jsdom.env({
	url: "http://localhost:2000/",
	scripts: [
		"http://localhost:2000/public/jquery.js",
		"http://localhost:2000/public/bundle_loc.js"
	],
	done: function (errors, window) {

		var $ = window.$;

		console.log("Test one", $("h6").text());


		$("button").click();

		process.nextTick(function () {

			console.log("Test two", $("h6").text());

		});
	}
});