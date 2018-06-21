const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const db = "qr-register";

module.exports.insertDocuments = function(db, firstName, lastName, code, callback) {
	// Collection
	const collection = db.collection("members");
	collection.insertMany([
		{first: firstName, last: lastName, code: code} 
	], function(err, result) {
		console.log("Inserted documents into the collection");
		callback(result);
	});
}
