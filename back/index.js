// Нужно для работы env переменных
require('dotenv').config();
// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed

// Trace - подробно показывает ошибки в консоли и clarify - очищает отображение вызовов в консоли
// В продакшене раскоментировать, иначе нагрузка увеличится в 3 раза
if (process.env.TRACE === "dev") {
    require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();
const config = require('config');

app.keys = [config.get('secret')];

const middleware = require('./middleware/index');
middleware(app);


const passport = require('koa-passport'); //реализация passport для Koa
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT
const jwtsecret = config.get('secret'); // ключ для подписи JWT
// const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
// const crypto = require('crypto');
app.use(passport.initialize()); // сначала passport

const mongoose = require('mongoose');
mongoose.Promise = Promise;
// const ObjectId = mongoose.Types.ObjectId;
mongoose.connect(config.mongoose.uri);

if (process.env.MONGOOSE_DEBUG === "debug") {
    mongoose.set('debug', true);
}

const User = require('./models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async function (email, password, done) {
        console.log('LocalStrategy', email, password);
        let user = await User.findOne({email: email});

        if(!!user && user.checkPassword(password)){
            // Пользователь найден
            done(null, user);
        }else{
            // Пользователь не найден
            done(null, false, { message: 'Нет такого пользователя или пароль неверен.'});
        }
    }
    )
);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
    console.log('JwtStrategy', jwt_payload);
    let user = await User.findOne({email: jwt_payload.email});

    console.log('JwtStrategy user', user);

    if(!!user){
        // Пользователь найден
        done(null, user);
    }else{
        // Пользователь не найден
        done(null, false, { message: 'Ошибка авторизации'});
    }
    })
);

const router = require('./routers/index');

app.use(router.routes());// потом маршруты

app.listen(config.get('port'));
