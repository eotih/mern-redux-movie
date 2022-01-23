const AuthRouter = require('./auth.routes');

function route(app) {
    app.use('/auth', AuthRouter);
}
module.exports = route;