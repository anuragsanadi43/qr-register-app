const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// This is the Member model
const Member = require("./models/members");

mongoose.connect("mongodb://localhost/qr-register", function(err) {
    if(err) {
        throw err;
    } else {
        console.log("Mongoose connected");
    }
});

const app = express();

// Handlebars and static folder setup
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Body parser setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const today = new Date();

// Root
app.get("/session/:id", function(req, res) {
    res.render("index", {
        title: req.params.id,
        month: today.getMonth() + 1,
        date: today.getDate(),
        year: today.getFullYear(),
        day: today.getDay()
    });
});

app.post("/getPerson", function(req, res) {
    console.log(req.body);
    res.render("second");
});

app.get("/register", function(req, res) {
    res.render("register", {
        unicode: false
    });
});

app.post("/register", function(req, res) {
    if(req.body.last === "" || req.body.lastConfirm === "" || req.body.first === "") {
        res.render("register", {
            err: "Please fill in all fields",
            unicode: true
        });
    } else if (req.body.last !== req.body.lastConfirm) {
        res.render("register", {
            err: "Last names don't match",
            unicode: true
        });
    } else if ((req.body.last === req.body.lastConfirm) && (req.body.last !== "" && req.body.lastConfirm !== "") && req.body.first !== "") {
        
        var member = new Member();
		member.first = req.body.first;
        member.last = req.body.last;
        member.save(function() {
            console.log("Data inserted");
            res.render("success", {
                first: req.body.first,
                last: req.body.last
            });
        });       
    }
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});