var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var {Member, MemberObject} = require('./MemberClass');
// User.basePath = "";

// serialize & deserialize User
passport.serializeUser(function(member, done) {
  	done(null, member);
});
passport.deserializeUser(function(member, done) {
	console.log(member);
    done(null, member);
});

// local strategy
// passport.use('local-login',
//   new LocalStrategy({
//       usernameField : 'memberId',
//       passwordField : 'memberPassword',
//       passReqToCallback : true
//     },
// 	function(req, memberId, memberPassword, done) { //로그인시 호출되는 함수
// 		var member = new Member({memberId: memberId, memberPassword: memberPassword});
// 		member.authenticate().then(isAuth => {
// 			if(isAuth) {
// 				return done(null, user);
// 			} else {
// 				req.flash('memberId', memberId);
// 				req.flash('errors', {login:'Member info is incorrect.'});
// 				return done(null, false);
// 			}
// 		});
      
//     }
//   )
// );

passport.use(new LocalStrategy(
	{
      usernameField : 'memberId',
      passwordField : 'memberPassword'
    },
	async (memberId, memberPassword, done) => {
		try {
			if(!memberId && !memberPassword) {
				var loginMember = new MemberObject();
				var result = await loginMember.authenticate(memberId, memberPassword);
				if(result) {
					return done(null, loginMember);
				} else {
					return done(null, false, { reason: 'Login Failed!' });
				}
			}
		} catch (e) {
			console.log(e)
			return done(e)
		}
	}


	// function(memberId, memberPassword, done) { //로그인시 호출되는 함수
	// 	var member = new Member({memberId: memberId, memberPassword: memberPassword});
	// 	member.authenticate().then(isAuth => {
	// 		if(isAuth) {
	// 			return done(null, member);
	// 		} else {
	// 			return done(null, false, { message: "Login Failed!" });
	// 		}
	// 	});
      
    // }
  )
);

module.exports = function() {
	
	return passport
};
