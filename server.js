'use strict';
const express     = require('express');
const logger      = require('morgan');
const path        = require('path');
const bodyParser  = require('body-parser');
const db          = require('./db/pg');
const pgp         = require('pg-promise');
const bcrypt      = require('bcrypt');
const salt        = bcrypt.genSaltSync(10);
const hash        = bcrypt.hashSync('B4c0/\/', salt);
const dotenv      = require('dotenv');

// Twilio Credentials
var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);


const app       = express();

/* TWILIO FUNCTION CALL WITH DYNAMIC PARAMETERS */
const twilio = require('./public/js/twil.js');
twilio.sendText('+9177332565', 'testmessage');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const usersRoutes     = require('./routes/users');

app.use(express.static(path.join(__dirname,'public')))

app.use(logger('dev'));
dotenv.load();
app.use('/users', usersRoutes);


app.get('/', (req, res)=>{
  res.sendFile('index.html')
});

app.listen(3007 , ()=> console.log(`Server initialized on // ${new Date()}`));
