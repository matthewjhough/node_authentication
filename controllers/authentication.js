const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const config = require("../config");
const { Model: User } = require("../models/User");

const saltRounds = 10;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had user/password authorized
  // need to give them token

  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  console.log(req, res);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "you must provide email and password." });
  }

  bcrypt
    .hash(password, saltRounds)
    .then(hash => {
      // Store hash in your password DB.
      // see if user with given email exists

      User.findOne({ where: email })
        .then(exists => {
          // if a user does exist, return an error
          if (exists) {
            return res.status(422).send({ error: "email is in use" });
          }

          // if a user with email does not exist, create and save user record
          User.create({
            email: email,
            password: hash
          }).then((usr, err) => {
            if (err)
              res.json({
                status: 500,
                msg: "something went wrong with this request."
              });

            // respond to requrest indicating the user was created.
            res.json({ token: tokenForUser(usr) });
          });
        })
        .catch(err => {
          res.json({ status: 500, msg: "Could not retrieve users." });
        });
    })
    .catch(err => {
      if (err) {
        return next(err);
      }
    });
};
