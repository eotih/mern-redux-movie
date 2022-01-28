const AuthRouter = require('./auth.routes');
const CategoryRouter = require('./category.routes');
const ActorRouter = require('./actor.routes');
const MovieRouter = require('./movie.routes');
const UserRouter = require('./user.routes');

function route(app) {
    app.use('/auth', AuthRouter);
    app.use('/category', CategoryRouter);
    app.use('/actor', ActorRouter);
    app.use('/movie', MovieRouter);
    app.use('/user', UserRouter);
}
module.exports = route;