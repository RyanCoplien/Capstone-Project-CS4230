import { Template } from 'meteor/templating';

Template.DataView.events({
    'click #DataViewbtn':function(event){
        alert("This will take a while, and might crash the browesr.")
        console.log("Beginning Query")
        Meteor.call('ViewData',function(err, res){

            var hospitalRecords = res;
        
            // EXTRACT VALUE FOR HTML HEADER. 
            var col = [];
            for (var i = 0; i < hospitalRecords.length; i++) {
                for (var key in hospitalRecords[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
            
            var table = document.createElement("table");

            var tr = table.insertRow(-1);                   // TABLE ROW.
                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th");      // TABLE HEADER.
                    th.innerHTML = col[i];
                    tr.appendChild(th);
                }
        
                for (var i = 0; i < hospitalRecords.length; i++) {
                                                                    //inserts data
                    tr = table.insertRow(-1);
        
                    for (var j = 0; j < col.length; j++) {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = hospitalRecords[i][col[j]];
                    }
                }
                 var divContainer = document.getElementById("showDataView"); //appends data to html
                 divContainer.innerHTML = "";
                 divContainer.appendChild(table);
        })
    },
});