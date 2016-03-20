/* GLOBAL REQUIRES: See `../server.js` */ 
'use strict';
const pg					= require('pg');
const bcrypt      = require('bcrypt');
const salt        = bcrypt.genSaltSync(10);
require('dotenv').config();

/* Connection to our back-end postgreSQL database */
const cs = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/project3`;

let findPlantees = (req, res, next) => {
	pg.connect(cs, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}
		client.query('SELECT user_id as plantee_id phone, plantee_hp FROM users', (err, results) => {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			res.rows = results.rows;
			next();
		});
	});
}

let addPlantee = (req, res, next) => {
	pg.connect(cs, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}
		client.query('INSERT INTO users (phone, plantee_hp) VALUES ($1, 100)', [req.body.phone], (err, results) => {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			next();
		});
	});
}

let getAllGardeners = (req, res, next) => {
	pg.connect(cs, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}
		client.query('SELECT * FROM gardeners;', (err, results) => {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			res.rows = results.rows;
			next();
		});
	});
}

let selectMyGardeners = (req, res, next) => {
	pg.connect(cs, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}
		client.query(`SELECT g.name, g.phone FROM gardener g
									LEFT JOIN  users_gardeners ug
									ON  g.gardener_id = ug.gardener_id
									WHERE ug.user_id = $1`, [req.params.id], (err, results) => {
										done();
										if(err) {
											return console.error('error running query', err);
										}
										res.rows = results.rows;
										next();
									});
	});
}

let addGardener = (req, res, next) => {
	pg.connect(cs, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}
		client.query('INSERT INTO gardeners (name, phone) VALUES ($1, $2) RETURNING gardener_id', [req.body.name, req.body.phone], (err, results) => {
			if(err) {
				return console.error('error running query', err);
			}
			let gid = results.rows[0];
		});
		client.query('INSERT INTO users_gardener (gardener_id, user_id) VALUES ($1, $2)', [gid, req.query.user_id], (err, results) => {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			next();
		});
	});
}

let selectPlanteeMessages = (req, res, next) => {
	pg.connect(cs, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}
		client.query(`SELECT m.body FROM messages m
									LEFT JOIN users_messages um
									ON m.message_id = um.message_id
									WHERE um.userid_id = $1`, [req.body.user_id], (err, results) => {
										done();
										if(err) {
											return console.error('error running query', err);
										}
										res.rows = results.rows;
										next();
									});
	});
}

let addMessage = (req, res, next) => {
		pg.connect(cs, (err, client, done) => {
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}
		client.query('INSERT INTO messages (body) VALUES ($1) RETURNING message_id', [req.body.text], (err, results) => {
			if(err) {
				return console.error('error running query', err);
			}
			let mid = results.rows[0];
		});
		client.query('INSERT INTO users_messages (gardener_id, user_id) VALUES ($1, $2)', [mid, req.query.user_id], (err, results) => {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			next();
		});
	});
}

let addPresentation = (req, res, next) => {
	console.log('do this later');
}

module.exports.addPresentation = addPresentation;
module.exports.getAllGardeners = getAllGardeners;
module.exports.findPlantees = findPlantees;
module.exports.addPlantee = addPlantee; 
module.exports.selectMyGardeners = selectMyGardeners;
module.exports.addGardener = addGardener;
module.exports.selectPlanteeMessages = selectPlanteeMessages;
module.exports.addMessage = addMessage;
