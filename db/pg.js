/* GLOBAL REQUIRES: See `../server.js` */
const pgp         = require('pg-promise')({});
const bcrypt      = require('bcrypt');
const salt        = bcrypt.genSaltSync(10);
require('dotenv').config();

/* Connection to our back-end postgreSQL database */
const cn = {
    host: 'localhost', // 'localhost' is the default
    port: 5432, // 5432 is the default
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

/* Create link from PGP to our database */
const db = pgp(cn)






/* CREATESECURE: Uses bcrypt, hash, salt, to create hash for database storage */
function createSecure(email, password, callback){
  bcrypt.genSalt(password, salt, function(err, hash){
    bcrypt.hash(password, salt, function(err, hash) {
      callback(email, hash)
    })
  })
}

/* Creates user from HTML input fields and stores them in the database using createSecure for password_digest */
function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser)
  // saveUser: Query to store user in database
  function saveUser(email, hash) {
    db.none('INSERT INTO users (email, password_digest) VALUES ($1, $2) returning *', [email, hash])
    .then((data)=>{
      next()
    })
    .catch(()=>{
      console.log('error signing up')
      next()
    })
  }
}

/* Checks username and email given in HTML input field with database credentials */
function loginUser(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  db.one('SELECT * FROM users WHERE email LIKE ($1);', [email])
    .then((data)=>{
      console.log(data)
      if (bcrypt.compareSync(password, data.password_digest)){
        res.rows = data
        next()
      }
      res.status(401).json({data: "password and email do not match"})
        next()
    })
    .catch(()=>{
      console.error('error finding users')
    })
}

//Adding friends to the database

function listAllFriends(req, res, next){

  db.any("SELECT * FROM friends;")
    .then(function (data) {
      res.rows = data;
      next();
    })
    .catch(function (error) {
      console.log('Error', error);
    });
}

function addFriend(req, res, next){
  db.one("INSERT INTO friends (friend_name, phone_number) VALUES ($1, $2) RETURNING friend_name, phone_number;", [req.body.friend_name, req.body.phone_number])
  .then((data)=>{
    console.log('ADDED FRIEND SUCCESSFUL');
    res.rows = data;
    next();
  })
  .catch((error)=>{
    console.log('ERROR in ADDING FRIEND!', error);
  })
}














/* Exports: allows below to be seen outside of this file */
module.exports.db = db;
module.exports.pgp = pgp;
module.exports.addFriend = addFriend
module.exports.listAllFriends = listAllFriends

module.exports.loginUser = loginUser
module.exports.createUser = createUser
