"use strict";

const 
	User = require('./../models/User.js'),
	flash = require('connect-flash'),
	express = require('express'),
	router = express.Router();

router.get('/', function(req, res){
	res.render('index.handlebars', {
		layout: null,
		message: req.flash('index')
	});
});

router.post('/login', function(req, res){
	var 
		email = req.body.email,
		ps = req.body.password; 

	//check both format
	console.log(email);
	console.log(ps);

	//look up at db
	User.findOne({email: email}, function(err, user){
		if(err){
			res.status(500).render('500');
		}

		if(user){

		}else{
			req.flash("index","invalid email");
			res.redirect(303,'/');
		}
	});
});

router.post('/signup', function(req, res){
	let
		firstName = req.body.firstName,
		lastName = req.body.lastName,
		email = req.body.email,
		password = req.body.password,
		password_v = req.body.password_v,
		role = req.body.role;

		console.log(req.body.firstName);
	//verify email
	//verify password
	//verify all required fields

	let user = {
		email: email,
		password: password,
		firstName: firstName,
		lastName: lastName,
		role: role
	};

	res.json(user);
});

module.exports = router;