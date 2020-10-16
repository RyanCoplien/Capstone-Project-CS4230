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
		Meteor.call("")
	},
});