'use strict';

/* REQUIRES */
require('dotenv').config();

var path 					 = require('path');
var pg 						 = require('pg');
var express 		   = require('express');
var morgan 			   = require('morgan');
var bodyParser 		 = require('body-parser');
var db 					   = require('./db/pg.js');
var request 			 = require('request');
var methodOverride = require('method-override');
var favicon				 = require('serve-favicon');
var userRoutes     = require('./routes/users');

var app = express();

/* PSQL Connection */
var config = {

}

/* ROUTE PATHS */
app.use('/users', userRoutes);

// var ROUTENAME = require(path.join(__dirname, 'routes', 'ROUTENAME'));

/* EXPRESS-APP USAGE */
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(methodOverride('_method'));

/* VIEW ENGINE DECLARATION */
app.set('views', './views');
app.set('view engine', 'ejs');

/* EXPRESS ROUTES */
app.get('/', function(req, res) {
	res.render('home.ejs');
});

/* SERVER CONFIGURATION */
var port 	 = process.env.PORT || 3000;
var server = app.listen(port, () => console.log(`Server initialized on // ${new Date()}`));





