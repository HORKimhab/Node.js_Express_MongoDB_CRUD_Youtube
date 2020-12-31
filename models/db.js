const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/EmployeeDB'; 
const log = console.log; 
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        log('Connect MongoDB successfully.'); 
    }
    else {
        log('Erro with connection MongoDB: ' + err); 
    }
});

require('./employee.model'); 