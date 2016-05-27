"use strict;"

exports.cookieSecret = 'Secret is nothing but secret';

exports.mongo = {
	development: {
		connection: 'mongodb://localhost/website',
		options: {
			server: {
				socketOptions: { keepAlive: 1}				
			}
		}
	},
	production: {
		connection: '',
		options: {
			config: {
				autoIndex: false
			}
		}
	}
};