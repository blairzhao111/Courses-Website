#!/usr/bin/nodemon --harmony
"use strict";

/**
 * Module dependencies
*/
const 
	express = require('express'),
	mongoose = require('mongoose'),	
	// set up handlebars view engine
	handlebars = require('express3-handlebars')
	.create({ 
		defaultLayout: 'main',
	    helpers: {
	        section: function(name, options){
	            if(!this._sections) this._sections = {};
	            this._sections[name] = options.fn(this);
	            return null;
	        }
    	}
	}),
	path = require('path'),
	config = require('./lib/config.js');

//get application context from express
const app = express();

/**
 *	Application Configuration and Environment:
*/

app.set('port', process.env.PORT || 3000);

//views configuration
app.engine('handlebars', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', handlebars);

//configure mongodb connections
if(app.get('env') === "development"){

/*	mongoose.connect(config.mongo.development.connection,config.mongo.development.options);

	var mongodb = mongoose.connection;
	mongodb.on('error',function(err){
		console.error(err);
	});
	mongodb.once('open', function(){
		console.log("Mongodb is online");
	});*/

}else if(app.get('env') === 'production'){

	mongoose.connect(config.mongo.production.connection,config.mongo.production.options);

}else{

	throw new Error("Unknown execution environment: " + app.get('env'));

}

/**
 *	Application Middlewares:
*/

//specify middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('express-session')({
	secret: config.cookieSecret,
	resave: false,
	saveUninitialized: true
}));
app.use(require('connect-flash')());

//specify enabled middlewares in different environment.
if(app.get('env') === "development"){

	app.use(function(req, res, next){
		res.locals.showTests = true;
		next();
	});	

}else if(app.get('env') === 'production'){

}else{
	throw new Error("Unknown execution environment: " + app.get('env'));
}

/**
 *	Application Routings:
*/
app.use(require('./routes/index.js'));

app.get('/about', function(req, res){

	res.render('about.handlebars');
});

/**
 *	Error Handling:
*/

//catch-all-handling middleware, 404 error handler
app.use(function(req, res, next){
	res.status(404);
	res.render('404.handlebars');
});

//error-handling middleware, 500 error handler
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500.handlebars');
});


//server starts, and is listening on port 3000 by default for incomming connection.
app.listen(app.get('port'), function(){
	console.log("Server is online and listening at port " + app.get('port') +"...");
});
