import { Template } from 'meteor/templating';

Template.RecordByRecordTemplate.onCreated(function helloOnCreated() {
    this.counter6 = new ReactiveVar(0);
});

Template.RecordByRecordTemplate.helpers({
    counter6() {
      return Template.instance().counter6.get();
    },
  });

Template.RecordByRecordTemplate.events({
    'click #uploadRecord':function(event,instance){
       

      
        console.log("Inserting Data");
        var case_id = document.getElementById('caseid_text').value;



        var hospital_code = document.getElementById('hosptialcode_text').value;
        var hospital_type_code = document.getElementById('hospitaltypecode_text').value;
        var city_code_hospital = document.getElementById('citycode_text').value;
        var hospital_region_code = document.getElementById('regioncode_text').value;
        var available_rooms = document.getElementById('availablebeds_text').value;
        var department = document.getElementById('departmnet_text').value;
        var ward_type = document.getElementById('wardtype_text').value;
        var ward_facility_code = document.getElementById('wardcode_text').value;
        var bed_grade = document.getElementById('bedgrade_text').value;
        var patientid = document.getElementById('patientid_text').value;
        var city_code_patient = document.getElementById('citycodepatient_text').value;
        var type_of_admission = document.getElementById('type_text').value;
        var severity_of_illness = document.getElementById('severity_text').value;
        var visitors_with_patient = document.getElementById('visitors_text').value;
        var age = document.getElementById('age_text').value;
        var admission_deposit = document.getElementById('admission_text').value;
        var stay_date = document.getElementById('stay_text').value;
        var functionname = "UploadRecordByRecord";
            
        if (case_id === "" || hospital_code === "" ||hospital_type_code === "" || city_code_hospital === "" || hospital_region_code=== "" ||
         available_rooms === ""|| department=== "" || ward_type=== ""||ward_facility_code=== "" || bed_grade=== "" || patientid=== "" || 
         city_code_patient=== "" || type_of_admission=== ""|| severity_of_illness=== "" || visitors_with_patient=== "" || age=== "" || 
         admission_deposit=== "" || stay_date == "")
            {
                  
            }
        else{
            event.preventDefault(); //Prevents page relod
            Meteor.call(functionname.toString(),case_id, hospital_code, hospital_type_code,
            city_code_hospital, hospital_region_code, available_rooms, department, ward_type, ward_facility_code,
            bed_grade, patientid, city_code_patient, type_of_admission, severity_of_illness, visitors_with_patient,
            age, admission_deposit, stay_date, function(err, res){
                  if (err) console.log("mongoDB Error");
                  else console.log("Record Submission Success");
            })
            instance.counter6.set(instance.counter6.get() + 1);
            alert("1 document inserted");
            ;
        }
         
      },
});