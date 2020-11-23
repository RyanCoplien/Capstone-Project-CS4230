import { Meteor } from 'meteor/meteor';
import { stringify } from 'querystring';


Meteor.startup(() => {
  // code to run on server at startup
  var Future = Npm.require("fibers/future");//some stuff in das's old files
//all functions inside this file need to be under the Meteor.methods() call. you seperate functions by comma after the last }
  Meteor.methods({

    ClientSideCount:function(){
      console.log("Inside Client Side Count");
      var http = require("http");
      var MongoClient = require("mongodb").MongoClient;
      var url="mongodb://localhost:27017/";
      var future = new Future();
      MongoClient.connect(url, function(err,db){ //connects to DB
        if (err) throw err;
        var query="";
        query = {Department:"radiotherapy"}; //Define the query criteria
        console.log("inside query");
        console.log(query);
        var dbo = db.db("Hospital"); //set db name
        dbo.collection("RawData").find(query).toArray(function(err,result){ //query collection with criteria
          if (err) console.log(err);
          future.return(result);// returns the result back to QueryPanel.js
          db.close();
        });
      });
      return future.wait();
    }, 
    ServerSideCount:async function(){
      console.log("Inside Server Side Count");
      var http = require("http");
      var MongoClient = require("mongodb").MongoClient; 
      var url="mongodb://localhost:27017/";
      var future = new Future(); //more stuff from Das
      var Rad = 0;
      var Extreme = 0;
      MongoClient.connect(url, function(err,db){ //connects to DB
        if (err) throw err;
        var query="";
        query = {Department:"radiotherapy"};//Define the query criteria
        var dbo = db.db("Hospital");//set db name
        dbo.collection("RawData").find(query).toArray(function(err, result){//query the first time for just Radiotherapy
          if (err) console.log(err);
          console.log(result.length)
          Rad = result.length; //save it in Rad 
          db.close(); //close the connection
          MongoClient.connect(url, function(err,db){//open new connection
            query3 = {$and: [{Department:"radiotherapy"},{"Severity of Illness":"Extreme"}]}; //query the second criteria 
            console.log("inside query");
            console.log(query3);
            var dbo = db.db("Hospital");
            dbo.collection("RawData").find(query3).toArray(function(err,result){ //execute query
              if (err) console.log(err);
              console.log(result.length);
              Extreme = result.length; //save it in Extreme
              percent = 100*(Extreme/Rad); //ORIGINAL CODE WITHOUT HARDCODING NUMBERS
              console.log(percent); 
              future.return(percent); //Return it
              db.close();
          });
            });
        });
      });
    
      return future.wait();
     },

  
  TabularListAllRecords:function(){ //quires database to list all the records where Department is 'radiotherapy' and Severity of Illness is 'Extreme' in a tabular format
    console.log("Inside TabularListAllRecords");
      var http = require("http");
      var MongoClient = require("mongodb").MongoClient;
      var url="mongodb://localhost:27017/";
      var future = new Future();
      MongoClient.connect(url, function(err,db){ //connects to DB
        if (err) throw err;
        var query="";
        query = {$and: [{Department:"radiotherapy"},{"Severity of Illness":"Extreme"}]}; //Define the query criteria
        console.log("inside query");
        console.log(query);
        var dbo = db.db("Hospital"); //set db name
        dbo.collection("RawData").find(query).toArray(function(err,result){ //query collection with criteria
          if (err) console.log(err);
          future.return(result);// returns the result back to QueryPanel.js
          db.close();
        });
      });
      return future.wait();
    },

    ViewData:function(){ //quires database to list all the records in the database
    console.log("Inside ViewData");
      var http = require("http");
      var MongoClient = require("mongodb").MongoClient;
      var url="mongodb://localhost:27017/";
      var future = new Future();
      MongoClient.connect(url, function(err,db){ //connects to DB
        if (err) throw err;
        console.log("inside query");
        var dbo = db.db("Hospital"); //set db name
        dbo.collection("RawData").find({}).toArray(function(err,result){ //query collection with criteria
          if (err) console.log(err);
          future.return(result);// returns the result back to QueryPanel.js
          db.close();
        });
      });
      return future.wait();
    },
    
    Query:function(field,query){ //quires database to list all the records in the database equal to fields
      console.log("Inside Query");
      console.log(query);
      console.log(field);
      var finalQuery = {}; //creates query params
      finalQuery[field] = query; //creates query
        var http = require("http");
        var MongoClient = require("mongodb").MongoClient;
        var url="mongodb://localhost:27017/";
        var future = new Future();
        MongoClient.connect(url, function(err,db){ //connects to DB
          if (err) throw err;
          console.log("inside query");
          console.log(finalQuery);
          var dbo = db.db("Hospital"); //set db name
          dbo.collection("RawData").find(finalQuery).toArray(function(err,result){ //query collection with criteria
            if (err) console.log(err);
            console.log(result);
            future.return(result);// returns the result back to QueryPanel.js
            db.close();
          });
        });
        return future.wait();
    },

      UploadRecordByRecord:function(case_id, hospital_code, hospital_type_code,
        city_code_hospital, hospital_region_code, available_rooms, department, ward_type, ward_facility_code,
        bed_grade, patientid, city_code_patient, type_of_admission, severity_of_illness, visitors_with_patient,
        age, admission_deposit, stay_date){ //Inserts each field into a database
        console.log("Inside Query");


          //Datbase fields
        var fieldname1 = "case_id";
        var fieldname2 = "Hospital_code";        
        var fieldname3 = "Hospital_type_code";
        var fieldname4 = "City_Code_Hospital";
        var fieldname5 = "Hospital_region_code";
        var fieldname6 = "Available Extra Rooms in Hospital";
        var fieldname7 = "Department";
        var fieldname8 = "Ward_Type";
        var fieldname9 = "Ward_Facility_Code";
        var fieldname10 = "Bed Grade";
        var fieldname11 = "patientid";
        var fieldname12 = "City_Code_Patient";
        var fieldname13 = "Type of Admission";
        var fieldname14 = "Severity of Illness";
        var fieldname15 = "Visitors with Patient";
        var fieldname16 = "Age";
        var fieldname17 = "Admission_Deposit";
        var fieldname18 = "Stay";


       


        var finalQuery = {}; //creates query params

        //Adds each item to the query
        finalQuery[fieldname1] = case_id;
        finalQuery[fieldname2] = hospital_code;
        finalQuery[fieldname3] = hospital_type_code;
        finalQuery[fieldname4] = city_code_hospital;
        finalQuery[fieldname5] = hospital_region_code;
        finalQuery[fieldname6] = available_rooms;
        finalQuery[fieldname7] = department;
        finalQuery[fieldname8] = ward_type;
        finalQuery[fieldname9] = ward_facility_code;
        finalQuery[fieldname10] = bed_grade;
        finalQuery[fieldname11] = patientid;
        finalQuery[fieldname12] = city_code_patient;
        finalQuery[fieldname13] = type_of_admission;
        finalQuery[fieldname14] = severity_of_illness;
        finalQuery[fieldname15] = visitors_with_patient;
        finalQuery[fieldname16] = age;
        finalQuery[fieldname17] = admission_deposit;
        finalQuery[fieldname18] = stay_date;
        
        console.log(finalQuery);

          var http = require("http");
          var MongoClient = require("mongodb").MongoClient;
          var url="mongodb://localhost:27017/";
          var future = new Future();
          MongoClient.connect(url, function(err,db){ //connects to DB
            if (err) throw err;
            console.log("inside query");
            console.log(finalQuery);
            var dbo = db.db("Hospital"); //set db name
            //inserts 1 record
            dbo.collection("RawData").insertOne(finalQuery, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              future.return(res); //This doesnt seem to work for some reason not sure why
              db.close();
             });
          }
          );
          return future.wait();
    },

        BulkUpload:function(query){ //quires database to list all the records in the database equal to fields
          console.log("Inside Query");
          console.log(query);
            var http = require("http");
            var MongoClient = require("mongodb").MongoClient;
            var url="mongodb://localhost:27017/";
            var future = new Future();
            MongoClient.connect(url, function(err,db){ //connects to DB
              if (err) throw err;
              console.log("inside query");
              var dbo = db.db("Hospital"); //set db name
              dbo.collection("RawData").insertOne(query,function(err,result){ //query collection with criteria
                if (err) console.log(err);
                console.log(result);
                future.return(result);// returns the result back to .js
                db.close();
              });
            });
            return future.wait();
          },

          Enhancement:function(field,query){ //quires database to list all the records in the database equal to fields
            console.log("Inside enhancement");
            console.log(query);
            console.log(field);
            var finalQuery = {}; //creates query params
            finalQuery[field] = query; //creates query
              var http = require("http");
              var MongoClient = require("mongodb").MongoClient;
              var url="mongodb://localhost:27017/";
              var future = new Future();
              MongoClient.connect(url, function(err,db){ //connects to DB
                if (err) throw err;
                console.log("inside query");
                console.log(finalQuery);
                var dbo = db.db("Hospital"); //set db name
                dbo.collection("RawData").find(finalQuery).toArray(function(err,result){ //query collection with criteria
                  if (err) console.log(err);
                  console.log(result);
                  future.return(result);// returns the result back to QueryPanel.js
                  db.close();
                });
              });
              return future.wait();
          },

  });
});
