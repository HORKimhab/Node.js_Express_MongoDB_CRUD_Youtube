const express = require('express'); 
let router = express.Router(); 
const mongoose = require('mongoose'); 
const Employee = mongoose.model('Employee'); 
const log = console.log; 


// use with app.use('/employee', employeeController);  
router.get('/', (req, res) => {
    // res.json('sample text');
    res.render('employee/addOrEdit', {
        viewTitle: "Insert Employee"
    }); 
}); 

// method post 
router.post('/', (req, res) => {
    // res.json('Pass');
    insertRecord(req, res);
    
});

function insertRecord(req, res) {
    let employee = new Employee(); 
    employee.fullName = req.body.fullName; 
    employee.email = req.body.email; 
    employee.mobile = req.body.mobile; 
    employee.city = req.body.city; 
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list'); 
        } else {
            log('Error during record inserting : ' + err); 
        }
    }); 
}

router.get('/list', (req, res) => {
    res.json('from list');
    // res.render('employee/addOrEdit', {
    //     viewTitle: "Insert Employee"
    // }); 
}); 

module.exports = router; 