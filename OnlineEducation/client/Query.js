import { Template } from 'meteor/templating';

Template.QueryTemplate.events({
    'click #submitQuery'(event, instance) {
        console.log("Looking for query");
        var field = document.getElementById("dropdown").value;
        var query = document.getElementById("input").value;
        var functionname = "Query";
        var querystring =""
        console.log("Filed to search : " + field);
        console.log("Searching records that contain: " + input);
        querystring = "{"+ field.toString() + ": " + query.toString() + "}";
        console.log(querystring)
        Meteor.call('Query'),querystring,function(err,result){
            if (err) console.log(err);
            else
            {
                console.log("Query Returned:");
                console.log(result);
                document.getElementById("textarea_comment").value = result + "\n"  +"\n;"
            }
        }}
});