/* GLOBAL REQUIRES - SEE `../../server.js` */
'use strict';
const express   = require('express');
const morgan    = require('morgan');
const request   = require('request');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client    = require('twilio')(accountSid, authToken);
require('dotenv').config();

/* SENDTEXT: Our wrapper for Twilio API's ability to send a text to a registered number */
let sendText = (recNum, text) => {
  // Send a text message (text) to recipient (recNum)
  client.sendMessage({
      to: recNum,
      from: '+19179098279',
      body: text
  }, function(err, responseData) {
            if (!err) {
            console.log(responseData.from);
            console.log(responseData.body);
            } else {
                console.log(err);
            }
  });
}

// Exports: allow functions to be 'seen' outside of this file
module.exports.sendText = sendText;
