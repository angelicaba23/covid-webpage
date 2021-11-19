const express = require('express');
const morgan = require('morgan');

// initializations
const app = express();

// settings
app.set('port', process.env.Port || 8080);

// Middlewares
app.use(morgan('dev'));

// Global Variables

//Routes

//Public

//Starting the server 
app.listen(app.get('port'),() =>{
    console.log('Server on port', app.get('port'));
})