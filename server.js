/* STRICT MODE: Allows for some ES6 functionality, doesnt allow use of undeclared constiables */
'use strict';
/* DOTENV: Simple module to store and hide confidential information */
require('dotenv').config();
/* EXPRESS: Web app framework */
const express = require('express');
/* MORGAN: HTTP request logger tied to express */
const logger = require('morgan');
/* PATH: Extracted nodeJS 'path' module for NPM */
const path = require('path');
/* BODYPARSER: Middleware to parse request body for back-end */
const bodyParser = require('body-parser');
/* DB: Relative path to our back-end postgreSQL file */
const db = require('./db/pg');
/* PG-PROMISE: Query formatting / backend manipulation for postgreSQL */
const pgp = require('pg-promise')({});
/* BCRYPT: Module for password hashing methods */
const bcrypt = require('bcrypt');
/* SALT: First layer of password hashing - number of hash iterations */
const salt = bcrypt.genSaltSync(10);
/* HASH: Calls from bcrypt, salt to initiate password hash */
const hash = bcrypt.hashSync('B4c0/\/', salt);
/* TWILIO: Relative path to our twilio API methods */
const twilio = require('./public/js/twil.js');
/* USERROUTES: Relative path to our UserAuth Route */
const usersRoutes     = require('./routes/users');

/* TWILIO API AUTHENTICATION */
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
/* CLIENT: Require the Twilio module and create a REST client */
const client = require('twilio')(accountSid, authToken);

/* EXPRESS APP INITIALIZATION */
const app = express();

/* MODULE CONFIGURATION BOUND TO EXPRESS APP */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'));
app.use('/users', usersRoutes);

/* HOME ROUTE */
app.get('/', (req, res)=>{
  res.sendFile('index.html')
});

// app.get('*', (req, res)=>{
//   res.render('index.html')
// });

/* SERVER INITIALIZATION */
app.listen(3000 , ()=> console.log(`Server initialized on // ${new Date()}`));
