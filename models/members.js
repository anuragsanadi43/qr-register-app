const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const Member = new Schema({
    first: String,
    last: String
}, {collection: "members"});

const model = mongoose.model("member", Member);

module.exports =  model;