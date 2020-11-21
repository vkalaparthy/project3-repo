const db = require('../models');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {

		db.User.findOne({ 'username': username }).populate('playlist')
			.then((userMatch) => {
				if (!userMatch) {
					return done(null, false, { message: 'Incorrect username' });
				}
				if (!userMatch.checkPassword(password)) {
					return done(null, false, { message: 'Incorrect password' });
				}
				return done(null, userMatch);
		}).catch(err => done(err));
	}
);

module.exports = strategy;
