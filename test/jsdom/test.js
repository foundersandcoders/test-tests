// Run some jQuery on a html fragment
var jsdom = require("jsdom");
var test  = require("tape");

jsdom.env({
	url: "http://localhost:2000/one",
	scripts: [
		"http://code.jquery.com/jquery.js", 
		"http://localhost:2000/public/bundle_one.js"
	],
	done: function (err1, window1) {

		if(err1) {
			console.log("Errors: ", err2);
		}

		var $ = window1.$;


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

				t.equals(window1.location.hash, "#active", "active route");
				t.equals($("p.item").text(), "Task one", "active task");
				t.end();
			});
			test("View only completed tasks", function (t) {

				$("#completed").click();

				t.equals(window1.location.hash, "#completed", "completed route");

	
				process.nextTick(function () {

					t.equals($("p.item").text(), "", "completed task");
					t.end();
				});
			});
		// ==========================================================================
		// Change page
		// ==========================================================================
			test("Should check if link points to right page", function (t) {

				t.equals($("a").text(), "Home", "right text");
				t.equals($("a").attr("href"), "/", "right link");
				t.end();
			});

			jsdom.jsdom({
				url: "http://localhost:2000",
				done: function (err2, window2) {

					// do stuff here
				}
			});
		// ==========================================================================

	}
});