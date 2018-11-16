const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const config = require("../config");
const { Model: User } = require("../models/User");

// Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findAll({
    limit: 1,
    attributes: ["email", "password"],
    where: { email }
  })
    .then(entries => {
      const user = entries[0];
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function(err, isMatch) {
        // res == true
        if (err) return done(err);
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
    })
    .catch(err => done(err));
});

// setup options for JWT Strategy.
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

// Create JWT Strategy.
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if user ID in the payload exists in our database
  // if it does call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub)
    .then(user => {
      // user will be an instance of User and stores the content of the table entry
      // if such an entry is not defined you will get null
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      if (err) return done(err, false);
    });
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy.
passport.use(jwtLogin);
passport.use(localLogin);
