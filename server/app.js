var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var conf = require('./config');
var logger = require('morgan');
var session = require('express-session');
var useragent = require('express-useragent');
const formData = require("express-form-data");
const os = require("os");


var navRouter = require('./routes/nav');
var userRouter = require('./routes/user');
var divisionRouter = require('./routes/division');
var toolRouter = require('./routes/tool');
var operationRouter = require('./routes/operation');
var materialRouter = require('./routes/material');
var operationRouter = require('./routes/operation');
var docRoutMapRouter = require('./routes/doc-rout-map');
var docAutomatMapRouter = require('./routes/doc-automat-map');
var errorRouter = require('./routes/error');

const api= require('./api');

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

app.use((req, res, next)=>{
	//req.session.user= req.session.user ? req.session.user : { id_visitor : false };
	req.session.user= { id_visitor : 1 };
	next();
})

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.use(useragent.express());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse data with connect-multiparty. 
app.use(formData.parse({
  uploadDir: os.tmpdir(),
  autoClean: true
}));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.use('/nav', navRouter);
app.use('/user', userRouter);
app.use('/division', divisionRouter);
app.use('/tool', toolRouter);
app.use('/operation', operationRouter);
app.use('/material', materialRouter);
app.use('/doc-rout-map', docRoutMapRouter);
app.use('/doc-automat-map', docAutomatMapRouter);

//app.use('*', errorRouter);

module.exports = app;
