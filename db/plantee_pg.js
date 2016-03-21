/* GLOBAL REQUIRES: See `../server.js` */ 
'use strict';
const pg					= require('pg');
const bcrypt      = require('bcrypt');
const salt        = bcrypt.genSaltSync(10);
require('dotenv').config();
const twil = require('../public/js/twil.js');
const CronJob = require('cron').CronJob;

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
		client.query('INSERT INTO gardeners (name, phone) VALUES ($1, $2)', [req.body.name, req.body.phone], (err, results) => {
			if(err) {
				return console.error('error running query', err);
			}
			let gid = results.rows[0];
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



let startCron = (req, res, next) => {	
	console.log('hit function');
	let sayings = ['Water me.', 'It\'s dark in here, I need sunshine.', 'There are bugs on me, put pesticides on me', 'Water me.', 'Water me.', 'Plantee lonely, send butterfly!', 'Bumblebee sit on my face.', 'I did photosynthesis today.', 'Till my soil.', 'I\'m standing tall'];
	let oldLength = 0;
	let currentTarget = '';
	let caretakers = [];
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
			var friends = results.rows;
			caretakers = friends;
			for(var i = 0; i < friends.length; i++) {
				twil.sendText(friends[i].phone, 'Message from Plantee: Hi, I\'m Plantee. Thanks for buying me.');
			}
		});
	});
	// this function will execute every hour from 9-5 on M/W/T/TH/F
	var job = new CronJob('0 * * * * *', function() {
		// returns # of messages recieved by plantee
		twil.checkMessages(function(length) {
			if (length > oldLength) {
					oldLength = length;
					if(!(caretakers.length === 0)) {
						var target = caretakers[Math.floor(Math.random()*caretakers.length)].phone;
						currentTarget = target;
						var say = sayings[Math.floor(Math.random()*sayings.length)];
						twil.sendText(target, 'Message from Plantee: ' + say);
					}
				} else {
					pg.connect(cs, (err, client, done) => {
						if(err) {
							done();
							console.log(err);
							return res.status(500).json({ success: false, data: err });
						}
						client.query('SELECT name FROM gardeners WHERE phone = $1', [currentTarget], (err, results) => {
							done();
							if(err) {
								return console.error('error running query', err);
							}
							if(results.rows[0].name) {
								var killerNumber = results.rows[0].name;	
								for(var i = 0; i < caretakers.length; i++) {
									twil.sendText(caretakers[i].phone, 'Plantee has been killed by ' + killerNumber);
								}
								job.stop();
							} else {
								oldLength = 0;
							}		
						});
					})
				}
		});
	}, function () {
	    console.log('planteePing stopped.');
	  },
	  true, /* Start the job right now */
	  'America/Los_Angeles' /* Time zone of this job. */
	);
	next();
}

module.exports.startCron = startCron;
module.exports.getAllGardeners = getAllGardeners;
module.exports.findPlantees = findPlantees;
module.exports.addPlantee = addPlantee; 
module.exports.selectMyGardeners = selectMyGardeners;
module.exports.addGardener = addGardener;
module.exports.selectPlanteeMessages = selectPlanteeMessages;
module.exports.addMessage = addMessage;
