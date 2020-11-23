import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.DataView.onCreated(function helloOnCreated() {
    this.counter = new ReactiveVar(0);
    this.counter2 = new ReactiveVar(0);
});

Template.DataView.helpers({
    counter() {
      return Template.instance().counter.get();
    },
    counter2() {
        return Template.instance().counter2.get();
      },
  });

Template.DataView.events({
    'click #DataViewbtn':function(event,instance){
        instance.counter.set(instance.counter.get() + 10000);
        counter = instance.counter.get();
        counter2 = counter - 10000
        instance.counter2.set(counter2);


        alert("This will take a while, and might crash the browesr.")
        console.log("Beginning Query")
        var data;

        Meteor.call('ViewData',function(err, res){

            data = res;

            //gets the set of data
            //this splices the records by the counter
            hospitalRecords = data.slice(counter2,counter)

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
            
            var table = document.createElement("table");

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

                 var divContainer = document.getElementById("showDataView"); //appends data to html
                 divContainer.innerHTML = "";
                 divContainer.appendChild(table);
                 
        })
    },
});