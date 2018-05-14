module.exports = function (app) {
    require('./03-logger').init(app);
    require('./05-errors').init(app);
    require('./06-json').init(app);
    require('./07-bodyParser').init(app);
    require('./11-flash').init(app);
};