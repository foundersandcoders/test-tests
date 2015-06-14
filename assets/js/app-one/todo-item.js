"use strict";

var nuclear = require("../nuclear.js");
var utils   = require("./utils");

module.exports = TodoItem;

function TodoItem (item) {

	item = item || {};

	return nuclear.observS({
		id:        nuclear.observ(item.id        || (parseInt(Math.random() * 100000, 10))),
		title:     nuclear.observ(item.title     || ""),
		editing:   nuclear.observ(item.editing   || false),
		completed: nuclear.observ(item.completed || false),
		channels: {
			toggle: toggle,
			startEdit: startEdit,
			finishEdit: finishEdit,
			cancelEdit: cancelEdit
		}
	});
}

function toggle (state) {

	console.log("toggle");

	state.completed.set(!state.completed());
}

function startEdit (state) {

	state.editing.set(true);
}

function finishEdit (state) {

	if (state.editing() === false) {
		return;
	}

	state.title.set(this.value);
	state.channels.cancelEdit(state);
}

function cancelEdit (state) {

	state.editing.set(false);
}

TodoItem.render = function (todo, parentHandles) {

	var h = nuclear.h;

	return (
		h("li", [
			h("input", {
				type: "checkbox",
				checked: todo.completed(),
				onchange: todo.channels.toggle.bind(this, todo)
			}),
			h("p.item", {
				style: {
					"display": !todo.editing() ? "" : "none"
				},
				ondblclick: todo.channels.startEdit.bind(this, todo)
			}, todo.title()),
			h("input", {
				style: {
					"display": todo.editing() ? "" : "none"
				},
				focus: todo.editing ? utils.focusHook() : null,
				value: todo.title(),
				name: 'title',
				onfocusout: todo.channels.cancelEdit.bind(this, todo),
				onchange: todo.channels.cancelEdit.bind(this, todo),
				onkeypress: function (evt) {

					if (evt.keyCode == 13) {

						todo.channels.finishEdit.call(this, todo);
					}
				}
			}),
			h("button.destroy", {
				onclick: parentHandles.bind(null, todo.id())
			}, "x")
		])
	);
}