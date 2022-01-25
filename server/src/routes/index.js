const AuthRouter = require('./auth.routes');
const CategoryRouter = require('./category.routes');
const ActorRouter = require('./actor.routes');

function route(app) {
    app.use('/auth', AuthRouter);
    app.use('/category', CategoryRouter);
    app.use('/actor', ActorRouter);
}
module.exports = route;