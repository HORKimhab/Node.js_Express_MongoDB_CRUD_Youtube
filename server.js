require('./models/db'); 
const express = require('express'),
    log = console.log,
    employeeController = require('./controllers/employeeController'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    Handlebars = require('handlebars'), 
    // fix allowInsecurePrototypeAccess is not a function by add allowInsecurePrototypeAccess ---> { allowInsecurePrototypeAccess } 
    { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access'),
    bodyparser = require('body-parser'); 

let app = express(),
    PORT = 3000; 
app.use(bodyparser.urlencoded({
    extended: true
})); 

app.use(bodyparser.json()); 

app.set('views', path.join(__dirname, '/views/'));  

// hbs is extension file name, mainLayout is file name, views/layouts is folder name 
app.engine('hbs', exphbs({
    extname: 'hbs', defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    // Issue in Access has been denied to resolve the property
    //"---" because it is not an "own property" of its parent.
    handlebars: allowInsecurePrototypeAccess(Handlebars),
})); 

app.set('view engine', 'hbs'); 

app.listen(PORT, () => {
    log(`Express server is listening on port ${PORT}`);
}); 

// log(exphbs); 
// log(app.engine('hbs', exphbs({}))); 

app.use('/employee', employeeController); 