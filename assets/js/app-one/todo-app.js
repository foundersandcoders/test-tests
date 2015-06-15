"use strict";

var nuclear  = require("../nuclear.js");
var TodoItem = require("./todo-item.js");
var utils    = require("./utils");


var route;

function TodoApp (opts) {

	opts = opts || {};

	var state = nuclear.observS({
		route: nuclear.observ(""),
		todos: nuclear.observV(opts.todos || {}, TodoItem),
		field: nuclear.observ(""),
		channels: {
			add: add,
			destroy: destroy
		}
	});

	route = nuclear.router(state);

	return state;
}

function add (state) {

	var that = this;

	if(that.value.trim() === ""){
		return;
	}

	var todo = TodoItem({
		title: that.value.trim()
	});

	state.todos.put(todo.id(), todo);
	state.field.set("");
}

function destroy (state, id) {

	state.todos.delete(id);
}

TodoApp.render = function (state) {

	var h = nuclear.h;


	return (
		h("div", [
			h("a", {
				href: "/home",
			}, "Home"),
			h("h1", "Time"),
			h("div.container", [
				route("/*",         enterNewTask),
				route("/",          all),
				route("/active",    active),
				route("/completed", completed),
				route("/*",         footer)
			])
		])
	);

	function enterNewTask (state) {

		return (
			h("input.task", {
				type: "text",
				value: state.field(),
				name: "newTodo",
				placeholder: "Insert task",
				onkeypress: function (evt) {

					if (evt.keyCode == 13) {

						state.channels.add.call(this, state);
					}
				}
			})
		);
	}

	function all (state) {

		var todosList = utils.objToArr(state.todos);

		var store  = [];

		todosList.forEach(function (todo) {
			store.push(TodoItem.render(todo, state.channels.destroy.bind(null, state)));
		});

		return (
			h("ul", [
				store
			])
		);
	}

	function active (state) {

		// filter todos completed
		var todosList = utils.objToArr(state.todos);

		var storeActive = [];
		var storeRender    = [];

		todosList.forEach(function (obs) {
			if(obs().completed === false) {
				storeActive.push(obs);
			}
		});

		storeActive.forEach(function (todo) {
			storeRender.push(TodoItem.render(todo, state.channels.destroy.bind(null, state)))
		});
		
		return (
			h("ul", [
				storeRender
			])
		);
	}

	function completed (state) {
		
		// filter todos completed
		var todosList = utils.objToArr(state.todos);

		var storeCompleted = [];
		var storeRender    = [];

		todosList.forEach(function (obs) {
			if(obs().completed === true) {
				storeCompleted.push(obs);
			}
		});

		storeCompleted.forEach(function (todo) {
			storeRender.push(TodoItem.render(todo, state.channels.destroy.bind(null, state)))
		});

		return (
			h("ul", [
				storeRender
			])
		);
	}

	function footer (state) {

		return (
			h("div.footer", [
				h("button#all", {
					onclick: function () {
						location.hash = "";
					}
				}, "All"),
				h("button#active", {
					onclick: function () {
						location.hash = "active";
					}
				}, "Active"),
				h("button#completed", {
					onclick: function () {
						location.hash = "completed";
					}
				}, "Completed")
			])
		);
	}
};

nuclear.app(document.body, TodoApp(), TodoApp.render);