require('./models/db'); 
const express = require('express'),
    log = console.log,
    employeeController = require('./controllers/employeeController'),
    path = require('path'),
    exphbs = require('express-handlebars'); 
let app = express(),
    PORT = 3000; 

app.set('views', path.join(__dirname, '/views/'));  

// hbs is extension file name, mainLayout is file name, views/layouts is folder name 
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' })); 

app.set('view engine', 'hbs'); 

app.listen(PORT, () => {
    log(`Express server is listening on port ${PORT}`);
}); 

// log(exphbs); 
// log(app.engine('hbs', exphbs({}))); 

app.use('/employee', employeeController); 