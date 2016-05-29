"use strict";

const 
	User = require('./../models/User.js'),
	flash = require('connect-flash'),
	express = require('express'),
	router = express.Router();


router.get('/', function(req, res){

	res.render('index.handlebars', {
		layout: null,
		"message-login": req.flash('message-login'),
		"message-join": req.flash('message-join'),
		"message-contact": req.flash('message-contact') 
	});
});

router.post('/login', function(req, res){
	var 
		email = req.body.email,
		ps = req.body.password; 

	//check both format

	var user = {
		"email": "jzhao34@buffalo.edu",
		"password": "zjw1992111"
	};

	if(user.email === email){
		if(user.password === ps){
			res.send("login successful");
		}else{
			req.flash('message-login','Invalid password');
		}
	}else{
		req.flash('message-login', 'Invalid email');
	}

	res.redirect(303,'/');

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

router.post('/join', function(req, res){
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

router.post('/contact', function(req, res){
	let message = req.body.contactMessage;
	//store the message
	
	req.flash('message-contact', 'Your message was submitted successful!');

	res.redirect(303,'/');
});

module.exports = router;