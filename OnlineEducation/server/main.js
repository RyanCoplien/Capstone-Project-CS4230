import { Meteor } from 'meteor/meteor';
//import { Mongo } from 'meteor/mongo';

Meteor.startup(function() {
  // code to run on server at startup
  var Future = Npm.require("fibers/future");
  Meteor.methods({
  	insert_collectionStudents: function(StudentId, StudentTitle, StudentFirstName, StudentLastName, StudentPassword, StudentHighestDegree, 
  	StudentCurrentDesignation, StudentOrganization, StudentEmail, StudentPhone, StudentBirthDate, StudentOtherInfoToHighlight) {
	  console.log("in insert_collectionStudents");
	  var MongoClient = require('mongodb').MongoClient;
	  var url = "mongodb://localhost:3001";
	  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
  		if (err) throw err;
  		console.log("Connected successfully to server");
	  	var myobj = {
	  		"StudentId": StudentId,
	  		"StudentTitle": StudentTitle,
	  		"StudentFirstName": StudentFirstName,
	  		"StudentLastName": StudentLastName,
	  		"StudentPassword": StudentPassword,
	  		"StudentHighestDegree": StudentHighestDegree,
	  		"StudentCurrentDesignation": StudentCurrentDesignation,
	  		"StudentOrganization": StudentOrganization,
	  		"StudentEmail": StudentEmail,
	  		"StudentPhone": StudentPhone,
	  		"StudentBirthDate": StudentBirthDate,
	  		"StudentOtherInfoToHighlight": StudentOtherInfoToHighlight
	  	}
	  	var dbo = db.db("myOnlineDatabase")
	  	dbo.collection("Students").insertOne(myobj, function(err, res) {
	  		if (err) throw err;
	  		console.log("1 record inserted");
	  		db.close();
	  	});
	  });
  	},

  	query_collectionStudents: function(StudentFirstName) {
	  console.log("in query_collectionStudents");
	  var MongoClient = require('mongodb').MongoClient;
	  var url = "mongodb://localhost:3001";
	  var future = new Future();
	  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
  		if (err) throw err;
  		console.log("Connected successfully to server");
	  	var myobj = {
	  		"StudentFirstName": StudentFirstName,
	  	}
	  	var dbo = db.db("myOnlineDatabase")
	  	dbo.collection("Students").find(myobj).toArray(function(err, result) {
	  		if (err) throw err;
	  		var output = "";
	  		var i;
				for (i = 0; i < result.length; i++) {
				  output += result[i].StudentBirthDate + "\n";
				}
	  		console.log(output);
	  		future.return(output);
	  		db.close();
	  	});
	  });
	  return future.wait();
  	}
  })
});
