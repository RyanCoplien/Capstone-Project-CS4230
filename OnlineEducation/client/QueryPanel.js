import { Template } from 'meteor/templating';

Template.QueryPanel.onCreated(function querypanelOnCreated(){

});

Template.QueryPanel.helpers({

});

Template.QueryPanel.events({
    'click #buttonClient':function(event){
        console.time("Client Count Timer");
        console.log("Inside Client");
        Meteor.call('ClientSideCount',function(err, res){ //calls the meteor function in the server/main.js
            var Radtherapy = res.length; //finds the number of radtherapy patients
            var Extreme = 0;
            var percent;

            for(var i=0;i<res.length;i++){ //each time theres an 'Extreme" incrmenet extreme patients
                var key=Object.keys(res[i]);
                if(res[i][key[14]] == 'Extreme')
                {
                 Extreme++;
                }
                percent = 100*(Extreme/Radtherapy); //find the percent of extreme radtherapy patients
            }
            document.getElementById("clientside").value = percent.toPrecision(4) + "% of Radiotherapy Patients are from the ER."
        })
        console.timeEnd("Client Count Timer");
    },

    'click #buttonServer':async function(event){
        var percent;
        
        percent = Meteor.call('ServerSideCount',function(err, res){ //calls the meteor function in the server/main.js
            console.log("Result" + res);
            document.getElementById("clientside").value = res.toPrecision(4) + "% of Radiotherapy Patients are from the ER."
        });
        
    }


});