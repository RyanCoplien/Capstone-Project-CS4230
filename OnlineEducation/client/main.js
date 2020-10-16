import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './registrationNlogin.html';
import './queryDatabase.html';
import './recordByRecord.html';
import './modularSetup.html';
import './DataView.html';

Router.route('Home', function(){
  this.render('Home');
});

Router.route('/registrationNloginPage', function(){
   this.render('registrationNloginPage');
});

Router.route('/queryDatabase', function(){
   this.render('queryDatabase');
});

Router.route('/recordByRecord', function(){
   this.render('recordByRecord');
});

Router.route('/modularSetup', function(){
   this.render('modularSetup');
});

Router.route('/DataView', function(){
	this.render('DataView');
});

Router.route('/', function(){
    this.render('Home');
});

/* 
	Registration and login templates templates
*/
Template.registrationNloginPage.events({
	'click #buttonsubmitRegistrationForm':function(event){
		console.log("In button Registration");
		console.log("inside registerEntity");
		var selectTitle = document.getElementById('selectTitle').value;
		var textFirstName = document.getElementById('textFirstName').value;
		var textLastName = document.getElementById('textLastName').value;
		var textUserName = document.getElementById('textUserName').value;
		var passwordPassword = document.getElementById('passwordPassword').value;
		var selectRegisterAs = document.getElementById('selectRegisterAs').value;
		var textHighestDegree = document.getElementById('textHighestDegree').value;
		var textCurrentOrganization = document.getElementById('textCurrentOrganization').value;
		var textCurrentDesignation = document.getElementById('textCurrentDesignation').value;
		var textEmail = document.getElementById('textEmail').value;
		var textPhoneNumber = document.getElementById('textPhoneNumber').value;
		var textBirthDate = document.getElementById('textBirthDate').value;
		var textareaOtherInfo = document.getElementById('textareaOtherInfo').value;
		var selectCollection = "";
		console.log(selectRegisterAs);
		if(selectRegisterAs.toString() === "student") {console.log("Student selected");
			selectCollection = "insert_collectionStudents";}
		if(selectRegisterAs.toString() === "instructor") {console.log("Instructor selected");
			selectCollection = "insert_collectionInstructors";}
		console.log(selectCollection);
		Meteor.call(selectCollection.toString(), textUserName, selectTitle, textFirstName, 
			textLastName, passwordPassword, textHighestDegree, textCurrentDesignation, 
			textCurrentOrganization, textEmail, textPhoneNumber, textBirthDate,
			textareaOtherInfo, function(err, res) {
				if (err) console.log("mongoDB Error");
				else console.log("Registration Successful");
			});
	}
});

 

