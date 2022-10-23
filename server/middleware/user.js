const { validation, error } = require('../model/responseModel');
const db = require('../lib/db');
const jwt = require('jsonwebtoken');

module.exports = {
    validateFields: (req, res, next) => {
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(422).json(validation({
                username: 'Please enter username minimum 3 characters'
            }))
        }
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(422).json(validation({
                password: 'Please enter password minimum 6 characters'
            }))
        }
        if (!req.body.confirmpassword || req.body.password !== req.body.confirmpassword) {
            return res.status(422).json(validation({
                password: 'Password and confirm password should match'
            }))
        }
        next();
    },
    validateUser: (req, res, next) => {
        if (typeof req.headers.authorization === 'undefined' || req.headers.authorization === null || req.headers.authorization == '') {
            return res.status(422).json(validation({
                message: 'Authorization token required!'
            }))
        } else {
            if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
                jwt.verify(req.headers.authorization.split(' ')[1], 'SECRETKEY', (err, decode) => {
                    if (err) {
                        return res.status(500).json(error(err, 500));
                    }
                    db.query(`SELECT id FROM users WHERE id = '${decode.userId}'`, (err, result) => {
                        if (err) {
                            return res.status(500).json(error(err, 500));
                        }
                        if (typeof result === 'undefined' || result === null || result === "" || result.length === 0) {
                            return res.status(422).json(validation({
                                message: 'Invalid authorization token!'
                            }))
                        }
                    });
                })
            } else {
                return res.status(422).json(validation({
                    message: 'Invalid authorization token!'
                }))
            }
        }
        next();
    }
}