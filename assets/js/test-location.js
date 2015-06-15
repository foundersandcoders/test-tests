"use strict";

var nuclear = require("./nuclear.js");


window.addEventListener("hashchange", function () {

	var H = document.createElement("h6");
	H.textContent = "HELLO";
	document.body.appendChild(H);
});


var b = document.createElement("button");
b.innerHTML = "aeou";

b.onclick = function () {

	window.location.hash = "change";
}

document.body.appendChild(b);