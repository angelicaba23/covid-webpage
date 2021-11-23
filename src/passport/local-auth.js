const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local-singup', new LocalStrategy({
    usernameField: 'user', 
    passwordField: 'password',
    passReqToCallback: true
}, (req, user, password, done) =>{

}));