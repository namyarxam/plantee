'use strict';

const express = require('express');
const db      = require('../db/pg.js');
const users   = express.Router();


/* EXPRESS USER ROUTES */
users.post('/login', db.loginUser, (req, res) => {
	req.session.user = res.rows;
	req.session.save();
})

module.exports = users; 