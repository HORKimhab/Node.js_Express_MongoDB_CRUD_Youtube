const mongoose = require('mongoose'); 
const log = console.log; 

let employeeSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: 'Full name is required', 
    }, 
    email: {
        type: String, 
        required: 'Email is required', 
    }, 
    mobile: {
        type: Number
    }, 
    city: {
        type: String
    }, 
}, { collection: 'employees' }); 

// Out put employeeSchema
// log(employeeSchema); 

// Custom validation for email 
employeeSchema.path('email').validate((val) => {
    // Regular_Expressions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    // How to validate an email adress in Javascript
    // --->Link: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Employee', employeeSchema); 