var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', function (req, res) {
	printHeader(req);
	printVars(req);
	printStackTrace(req);
	res.send('');
})

var server = app.listen(8081, function () {
	console.log(colors.dim("[INIT]") + " " + colors.bold("Server is running..."));
})

function format(n) {
    return (n > 9 ? "" + n : "0" + n);
}

function getDate(date) {
	return (format(date.getMonth()) + "-" + format(date.getDate()) + "-" + format(date.getFullYear()));
}

function getTime(date) {
	return (format(date.getHours()) + ":" + format(date.getMinutes()) + ":" + format(date.getSeconds()));
}

function printSecDelimiter() {
	console.log(colors.dim("____________________________________"));
}

function printEndDelimiter() {
	console.log(colors.bold("____________________________________\n\n"));
}

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

function printVars(req) {
	console.log(colors.bold.red("+ Variable(s):"));
	if (req.body.vars.length <= 0)
		console.log("No variable available.");
	for (var i = 0, len = req.body.vars.length; i < len; i++) {
  		console.log(colors.dim("[" + (i + 1) + "]") + " " + req.body.vars[i].key + " = (" + typeof(req.body.vars[i].value)+ ") " + req.body.vars[i].value);
	}
	printSecDelimiter();
}

function printStackTrace(req) {
	console.log(colors.bold.red("+ Stack trace(s):"));
	if (req.body.stack.length <= 0)
		console.log("No stack trace available.");
	for (var i = 0, len = req.body.stack.length; i < len; i++) {
  		console.log(colors.dim("[" + (i + 1) + "]") + " " + req.body.stack[i]);
	}
	printEndDelimiter();
}