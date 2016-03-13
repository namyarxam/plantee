'use strict';

/* REQUIRES */
const pg      = require('pg');
const bcrypt  = require('bcrypt');
const salt    = require('salt');
const session = require('express-session');

/* PSQL Connection */
const config = {

}

/* SESSION ROUTES */
let loginUser = (req, res, next) => {
	let email 	 = req.body.email;
	let password = req.body.password;

	pg.connect(config, (err, client, done) => {
		// Handle connection errors.
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err })
		}
		client.query('SELECT * FROM users WHERE email lIKE $1;',
								[email],
								(err, results) => {
									done();
									if (err) {
										return console.error('error running query', err);
									}
									if (results.rows.length === 0) {
										res.status(204).json({ success: true, data: 'no content' });
									} else if (bcrypt.compareSync(password, results.rows[0].password_digest)) {
										res.rows = results.rows[0];
										next();
									}
								});
	});
}

let createSecure = (email, password, callback) => {
	// Hashing the password given by the user @ signup.
	bcrypt.genSalt((err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			// This callback saves the user to our DB w/ the hashed password. 
			callback(email, hash);
		})
	})
}

let createUser = (req, res, next) => {
	createSecure(req.body.email, req.body.password, saveUser);

	let saveuser = (email, hash) => {
		pg.connect(config, (err, client, done) => {
			// Handle connection errors. 
			if (err) {
				done();
				console.log(err);
				return res.status(500).json({ success: false, data: err});
			}
			client.query('INSERT INTO users (email, password_digest) VALUES ($1, $2);',
									[email, hash],
									(err, results) => {
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