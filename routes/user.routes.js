const userController = require('../controllers/user.controller');
module.exports = applyUserRoutes = (app) => {
    app.post('/register', userController.registration),
        app.post('/login', userController.login);
    app.get('/', (req, res) => {
        res.send("hello world");
    });
    return app;
};