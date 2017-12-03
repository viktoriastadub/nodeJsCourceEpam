var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const users = [{
    email: 'vika@stadub.com',
    name: 'Vika',
    password: '1234'
}];

passport.use(new Strategy((email, password, cb) => {
    const user = users.find(user => user.email === email);
    if (!user) {
        return cb({success: false, message: USER_NOT_FOUND}, null)
    }
    if (user.password !== password) {
        return cb({success: false, message: PASS_NOT_FOUND}, null)
    }
    cb(null, user)

}));
passport.serializeUser((user, cb) => {
    cb(null, user.email);
});

passport.deserializeUser((email, cb) =>{
    const user = users.find(user => user.email === email);
    if(!user){
        return cb('Error',null);
    }
    cb(null, user.email);
});

export default passport;