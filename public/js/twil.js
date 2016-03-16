'use strict';

const express   = require('express');
const morgan    = require('morgan');
const request   = require('request');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client    = require('twilio')(accountSid, authToken);


require('dotenv').config();


let sendText = (recNum, text) => {
  //Send an text message
  client.sendMessage({
      to: recNum,
      from: '+16467629065',
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


module.exports.sendText = sendText;
