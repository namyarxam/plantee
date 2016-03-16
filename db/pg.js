const pgp         = require('pg-promise')({});
const bcrypt      = require('bcrypt');
const salt        = bcrypt.genSaltSync(10);
const session     = require('express-session');

const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'tokens_test',
    user: 'Adam1',
    password: 'Move2core'
};

const db = pgp(cn)

function createSecure(email, password, callback){
  bcrypt.genSalt(password, salt, function(err, hash){
    bcrypt.hash(password, salt, function(err, hash) {
      callback(email, hash)
    })
  })
}



function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser)

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





module.exports.db = db;
module.exports.pgp = pgp;
module.exports.loginUser = loginUser
module.exports.createUser = createUser
