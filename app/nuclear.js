"use strict";


var nuclear = module.exports = {
	app:           app,
	diff:          require('virtual-dom/diff'),
	patch:         require('virtual-dom/patch'),
	createElement: require('virtual-dom/create-element'),
	h:             require('virtual-dom/h'),
	observS:       require('observ-struct'),
	page:          require('page')
};

function app (elem, observ, render) {

	var target = start(render, observ);
	elem.appendChild(target.dom);
	return observ(target.update);
}

function start (render, observ) {
	var virtualTree;
	var resultsNode;
	var target = {};

	virtualTree = render(observ);
	resultsNode = nuclear.createElement(virtualTree);
	target.dom  = resultsNode;
	target.update = function () {

		var newResults = render(observ);
		var patches    = nuclear.diff(virtualTree, newResults);
		resultsNode    = nuclear.patch(resultsNode, patches);
		virtualTree    = resultsNode;
	};
  
	return target;
}