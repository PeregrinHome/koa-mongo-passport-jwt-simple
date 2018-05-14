const config = require('config');
const path = require('path');
const passport = require('koa-passport');

const root = config.get('root');
const { User } = require(path.join(root, 'models'));

// Паспорт напрямую с базой не работает
// Метод ниже: У паспорта есть объект пользователя, нужно что то записать в сессию.
// Тут мы указываем, какой у него будет ключ, что положить в сессию.
passport.serializeUser(function(user, done) {
  done(null, user.email); // Можно вернуть: id пользователя, email, что то уникальное
});

// Метод ниже: В объекте сессии лежит ключ, и паспорт разворачивает его в целого пользователя.
passport.deserializeUser(function(email, done) {
  User.findOne({email:email}, done); // callback version checks id validity automatically
});
