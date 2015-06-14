
// helper function
function $ (val) { return element(by.css(val));}
function stop () { return browser.pause()};


describe("TODO app", function () {


	it("should create a new list item", function () {

		browser.ignoreSynchronization = true;
		browser.driver.get(browser.params.url + "/one");
		$("input.task").sendKeys("Hello");
	});

	it("should stop protractor", function () {
		stop();
	});
});