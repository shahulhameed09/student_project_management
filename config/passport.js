const LocalStrategy = require('passport-local').Strategy;
const alert = require('alert')


// Load User model
const User = require('../models/Users');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'USN_OR_EID'
    }, (USN_OR_EID, password, done) => {
      // Match user
      User.findOne({
        USN_OR_EID: USN_OR_EID
      }).then(user => {
        if (!user) {
           alert('Invalid Credentials')
        }

        if (password === user.password1) {
          return done(null, user);
        } else {
          alert('Invalid Credentials')
        }
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
