import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './html/DataView.html';

var dataviewCounter = 0;

/* 
	Data view templates
*/
Template.DataView.events({
	
	'click #btnShowData':function(event,instance)
	{
		("Add Clicked");
		instance.acounter.set(instance.acounter.get() + 1)
		var table = document.getElementById('DataTable');
		var rowcount = document.getElementById('DataTable').rows.length;
		var row = table.insertRow(rowcount);
		for(i=0; j< table.rows[0].cells.length; j++){
			var newCell = (row.insertCell(i));
		}
		var tableCaseId = document.getElementById('textCase_ID').value;
			table.rows[rowcount].cells[0].innerHTML = tableCaseId;

		var tableHostipalCode = document.getElementById('textHosptital_Code').value;
			table.rows[rowcount].cells[1].innerHTML = tableHostipalCode;

		var tableHospitalTypeCode = document.getElementById('textHospital_type_code').value;
			table.rows[rowcount].cells[2].innerHTML = tableHospitalTypeCode;

		var tableCityCodeHospital = document.getElementById('textCity_Code_Hospital').value;
			table.rows[rowcount].cells[3].innerHTML = tableCityCodeHospital;

		var tableHospitalRegionCode = document.getElementById('textHospital_Region_Code').value;
			table.rows[rowcount].cells[4].innerHTML = tableHospitalRegionCode;

		var tableAvailableExtraRoomsInHospital = document.getElementById('textAvailable_Extra_Rooms_in_Hospital').value;
			table.rows[rowcount].cells[5].innerHTML = tableAvailableExtraRoomsInHospital;

		var tableDepartment = document.getElementById('textDepartment').value;
			table.rows[rowcount].cells[6].innerHTML = tableDepartment;

		var tableWardType = document.getElementById('textWard_Type').value;
			table.rows[rowcount].cells[7].innerHTML = tableWardType;

		var tableWardFacilityCode	= document.getElementById('').value;
			table.rows[rowcount].cells[8].innerHTML = tableWardFacilityCode;

		var tableBedGrade = document.getElementById('textBed_Grade').value;
			table.rows[rowcount].cells[9].innerHTML = tableBedGrade;

		var tablePatientid = document.getElementById('textpatientid').value;
			table.rows[rowcount].cells[10].innerHTML = tablePatientid;

		var tableCityCodePatient = document.getElementById('textCity_Code_Patient').value;
			table.rows[rowcount].cells[11].innerHTML = tableCityCodePatient;

		var tableTypeOfAdmission = document.getElementById('textType_of_Admission').value;
			table.rows[rowcount].cells[12].innerHTML = tableTypeOfAdmission;

		var tableSeverityOfIllness = document.getElementById('textSeverity_of_Illness').value;
			table.rows[rowcount].cells[13].innerHTML = tableSeverityOfIllness;

		var tableVisitorsWithPatient = document.getElementById('textVisitors_with_Patient').value;
			table.rows[rowcount].cells[14].innerHTML = tableVisitorsWithPatient;

		var tableAge = document.getElementById('textAge').value;
			table.rows[rowcount].cells[15].innerHTML = tableAge;

		var tableAdmissionDeposit = document.getElementById('textAdmission_Deposit').value;
			table.rows[rowcount].cells[16].innerHTML = tableAdmissionDeposit;

		var tableStay= document.getElementById('textStay').value;
			table.rows[rowcount].cells[17].innerHTML = tableStay;
	}

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