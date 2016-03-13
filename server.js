'use strict';

/* REQUIRES */
require('dotenv').config();

const path 					 = require('path');
const pg 						 = require('pg');
const express 		   = require('express');
const morgan 			   = require('morgan');
const bodyParser 		 = require('body-parser');
const db 					   = require('./db/pg.js');
const request 			 = require('request');
const methodOverride = require('method-override');
const session 			 = require('express-session');
const favicon				 = require('serve-favicon');
const pgSession 		 = require('connect-pg-simple')(session);
const userRoutes     = require('./routes/users');

const app = express();

/* PSQL Connection */
const config = {

}

/* ROUTE PATHS */
app.use('/users', userRoutes);

// const ROUTENAME = require(path.join(__dirname, 'routes', 'ROUTENAME'));

/* EXPRESS SESSIONS */
app.use(session({
	store: new pgSession({
		pg: pg,
		conString: config,
		tablename: 'session'
	}),
	secret: 'Porzingis',
	resave: false,
	cookie: { maxAge: 30 * 24 * 60 * 1000 } // 30 day cookie
}));

/* EXPRESS-APP USAGE */
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(methodOverride('_method'));

/* VIEW ENGINE DECLARATION */
app.set('views', './views');
app.set('view engine', 'ejs');

/* EXPRESS ROUTES */
app.get('/', (req, res) => {
	res.render('home.ejs');
});

/* SERVER CONFIGURATION */
const port 	 = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server initialized on // ${new Date()}`));





