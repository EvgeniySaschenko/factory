var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var conf = require('./config');
var logger = require('morgan');
var session = require('express-session');
var useragent = require('express-useragent');


var indexRouter = require('./routes/index');
var errorRouter = require('./routes/error');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({
	secret: conf.get('session:secret'),
	resave : conf.get('session:resave'),
	saveUninitialized : conf.get('session:saveUninitialized'),
	key: conf.get('session:key'),
	cookie: conf.get('session:cookie')
}));
app.use(useragent.express());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



//app.use('*', errorRouter);

module.exports = app;
