import { Template } from 'meteor/templating';

Template.QueryTemplate.events({
    'click #submitQuery'(event, instance) {
        console.log("Looking for query");
        var field = document.getElementById("dropdown").value;
        var query = document.getElementById("input").value;
        var functionname = "Query";
        console.log("Filed to search : " + field);
        console.log("Searching records that contain: " + query);

        Meteor.call(functionname.toString(),field,query,function(err,result){
            var table = document.createElement("table");
            table.innerHTML = "";
            
        var hospitalRecords = result;
        console.log("Data Aquired");
            // EXTRACT VALUE FOR HTML HEADER. 
            var col = [];
            for (var i = 0; i < hospitalRecords.length; i++) {
                for (var key in hospitalRecords[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
            console.log("First Loop Done!");
            
            

            var tr = table.insertRow(-1);                   // TABLE ROW.
                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th");      // TABLE HEADER.
                    th.innerHTML = col[i];
                    tr.appendChild(th);
                }
                console.log("Second Loop Done!");
        
                for (var i = 0; i < hospitalRecords.length; i++) {
                                                                    //inserts data
                    tr = table.insertRow(-1);
        
                    for (var j = 0; j < col.length; j++) {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = hospitalRecords[i][col[j]];
                    }
                }
                console.log("Third Loop Done!")

                 var divContainer = document.getElementById("showQueryResults"); //appends data to html
                 divContainer.innerHTML = "";
                 divContainer.appendChild(table);
        })
    },
});