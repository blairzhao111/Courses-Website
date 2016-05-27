"use strict";

const 
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	userSchema = new Schema({
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true,
			enum: ['student', 'instructor']
		}
	}),

	User = mongoose.model('User', userSchema);

module.exports = User;

