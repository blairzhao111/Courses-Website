#!$(which nodejs) --harmony

"use strict";

const 
	express = require('express'),
	handlebars = require('express3-handlebars').create({ defaultLayout: 'main' }),
	morgan = require('morgan'),

	app = express();

//views configuration
app.engine('handlebars', handlebars.engine);
app.set('view engine', handlebars);

//specify middlewares
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));


app.get('/', function(req, res){
	res.render('index.handlebars');
});

//404 handler
app.use(function(req, res, next){
	res.status(404);
	res.render('404.handlebars');
});

//500 handler
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500.handlebars');
});


app.listen(3000, function(){
	console.log("Server is online and listening at port 3000...");
});
