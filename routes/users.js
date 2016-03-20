/* GLOBAL REQUIRES - SEE `../../server.js` */
'use strict';
require('dotenv').config();
const express = require('express');
const db = require('../db/users_pg');
/* SECRET: Used to manipulate token generation to our secret to increase security */
const secret = process.env.SECRET;
/* EXPRESSJWT: Allows for web tokens to be used in express web app's */
const expressJWT = require('express-jwt');
/* USERS: Express router initialization to allow this route to serve as '/users' */
const users = express.Router();
/* JWT: JSONWebToken - Front-end user auth module */
const jwt = require('jsonwebtoken');

users.route('/')
  // Obtain user information
  .get((req, res) => {
    res.json({data: 'success'});
  })
  // Create user & store in database
  .post(db.createUser, (req, res) => {
    res.status(201).json({data: 'success'});
  })


users.route('/createaccountscreen')
  // Path for user account creation view
  .get((req, res) => {
    res.json({data: 'success'});
  })

users.route('/me')
  // Show information of logged in user
  .post((req, res) => {
    let user = jwt.sign(req.headers.authorization, secret);
    res.json({data: 'success', agent: user});
  })

users.route('/login')
  // User login functionality - checks credentials with database
  .post(db.loginUser, (req, res) => {
    let token = jwt.sign(res.rows, secret);
    res.json({agent: res.rows, token: token});
  })

module.exports = users;
