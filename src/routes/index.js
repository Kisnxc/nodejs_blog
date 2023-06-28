// const newRouter = require('./news');
const meRouter = require('./me');
const idolsRouter = require('./idol');
const siteRouter = require('./site');
const authRouter = require('./auth');
const {checkUser} = require('../app/middlewares/authMiddleware');


function route(app) {
    // app.use('/news', newRouter);
    app.get('*', checkUser);
    app.use('/me', meRouter);
    app.use('/idols', idolsRouter);   
    app.use('/', siteRouter);
    app.use('/auth', authRouter);

    
}

module.exports = route;
