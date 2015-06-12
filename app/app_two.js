"use strict";

var nuclear = require("./nuclear");

function app () {

	return nuclear.observS({
		first_name: "wil"
	});
}

app.render = function (state) {

	var h = nuclear.h;

	return h("div", [

		h("h1", state.first_name),
		h("a", {
			href: "/one.html"
		}, "Go to app one")
	]);
}

nuclear.app(document.body, app(), app.render);