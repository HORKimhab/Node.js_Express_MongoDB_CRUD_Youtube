const express = require('express'); 
let router = express.Router(); 

// use with app.use('/employee', employeeController);  
router.get('/', (req, res) => {
    // res.json('sample text');
    res.render('employee/addOrEdit', {
        viewTitle: "Insert Employee"
    }); 
}); 

module.exports = router; 