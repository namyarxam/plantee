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
/* BCRYPT: Module for password hashing methods */
const bcrypt = require('bcrypt');
/* SALT: First layer of password hashing - number of hash iterations */
const salt = bcrypt.genSaltSync(10);
/* HASH: Calls from bcrypt, salt to initiate password hash */
const hash = bcrypt.hashSync('B4c0/\/', salt);
/* TWILIO: Relative path to our twilio API methods */
const twil = require('./public/js/twil.js');
/* USERROUTES: Relative path to our UserAuth Route */
const usersRoutes = require('./routes/users');
/* PLANTEEROUTES: Relative path to our DB integrated route */
const planteeRoutes = require('./routes/plantee');
/* PG: Used for CronJob */
const pg = require('pg');
const cs = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/project3`;

/* TWILIO API AUTHENTICATION */
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
/* CLIENT: Require the Twilio module and create a REST client */
const client = require('twilio')(accountSid, authToken);

/* EXPRESS APP INITIALIZATION */
const app = express();

/* CONSTANT CRON JOB THAT WILL SEND A POST FROM THE LIST OF GARDENERS */
const CronJob = require('cron').CronJob;
/* TWILIO API FUNCTION */

let sayings = ['Water me.', 'It\'s dark in here, I need sunshine.', 'There are bugs on me, put pesticides on me', 'Water me.', 'Water me.', 'Plantee lonely, send butterfly!', 'Bumblebee sit on my face.', 'I did photosynthesis today.', 'Till my soil.', 'I\'m standing tall'];
let oldLength = 0;
let currentTarget = '';
let caretakers = [];

// this function will execute every hour from 9-5 on M/W/T/TH/F
var job = new CronJob('0 * * * * *', function() {
	// returns # of messages recieved by plantee
	twil.checkMessages(function(length) {
		if (length > oldLength) {
				oldLength = length;

				pg.connect(cs, (err, client, done) => {
					if(err) {
						done();
						console.log(err);
						return res.status(500).json({ success: false, data: err });
					}
					client.query('SELECT * FROM gardeners', (err, results) => {
						done();
						if(err) {
							return console.error('error running query', err);
						}
						var gardeners = results.rows;
						caretakers = [];
						for(var i = 0; i < gardeners.length; i++) {
							caretakers.push(gardeners[i].phone);
						}
						if(!(gardeners.length === 0)) {
							var target = gardeners[Math.floor(Math.random()*gardeners.length)].phone;
							currentTarget = target;
							var say = sayings[Math.floor(Math.random()*sayings.length)];
							twil.sendText(target, 'Message from Plantee: ' + say);
						}
					});
				});
			} 
			else {
				pg.connect(cs, (err, client, done) => {
					if(err) {
						done();
						console.log(err);
						return res.status(500).json({ success: false, data: err });
					}
					client.query('SELECT name FROM gardeners WHERE phone = $1', [currentTarget], (err, results) => {
						done();
						if(err) {
							return console.error('error running query', err);
						}
						var killerNumber = results.rows[0].name;
						for(var i = 0; i < caretakers.length; i++) {
							twil.sendText(caretakers[i], 'Plantee has been killed by ' + killerNumber);
						}
						job.stop();
					});
				})
			}
	});
}, function () {
    console.log('planteePing stopped.');
  },
  true, /* Start the job right now */
  'America/Los_Angeles' /* Time zone of this job. */
);

	

/* MODULE CONFIGURATION BOUND TO EXPRESS APP */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'));
app.use('/users', usersRoutes);
app.use('/plantee', planteeRoutes);

/* HOME ROUTE */
app.get('/', (req, res)=>{
  res.sendFile('index.html')
});

// app.get('*', (req, res)=>{
//   res.render('index.html')
// });

/* SERVER INITIALIZATION */
app.listen(3000 , ()=> console.log(`Server initialized on // ${new Date()}`));
