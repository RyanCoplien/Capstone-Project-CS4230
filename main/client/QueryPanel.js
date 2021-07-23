import { Template } from 'meteor/templating';

Template.QueryPanel.onCreated(function helloOnCreated() {
    this.counter8 = new ReactiveVar(0);
    this.counter9 = new ReactiveVar(0);
});

Template.QueryPanel.helpers({
    counter8() {
      return Template.instance().counter8.get();
    },
    counter9() {
        return Template.instance().counter8.get();
      },
  });

Template.QueryPanel.events({
    'click #buttonClient':function(event,instance){
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
            console.log("Result: " + percent.toPrecision(4));
            document.getElementById("clientside").value = percent.toPrecision(4) + "% of Radiotherapy Patients are from the ER."
        })
        console.timeEnd("Client Count Timer");
        instance.counter8.set(instance.counter8.get() + 1);
    },

    'click #buttonServer':async function(event,instance){
        var percent;
        console.time("Server Count Timer");
        percent = Meteor.call('ServerSideCount',function(err, res){ //calls the meteor function in the server/main.js
            console.log("Result: " + res);
            document.getElementById("clientside").value = res.toPrecision(4) + "% of Radiotherapy Patients are from the ER."
        });
        console.timeEnd("Server Count Timer");
        instance.counter9.set(instance.counter9.get() + 1);
    }


});