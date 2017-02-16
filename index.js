var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');

/*
 * @Author: bla5r
 * @Date: 02-15-2017
 */

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
 * Desc: Set up default route
 */

app.post('/', function (req, res) {
	printHeader(req);
	printVars(req);
	printStackTrace(req);
	res.send('');
})

/*
 * Desc: Listen on port 8081
 */

var server = app.listen(8081, function () {
	console.log(colors.dim("[INIT]") + " " + colors.bold("Server is running..."));
})

/*
 * Desc: Pad number to two digits
 */

function format(n) {
    return (n > 9 ? "" + n : "0" + n);
}

/*
 * Desc: Format date
 */

function getDate(date) {
	return (format(date.getMonth()) + "-" + format(date.getDate()) + "-" + format(date.getFullYear()));
}

/*
 * Desc: Format time
 */

function getTime(date) {
	return (format(date.getHours()) + ":" + format(date.getMinutes()) + ":" + format(date.getSeconds()));
}

/*
 * Desc: Print delimiter between sections
 */

function printSecDelimiter() {
	console.log(colors.dim("____________________________________"));
}

/*
 * Desc: Print delimiter at the end of log block
 */

function printEndDelimiter() {
	console.log(colors.bold("____________________________________"));
	console.log("\n");
}

/*
 * Desc: Print header (date - time - request number - execution id)
 */

function printHeader(req) {
	var date = new Date(req.body.ts);
	var formatDate = getDate(date) + " " + getTime(date);
	process.stdout.write('\n');
	process.stdout.write(colors.green("[" + formatDate + "]"));
	process.stdout.write(' ');
	process.stdout.write(colors.bold("Log " + req.body.r + "\n"));
	console.log(colors.bold("Execution: " + req.body.exec));
	printSecDelimiter();
}

/*
 * Desc: Print all variables
 */

function printVars(req) {
	console.log(colors.bold.red("+ Variable(s):"));
	if (req.body.vars.length <= 0)
		console.log("No variable available.");
	for (var i = 0, len = req.body.vars.length; i < len; i++) {
  		console.log(colors.dim("[" + (i + 1) + "]") + " " + req.body.vars[i].key + " = (" + typeof(req.body.vars[i].value)+ ") " + req.body.vars[i].value);
	}
	printSecDelimiter();
}

/*
 * Desc: Print all stack traces
 */

function printStackTrace(req) {
	console.log(colors.bold.red("+ Stack trace(s):"));
	if (req.body.stack.length <= 0)
		console.log("No stack trace available.");
	for (var i = 0, len = req.body.stack.length; i < len; i++) {
  		console.log(colors.dim("[" + (i + 1) + "]") + " " + req.body.stack[i]);
	}
	printEndDelimiter();
}