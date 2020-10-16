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
});
Template.queryResult.onCreate({

});