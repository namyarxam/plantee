'use strict';

/* REQUIRES */
var pg      = require('pg');
var bcrypt  = require('bcrypt');
var salt    = require('salt');
var session = require('express-session');

/* PSQL Connection */
var config = {

}

/* SESSION ROUTES */
function loginUser(req, res, next) {
	var email 	 = req.body.email;
	var password = req.body.password;

	pg.connect(config, function(err, client, done) {
		// Handle connection errors.
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err })
		}
		client.query('SELECT * FROM users WHERE email lIKE $1;',
								[email],
								function(err, results) {
									done();
									if(err) {
										return console.error('error running query', err);
									}
									if(results.rows.length === 0) {
										res.status(204).json({ success: true, data: 'no content' });
									} else if(bcrypt.compareSync(password, results.rows[0].password_digest)) {
										res.rows = results.rows[0];
										next();
									}
								});
	});
}

function createUser(email, password, callback) {
	// Hashing the password given by the user @ signup.
	bcrypt.genSalt(function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			// This callback saves the user to our DB w/ the hashed password. 
			callback(email, hash);
		})
	})
}

function createUser(req, res, next) {
	createSecure(req.body.email, req.body.password, saveUser);

	function saveUser(email, hash) {
		pg.connect(config, function(err, client, done) {
			// Handle connection errors. 
			if (err) {
				done();
				console.log(err);
				return res.status(500).json({ success: false, data: err});
			}
			client.query('INSERT INTO users (email, password_digest) VALUES ($1, $2);',
									[email, hash],
									function (err, results) {
										done();
										if(err) {
											return console.error('error running query', err);
										}
										next();
									});
		});
	}
}

module.exports.createUser = createUser;
module.exports.loginUser  = loginUser;