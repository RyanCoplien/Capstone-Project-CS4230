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
	  var url = "mongodb://localhost:27017";
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
	  var url = "mongodb://localhost:27017";
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
  	},

  	insert_SingleRecord: function(case_id,hospital_code,hospital_type_code,
      city_code_hospital,hospital_region_code,available_rooms,department,ward_type,ward_facility_code,
      bed_grade,patientid,city_code_patient,type_of_admission,severity_of_illness,visitors_with_patient,
      age,admission_deposit,stay_date){
      console.log("in insert_SingleRecord");
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017";
      MongoClient.connect(url,{useUnifiedTopology: true}, function(err, db){
        if(err) throw err;
        console.log("Connected successfully to server");
        var myobj = {
          "case_id" : case_id,
          "hospitalCode" : hospital_code,
          "hospitalType" : hospital_type_code,
          "CityHospitalCode" : city_code_hospital,
          "HospitalRegionCode" : hospital_region_code,
          "extraRooms" : available_rooms,
          "dept" : department,
          "WardType" : ward_type,
          "WardFacilityCode" : ward_facility_code,
          "BedGrade" : bed_grade,
          "patientID" : patientid,
          "CityCodePatient" : city_code_patient,
          "TypeOfAdmission" : type_of_admission,
          "SeverityOfIllness" : severity_of_illness,
          "Visitors" : visitors_with_patient,
          "Age" : age,
          "AdmissionDeposit" : admission_deposit,
          "Stay" : stay_date
        }
        var dbo = db.db("Hospital")
        dbo.collection("info1").insertOne(myobj, function(err, res){
          if(err) throw err;
          console.log("1 record inserted");
          db.close();
        })
      });
    },

    insert_BulkRecords: function(res){
      console.log("in insert_BulkRecords");
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017";
      console.log("in info2");

      MongoClient.connect(url, function(err, db) {
      	var dbo = db.db("Hospital")
      	dbo.collection("info2").insertMany(res, function(err, res){
      		if(err) throw err;
      		console.log("Inserted CSV");
      		db.close();
      	});
      });
    }
  })
});
