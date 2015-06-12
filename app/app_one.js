"use strict";

var nuclear = require("./nuclear");

function app () {

	return nuclear.observS({
		first_name: "bes"
	});
}

app.render = function (state) {

	var h = nuclear.h;

	return h("div", [

		h("h1", state.first_name),
		h("a", {
			href: "/two.html"
		}, "Go to app two")
	]);
}

nuclear.app(document.body, app(), app.render);