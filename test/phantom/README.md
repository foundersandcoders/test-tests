
```js
// First example

console.log("Hello world!");
phantom.exit();

```

```js
// Second example

var page = require('webpage').create();
page.open('http://example.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('example.png');
  }
  phantom.exit();
});

```

***Questions:***

`require('webpage')` what is that?
Why `#create();`?
What is `page.open`? How does it work?


```js
// Third example

var page = require('webpage').create(),
  system = require('system'),
  t, address;

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

t = Date.now();
address = system.args[1];
page.open(address, function(status) {
  if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    t = Date.now() - t;
    console.log('Loading ' + system.args[1]);
    console.log('Loading time ' + t + ' msec');
  }
  phantom.exit();
});

```

```js
// Forth example

var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
	
  console.log('Page title is ' + msg);
};

page.open('http://example.com', function (status) {

	page.evaluate(function() {

		console.log(document.title);
	});
	phantom.exit();
});

```

```js
// Fifty example

var page = require('webpage').create();

page.onResourceRequested = function(request) {
	console.log('Request ' + JSON.stringify(request, undefined, 4));
};

page.onResourceReceived = function(response) {
	console.log('Receive ' + JSON.stringify(response, undefined, 4));
};

page.open(url);

````