import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Router } from 'meteor/iron:router';


import './main.html';
import './DashBoard.js';
import './DataView.js';
import './Intput.js';
import './Query.js';
import './QueryPanel.js';
import './QueryResults.js';
import './BulkUpload.js';
import './enhancement.js';


//This gets rid of routes as it causes a pop-up if no route are defined
Router.configure({
 noRoutesTemplate: 'noRoutesTemplate',
});


