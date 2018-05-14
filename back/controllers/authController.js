const User = require('../models/user');
const config = require('config');
// const pick = require('lodash/pick');
const login = {}, registration = {}, home = {};
const passport = require('passport');
const jwt = require('jsonwebtoken'); // аутентификация по JWT для http
const jwtsecret = config.get('secret'); // ключ для подписи JWT

login.post = async function(ctx, next) {
    await passport.authenticate('local', function (err, user) {
        console.log('authenticate', user);
        if (user === false) {
            ctx.body = "Login failed";
        } else {
            ctx.body = {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()};
        }
    })(ctx, next);
};
registration.post = async function(ctx, next) {
    let user = await User.create(ctx.request.body);
    ctx.body = user.toWeb();
};
home.get = async function(ctx, next) {
    await passport.authenticate('jwt', function (err, user, message) {
        if (user == false) {
            ctx.body = "Login failed";
        } else {
            ctx.body = {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()};
        }
    })(ctx, next);
};

module.exports = {
    login,
    registration,
    home
};

