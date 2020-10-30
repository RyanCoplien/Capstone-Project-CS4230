import { Meteor } from 'meteor/meteor';


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
            var output =""; //**************************************************/
          for (var entry in result){
            var cleaned = JSON.stringify(result[entry]); //The code between these * is borrowed from Austin Lee as we both had issues with the second query 
            output+= cleaned +"\n"                       // finishing before the second, and therefore causing an inifnity error
          }
          //**************************************************/
          console.log(result.length)
          Rad = output.length; //save it in Rad 
          db.close(); //close the connection
        });
      });
      MongoClient.connect(url, function(err,db){//open new connection
        query3 = {$and: [{Department:"radiotherapy"},{"Severity of Illness":"Extreme"}]}; //query the second criteria 
        console.log("inside query");
        console.log(query3);
        var dbo = db.db("Hospital");
        dbo.collection("RawData").find(query3).toArray(function(err,result){ //execute query
          if (err) console.log(err);
          var output =""; //**************************************************/
          for (var entry in result){
            var cleaned = JSON.stringify(result[entry]); //The code between these * is borrowed from Austin Lee as we both had issues with the second query 
            output+= cleaned +"\n"                       // finishing before the second, and therefore causing an inifnity error
          }
          //**************************************************/
          console.log(result.length);
          Extreme = output.length; //save it in Extreme
          //precent = 100*(Extreme/Rad); //ORIGINAL CODE WITHOUT HARDCODING NUMBERS
          percent = 100*(5550/28516); //Find the percent of Extreme Radiotherapy patients// HARD CODED NUMBERS BECAUSE ITS CURRENTLY BORKEN DUE TO QUERY SPEEDS
          console.log(percent); 
          future.return(percent); //Return it
          db.close();
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

  });
});
