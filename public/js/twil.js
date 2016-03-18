/* GLOBAL REQUIRES - SEE `../../server.js` */
'use strict';
const express   = require('express');
const morgan    = require('morgan');
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

let verifyPhone = (name, phoneNum, next, req) => {
  client.outgoingCallerIds.create({
      friendlyName: name,
      phoneNumber: phoneNum
  }, function(err, callerId) {
       req.code = callerId.validation_code;
       next();
  });
}

// Exports: allow functions to be 'seen' outside of this file
module.exports.sendText = sendText;
module.exports.verifyPhone = verifyPhone;
