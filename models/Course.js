"use strict";

const 
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	courseSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		credit: {
			type: Number,
			required: true,
			min: 1,
			max: 5
		}
	}),

	Course = mongoose.model('course', courseSchema);

module.exports = Course;