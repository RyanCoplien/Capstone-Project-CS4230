import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';



var queryResultCounter = 0;

/* 
	Query Results templates
*/
Template.queryResult.events({

});

Template.queryResult.helpers({
	incrementCount(){
		queryResultCounter++;
	},
	
	listSpecificRecord(searchCategory, searchValue){
		Meteor.call("pull_singleRecord",searchCategory, searchValue, 
			function(err, result){
				if(err) console.log("mongodb error loading single record" + searchCategory +": "+ searchValue);
				else console.log("single record loaded :" + result);
			});
	},
});
Template.queryResult.onCreate({

});