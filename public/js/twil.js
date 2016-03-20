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
            console.log(responseData.to);
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
       if(callerId) {
         req.code = callerId.validation_code;
       } else {
         req.code = 'Error validating phone number.'
       }
       next();
  });
}

let checkMessages = (cb) => {
  client.messages.list(function(err, data) {
    var newMessages = data.messages.filter(function(message) {
      return message.to === '+19179098279';
    });
    cb(newMessages.length);
  });
}

let findKiller = () => {
  client.messages.list(function(err, data) {
    var newMessages = data.messages.filter(function(message) {
      return message.to === '+19179098279';
    });
    return(newMessages[0].from);
  });
}



// Exports: allow functions to be 'seen' outside of this file
module.exports.findKiller = findKiller;
module.exports.checkMessages = checkMessages;
module.exports.sendText = sendText;
module.exports.verifyPhone = verifyPhone;
