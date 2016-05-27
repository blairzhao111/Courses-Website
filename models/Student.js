"use strict";

const 
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	studentSchema = new Schema({
		_id: {
			type: String,
			require: true,
			unique: true
		}
		name: {
			first: {
				type: String,
				required: true
			},
			middle: {
				type: String,
			},
			last: {
				type: String,
				required: true
			}
		},
		major: {
			type: String,
			required: true
		},
		level: {
			type: String,
			required: true,
			enum: ['undergraduate','graduate']
		}
		phone: String
	}),

	Student = mongoose.model('Student', studentSchema);

module.exports = Student;