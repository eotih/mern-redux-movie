const AuthRouter = require('./auth.routes');
const CategoryRouter = require('./category.routes');

function route(app) {
    app.use('/auth', AuthRouter);
    app.use('/category', CategoryRouter);
    
}
module.exports = route;