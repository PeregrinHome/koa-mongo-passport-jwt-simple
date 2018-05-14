const Router = require('koa-router');

const router = new Router();
const passport = require('passport');
const defaultController = require('../controllers/defaultController');
const authController = require('../controllers/authController');

// TODO: Формирую роуты для проверки паспорта
router.get('/', defaultController.index.get);
router.post('/login', authController.login.post);
router.post('/registration', authController.registration.post);
router.get('/home', authController.home.get);

module.exports = router;