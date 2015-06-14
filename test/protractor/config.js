exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	multiCapabilities: [{
		browserName: 'chrome'
	}],
	specs: [
		'./test.js'
	],
	params: {
		url: 'http://localhost:2000'
	},
	jasmineNodeOpts: {
		showColors: true,
		isVerbose: true,
		includeStackTrace: true
	}
};