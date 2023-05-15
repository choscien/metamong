var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var User = require('../User-xml');
User.basePath = "";

// serialize & deserialize User
passport.serializeUser(function(user, done) {
  	done(null, user);
});
passport.deserializeUser(function(user, done) {
	console.log(user);
    done(null, user);
});

// local strategy
passport.use('local-login',
  new LocalStrategy({
      usernameField : 'userId',
      passwordField : 'password',
      passReqToCallback : true
    },
	function(req, userId, password, done) { //로그인시 호출되는 함수
		var user = new User({userId: userId, password: password});
		user.authenticate().then(isAuth => {
			if(isAuth) {
				return done(null, user);
			} else {
				req.flash('userId', userId);
				req.flash('errors', {login:'User info is incorrect.'});
				return done(null, false);
			}
		});
      
    }
  )
);

module.exports = function(basePath) {
	User.basePath = basePath;
	
	return passport
};
