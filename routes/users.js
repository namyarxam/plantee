'use strict';

var express = require('express');
var db      = require('../db/pg.js');
var users   = express.Router();


/* EXPRESS USER ROUTES */
users.post('/login', db.loginUser, function(req, res) {
	req.session.user = res.rows;
	req.session.save();
})

module.exports = users; 