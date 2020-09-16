import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './registrationNlogin.html';
import './queryDatabase.html';
import './recordByRecord.html';

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

Router.route('/', function(){
    this.render('Home');
});

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

Template.recordByRecord.events({
  'click #UploadRecord' :function(event){
  		console.log("In button upload record");
		console.log("inside recordEntity");
        var case_id = document.getElementById('case_id').value;
        var hospital_code = document.getElementById('hospitalCode').value;
        var hospital_type_code = document.getElementById('hospitalType').value;
        var city_code_hospital = document.getElementById('CityHospitalCode').value;
        var hospital_region_code = document.getElementById('HospitalRegionCode').value;
        var available_rooms = document.getElementById('extraRooms').value;
        var department = document.getElementById('dept').value;
        var ward_type = document.getElementById('WardType').value;
        var ward_facility_code = document.getElementById('WardFacilityCode').value;
        var bed_grade = document.getElementById('BedGrade').value;
        var patientid = document.getElementById('patientID').value;
        var city_code_patient = document.getElementById('CityCode').value;
        var type_of_admission = document.getElementById('TypeOfAdmission').value;
        var severity_of_illness = document.getElementById('SeverityOfIllness').value;
        var visitors_with_patient = document.getElementById('Visitors').value;
        var age = document.getElementById('Age').value;
        var admission_deposit = document.getElementById('AdmissionDeposit').value;
        var stay_date = document.getElementById('Stay').value;

        var selectCollection = "";
        Meteor.call("insert_SingleRecord",case_id, hospital_code, hospital_type_code,
        city_code_hospital, hospital_region_code, available_rooms, department, ward_type, ward_facility_code,
        bed_grade, patientid, city_code_patient, type_of_admission, severity_of_illness, visitors_with_patient,
        age, admission_deposit, stay_date, function(err, res){
              if (err) console.log("mongoDB Error");
              else console.log("Record Submission Success");
        });
      }        
});