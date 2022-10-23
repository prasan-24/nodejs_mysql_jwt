const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { success, error, validation } = require('../model/responseModel');

const db = require('../lib/db');

exports.userSignUp = async (req, res) => {
    db.query(`SELECT id FROM users WHERE username = '${req.body.username}'`, (err, result) => {
        if (result.length > 0) {
            return res.status(422).json(validation({
                username: 'This username is already in exist!'
            }))
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json(error(err, 500))
                } else {
                    db.query(`INSERT INTO users (id, username, password, created_date, isDeleted) VALUES ('${uuid.v4()}',${db.escape(req.body.username)},'${hash}',now(), 0);`),
                        (err, result) => {
                            if (err) {
                                return res.status(400).json(error(err, 400))
                            } else {
                                return res.status(201).json(success('Registered successfully', result, 201));
                            }
                        }
                }
            })
        }
    })
}

exports.userLogin = (req, res) => {
    db.query(`SELECT * FROM users WHERE username= ${db.escape(req.body.username)};`,
        (err, result) => {
            if (err) {
                return res.status(500).json(error(err, 500));
            }
            if (!result.length) {
                return res.status(400).json(error({
                    message: 'Username or password incorrect!'
                }, 400))
            }

            bcrypt.compare(req.body.password, result[0]['password'], (berr, bresult) => {
                if (berr) {
                    return res.status(400).json(error({
                        message: 'Username or password incorrect!'
                    }, 400))
                }
                if (bresult) {

                    const token = jwt.sign({
                        userId: result[0].id
                    }, "SECRETKEY", { expiresIn: 86400 });

                    result[0]['accessToken'] = token;

                    return res.status(201).json(success('Logged In!', result, 201));
                }
                return res.status(400).json(error({
                    message: 'Username or password incorrect!'
                }, 400))
            })
        })
}