const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const db = "qr-register";

module.exports.insertDocuments = function(db, firstName, lastName, code, callback) {
	// Collection
	const collection = db.collection("members");
	collection.insertMany([
		{first: firstName, last: lastName, code: code, registered: false} 
	], function(err, result) {
		if(err){
			throw err
		}
		console.log("Inserted documents into the collection");
		callback(result);
	});
}

module.exports.findDocuments = function(db, code, callback) {
	// database collection
	const collection = db.collection("members");
	
	// Finding user
	collection.find({'code': code}).toArray(function(err, docs) {
		if(err) {
			console.log("Error in finding person");
		}
		// console.log(docs);
		// console.log("From crud.js")
		callback(docs);
	});
}
