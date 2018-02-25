const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    // User has already had user/password authorized
    // need to give them token

    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error: 'you must provide email and password.'})
    }

    // see if user with given email exists
    // if a user does exist, return an error
    
    User.findOne({email:email}, function(err, existingUser) {
        if(err) {return next(err);}

        if(existingUser) {
            return res.status(422).send({ error: 'email is in use' });
        }

        // if a user with email does not exist, create and save user record
        const user = new User({
            email:email,
            password:password
        });
        

        user.save(function(err) {
            if(err) { return next(err); }

            // respond to requrest indicating the user was created.
            res.json({ token: tokenForUser(user) });
        });
        
    });



}