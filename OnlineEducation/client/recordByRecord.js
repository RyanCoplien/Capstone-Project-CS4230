import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './html/recordByRecord.html';

var inputRecordcounter = 0;

/* 
	input templates
*/
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
        },
  
    'click #UploadBulkRecord' :function(event){
          console.log("In button upload bulk record");
          var file = document.querySelector('#Bulkfile').files[0];
          var reader = new FileReader();
          reader.readAsText(file);
          reader.onload = function(e) {
              var test = reader.result;
              var lines =test.split("\n");
                  var headers =lines[0].split(",");
              var resultcsv = [];
              for(var i=1;i<lines.length;i++) {
                  var obj = {};
                  var currentline = lines[i].split(",");
  
                  for(var j=0;j<headers.length;j++) {
                      if(j == 18) {
                          obj[headers[j]] = "";
                      } else {
                          obj[headers[j]] = currentline[j];
                      }
                  }
                  resultcsv.push(obj);
                 }
              Meteor.call("insert_BulkRecords",resultcsv, function(err, res){
                   if (err) console.log("mongoDB Error");
                    else console.log("Bulk Record Submission Success");
              });
          };
        }        
  });
  
  Template.recordByRecord.helpers({
  
  });
  
  Template.recordByRecord.onCreate({
      incrementCount(){
          inputRecordcounter++;
      },
  });
  