const User = require('../modules/user.module');

module.exports = {
    registration: (req, res) => {
        User.registration(req).then((result) => {
            res.status(200).send(result).end();
        });
    },

    login: (req, res) => {
        User.login(req).then((result) => {
            res.status(200).send(result).end();
        });
    },
};