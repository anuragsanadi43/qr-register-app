const express = require("express");
const bodyParser = require("body-parser");
const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
const { insertDocuments, findDocuments } = require("./models/crud.js");
const { generateCode } = require("./models/stringGenerator.js");

const app = express();
const port = process.env.PORT || 3000; // local port
const host = process.env.IP; // local address

// setting ejs as template engine
app.set("view engine", "ejs"); // might show as unused import but is still required
app.use(express.static(path.join(__dirname, "/public")));


// Body parser stuff
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'qr-register';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
	assert.equal(null, err);
	console.log("Mongodb connected successfully");

	const db = client.db(dbName);

	client.close();
});

const date = new Date();

var session;

app.get("/session/:id", function (req, res) {
	res.render("index", {
		month: date.getMonth(),
		date: date.getDate(),
		year: date.getFullYear(),
		title: req.params.id
	});
	session = req.params.id;
});

app.get("/register", function (req, res) {
	res.render("register", {
		unicode: false
	});
});

app.post("/register", function (req, res) {
	const first = req.body.first;
	const last = req.body.last;
	const lastConfirm = req.body.lastConfirm;

	if (first === "" || last === "" || lastConfirm === "") {
		res.render("register", {
			unicode: true,
			err: "You need to enter all fields"
		});
	} else if (last !== lastConfirm) {
		res.render("register", {
			unicode: true,
			err: "Last names don't match up"
		})
	} else if (first !== "" && last !== "" && lastConfirm !== "") {
		// Inserting documents in mongodb
		MongoClient.connect(url, function (err, client) {
			assert.equal(null, err);

			const db = client.db(dbName);

			insertDocuments(db, first, last, generateCode(first, last), function () {
				client.close();
				console.log("Inserted documents");
				res.render("success", {
					first: first,
					last: last,
					current: session,
					code: generateCode(first, last)
				});
			});
		});
	}
});

app.post("/getPerson", function(req, res) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		console.log("Fetcher connected successfully...");
		
		const db = client.db(dbName);
		findDocuments(db, req.body.code, function(member) {
			//var dojoMember = member
			console.log(member[0].first); 	
			res.render("registered", {
				confirmation: `${member[0].first} ${member[0].last} has been checked in for today's session`
			});
			client.close();
		});
	});
});


app.listen(port, host, function () {
	console.log(`Server started on port ${port}`);
});