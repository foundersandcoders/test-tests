// Run some jQuery on a html fragment
var jsdom = require("jsdom");
var test  = require("tape");

jsdom.env({
	url: "http://localhost:2000/one",
	scripts: [
		"http://code.jquery.com/jquery.js", 
		"http://localhost:2000/public/bundle_one.js"
	],
	done: function (errors, window) {

		var $ = window.$;


		// ==========================================================================
		// CRUD tests
		// ==========================================================================
			test("Create a task", function (t) {

				$("input.task").val("Hello");
				var e = $.Event("keypress");
				e.keyCode = 13;
				$("input.task").trigger(e);

				t.equals($("p.item").text(), "Hello", "task create");
				t.equals($("input.task").val(), "", "input cleared");
				t.end();
			});
			test("Edit a task", function (t) {

				$("p.item").dblclick();
				$("input[name='title']").val("Goodbye");
				var e = $.Event("keypress");
				e.keyCode = 13;
				$("input[name='title']").trigger(e);

				t.equals($("p.item").text(), "Goodbye", "task create");
				t.end();
			});
			test("Delte a task", function (t) {

				$("button.destroy").click();
				t.equals($("p.item").text(), "", "task deleted");
				t.end();
			});
		// ==========================================================================
		// Routing
		// ==========================================================================
			test("Create two tasks", function (t) {

				var task = {
					title: "Task one"
				};

				$("input.task").val(task.title);
				var e = $.Event("keypress");
				e.keyCode = 13;
				$("input.task").trigger(e);

				t.equals($("p.item").text(), task.title, "task created");
				t.end();
			});
			test("View only active tasks", function (t) {

				$("#active").click();

				t.equals(window.location.hash, "#active", "active route");
				t.equals($("p.item").text(), "Task one", "active task");
				t.end();
			});
			test("View only completed tasks", function (t) {

				$("#completed").click();

				t.equals(window.location.hash, "#completed", "completed route");

	
				process.nextTick(function () {

					t.equals($("p.item").text(), "", "completed task");
					console.log("bleurg", $("h6").text());
					t.end();
				});
			});
		// ==========================================================================
	}
});