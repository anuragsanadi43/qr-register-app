const express = require("express");
const bodyParser = require("body-parser");
const assert = require("assert");
const mongodb = require("mongodb");
const path = require("path");

const app = express();
const port = process.env.port || 3000;

// setting ejs as template engine
app.set("view engine", "ejs"); // might show as unused import but is still required
app.use(express.static(path.join(__dirname, "/public")));

const date = new Date();

app.get("/session/:id", function(req, res) {
	res.render("index", {
		month: date.getMonth(),
		date: date.getDate(),
		year: date.getFullYear(),
		title: req.params.id
	})
});

app.get("/register", function(req, res) {
	res.render("register", {
		unicode: false
	});
});

app.post("/register", function(req, res) {
	const first = req.body.first;
	const last = req.params.last;
	const lastConfirm = req.params.lastConfirm;

	if(first === "" || last === "" || lastConfirm === "") {
		res.render("register", {
			unicode: true,
			err: "You need to enter all fields"
		});
	}
});


app.listen(port, function() {
	console.log(`Server started on port ${3000}`);
});