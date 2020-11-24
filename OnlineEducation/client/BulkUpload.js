import { Template } from 'meteor/templating';

Template.BulkUpload.onCreated(function helloOnCreated() {
    this.counter3 = new ReactiveVar(0);
});

Template.BulkUpload.helpers({
    counter3() {
      return Template.instance().counter3.get();
    },
  });

Template.BulkUpload.events({
    'click #buttonBulkUpload':function(event,instance){
        console.log("Uploading Bulk Data");
        var inputFile = document.querySelector('#upload').files[0];
        var reader = new FileReader();
        reader.readAsText(inputFile);
        var counter = 0;
        var functionname = "BulkUpload";
        reader.onload = function(e,res){
    
            var output = reader.result;
            var div = output.split("\n");
            div.pop(); //Gets rid of last undefined record this may need tampured with

            var headerline = div[0].split(",");
    
            for(var i = 1; i < div.length; i++)
            {
                    //creates param
                    var obj ={};

                    //Splits up the records
                    var line = div[i].split(",");

                    
                    for(var j = 0; j < headerline.length; j++)
                    {
                        //18 is used as that is the number of headers there is in the csv file
                        if(j==18)
                        {
                            obj[headerline[j]] = "";
                        }
                        else
                        {
                            obj[headerline[j]] = line[j];
                        }
                    }
                    //pushes the rcord to the finalbulkCSV                      
                    Meteor.call(functionname.toString(), obj, function(error, result){
                        if(error == null){
                          console.log(error.reason);
                          return;
                        }
                      });                     
                    instance.counter3.set(instance.counter3.get() + 1);
                    console.log(instance.counter3.get());
                    alert(instance.counter3.get() + ": Documents that have been Uploaded")                   
                }
            }           
      },
    
    });