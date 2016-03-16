const express     = require('express');
const users       = express.Router();
const db          = require('../db/pg');
const secret      = 'porzingis';
const expressJWT  = require('express-jwt');
const jwt         = require('jsonwebtoken')

users.route('/')
  .get((req, res)=>{
    res.json({data: 'success'})
  })
  .post(db.createUser, (req, res)=>{
    res.status(201).json({data: 'success'});
  })


  users.route('/createaccountscreen')
    .get((req, res)=>{
      res.json({data: 'success'})
    })

users.route('/me')
  .post((req, res)=>{
    var user = jwt.sign(req.headers.authorization, secret)
    res.json({data: 'success', agent: user})
  })

users.route('/login')
  .post(db.loginUser, (req, res)=>{
    var token = jwt.sign(res.rows, secret)
    res.json({agent: res.rows, token: token})
  })



module.exports = users;
