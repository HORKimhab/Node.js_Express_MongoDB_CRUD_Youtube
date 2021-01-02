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
    if (req.body._id == '') {
        insertRecord(req, res);
    } 
    else {
        updateRecord(req, res); 
    }
    
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
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body); 
                res.render('employee/addOrEdit', {
                    viewTitle: "Insert Employee", 
                    employee: req.body,
                });  
            }
            else {
                log('Error during record inserting : ' + err); 
            }
            // log('Error during record inserting : ' + err); 
        }
    }); 
}

// Function Update Record | Update Employee 
function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('employee/list'); 
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body); 
                res.render('employee/addOrEdit', {
                    viewTitle: 'Update Employee',
                    employee: req.body,
                }); 
            }
            else {
                log('Erro during record update: ' + err);   
            }
        }
    }); 
}

router.get('/list', (req, res) => {
    // res.json('from list');
    Employee.find((err, docs) => {
        if (!err) {
            res.render('employee/list', {
                list: docs
            });
        }
        else {
            log('Error in retirieving employee list: ' + err); 
        }
    }); 
}); 

function handleValidationError(err, body) {
    for (var field in err.errors) {
        switch (err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break; 
            case 'email':
                body['emailError'] = err.errors[field].message;
                break; 
            default:
                break; 
        }
    }
}

// get id of employee 
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addOrEdit', {
                viewTitle: "Update Employee",
                employee: doc,
            });
        }
    }); 
}); 

// remove | delete employee by id 
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');     
        }
        else {
            log('Error in employee delete :' + err); 
        }
    }); 
}); 

module.exports = router; 