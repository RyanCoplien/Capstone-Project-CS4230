import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './html/DataView.html';

var dataviewCounter = 0;

/* 
	Data view templates
*/
Template.DataView.events({

});

Template.DataView.helpers({
	record: [
		{text: 'user data goes here'},
	],
	
});

Template.DataView.onCreate({
	incrementCount(){
		dataviewCounter++;
	},

	listAllRecords(){
		document.getElementById("")
		Meteor.call("pull_allRecords", function(err, result){
			if(err) console.log("mongoDB error pulling all records");
			else console.log("record pulled : " + result);
		});
	},

	DisplayData(result){
		let table = document.querySelector("table");
		let data = Object.keys(result[0]);
		generateTableHead(table, data);
		generateTable(table, data);
	},
});

function generateTableHead(table, data) {
	let thead = table.createTHead();
	let row = thead.insertRow();
	for (let key of data) {
	  let th = document.createElement("th");
	  let text = document.createTextNode(key);
	  th.appendChild(text);
	  row.appendChild(th);
	}
  }
  
  function generateTable(table, data) {
	for (let element of data) {
	  let row = table.insertRow();
	  for (key in element) {
		let cell = row.insertCell();
		let text = document.createTextNode(element[key]);
		cell.appendChild(text);
	  }
	}
  }