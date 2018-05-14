
// request/response logger
const json = require('koa-json');

exports.init = app => app.use(json());
