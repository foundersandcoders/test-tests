"use strict";


var page = require('webpage').create();


page.open('http://localhost:2000/one', function () {

	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {


		// ===========================================================================================
		// tests
		// ===========================================================================================


			// create 
			// --------------------------------------------------------------------------------------
				page.evaluate(function() {
					$("input.task").val("Hello");
					var e = $.Event("keypress");
					e.keyCode = 13;
					$("input.task").trigger(e);
				});
				var text = page.evaluate(function () {
					return $("p.item").text();
				});
				var inputClear = page.evaluate(function () {
					return $("input.task").val();
				});
				console.log("Item created should be 'Hello':", text);
				console.log("After creating one item input should be empty:", inputClear);
				page.render('test/phantom/images/todo-one.png');
			// --------------------------------------------------------------------------------------



			// check routing
			// --------------------------------------------------------------------------------------
				page.evaluate(function() {
					$("#active").click();
				});
				var locationActive = page.evaluate(function () {
					return window.location.hash;
				});
				var textActive = page.evaluate(function () {
					return $("p.item").text();
				});
				console.log("In completed location should be '#active':", locationActive);
				console.log("In active should be 'Hello':", textActive);
				page.render('test/phantom/images/todo-two.png');


				page.evaluate(function() {
					$("#completed").click();
				});
				var locationCompleted = page.evaluate(function () {
					return window.location.hash;
				});
				var textCompleted = page.evaluate(function () {
					return $("p.item").text();
				});
				console.log("In completed location should be '#completed':", locationCompleted);
				console.log("In completed should be empty:", textCompleted);
				page.render('test/phantom/images/todo-three.png');
			// --------------------------------------------------------------------------------------



			// edit
			// --------------------------------------------------------------------------------------
				page.evaluate(function() {
					$("#active").click();
					$("p.item").dblclick();
					$("input[name='title']").val("Goodbye");
					var e = $.Event("keypress");
					e.keyCode = 13;
					$("input[name='title']").trigger(e);
				});

				var textEdited = page.evaluate(function () {
					return $("p.item").text();
				});

				console.log("Item edited should be 'Goodbye':", textEdited);
				page.render('test/phantom/images/todo-four.png');
			// --------------------------------------------------------------------------------------
		// ===========================================================================================
		phantom.exit();
	});
});