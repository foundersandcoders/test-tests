"use strict";

var database = [];

module.exports = [
	{
		method: "GET",
		path: "/",
		handler: function (req, res) {

			res.view("index");
		}
	},
	{
		method: "GET",
		path: "/one",
		handler: function (req, res) {

			res.view("one");
		}
	},
	{
		method: "GET",
		path: "/two",
		handler: function (req, res) {

			res.view("two");
		}
	},
	{
		method: "GET",
		path: "/data",
		handler: function (req, res) {

			return res(database);
		}
	},
	{
		method: "POST",
		path: "/data",
		handler: function (req, res) {

			database.push(req.payload);
			return res(database);
		}
	},
	// static route
	{
		method: "GET", 
		path: "/{filepath*}",
		handler: {
			directory: {
				path: "assets"
			}
		}
	}
];