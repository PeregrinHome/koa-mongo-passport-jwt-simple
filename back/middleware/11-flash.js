const flash = require('koa-better-flash');
exports.init = app => app.use(flash());
