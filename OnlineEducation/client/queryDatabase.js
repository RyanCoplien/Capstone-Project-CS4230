import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './html/queryDatabase.html';

var QueryRecordCounter = 0;

/* 
	Query search templates
*/
Template.queryDatabase.events({	
	'click #buttonsubmitqueryStudent':function(event){
		console.log("In button Query Database");
		console.log("inside queryEntity");
		var textFirstName = document.getElementById('textFirstName').value;
		Meteor.call("query_collectionStudents", textFirstName, function(err, res) {
				if (err) console.log("mongoDB Error");
				else console.log("Query Successful");
				document.getElementById('textareaOtherInfo').value = "Students named " + textFirstName + 
				" have birthdays on:" + "\n" + res;
			});
	}
});

Template.queryDatabase.helpers({
	incrementCount(){
		QueryRecordCounter++;
	},
	result: [
		{text: 'This returns the query results'},
	],
});

Template.queryDatabase.onCreate({

});