var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
const child_p = require('child_process')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const port = 80

require('./database/accedeDB.js')

//Middlweawares
app.use('/favicon.ico', express.static('images'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(require('./routes'));
app.use('/users', require('./routes/users'));

// Listening Port
app.listen(port);
app.listen(app.get('port'), () => {
    console.log('Server on port', port);
});

// Git pull
app.post('/webhook', async(req,res)=>{
    child_p.exec('git reset --hard')
    child_p.exec('git pull origin master')
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'database')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
