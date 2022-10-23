const uuid = require('uuid');
const { success, error, validation } = require('../model/responseModel');
const db = require('../lib/db');

exports.addMoviesDetails = (req, res) => {
    db.query(`SELECT id FROM movies WHERE movie_name = '${req.body.movie_name}'`, (err, result) => {
        if (result.length > 0) {
            return res.status(422).json(validation({
                movie_name: 'Movie name is already in exist!'
            }))
        } else {
            db.query(`INSERT INTO movies (id, movie_name, rating, cast, genre, release_date, isDeleted) VALUES ('${uuid.v4()}',${db.escape(req.body.movie_name)},${db.escape(req.body.rating)}, ${db.escape(req.body.cast)}, ${db.escape(req.body.genre)}, ${db.escape(req.body.release_date)}, 0);`),
                (err, result) => {
                    if (err) {
                        return res.status(400).json(error(err, 400))
                    } else {
                        return res.status(201).json(success('Movie added successfully', result, 201));
                    }
                }
        }
    })
}

exports.editMoviesDetails = (req, res) => {
    db.query(`SELECT id FROM movies WHERE id = '${req.params.id}'`, (err, result) => {
        if (result.length > 0) {
            return res.status(422).json(validation({
                message: 'Id is not valid!'
            }))
        } else {
            db.query(`UPDATE movies SET movie_name=${db.escape(req.body.movie_name)}, rating=${db.escape(req.body.rating)}, cast=${db.escape(req.body.cast)}, genre=${db.escape(req.body.genre)}, release_date=${db.escape(req.body.release_date)} WHERE id = '${req.params.id}';`),
                (err, result) => {
                    if (err) {
                        return res.status(400).json(error(err, 400))
                    } else {
                        return res.status(201).json(success('Movie Details Update Successfully', result, 201));
                    }
                }
        }
    })
}

exports.deleteMoviesDetails = () => {
    db.query(`SELECT id FROM movies WHERE id = '${req.params.id}'`, (err, result) => {
        if (result.length > 0) {
            return res.status(422).json(validation({
                message: 'Id is not valid!'
            }))
        } else {
            db.query(`UPDATE movies SET isDeleted=1 WHERE id = '${req.params.id}';`),
                (err, result) => {
                    if (err) {
                        return res.status(400).json(error(err, 400))
                    } else {
                        return res.status(201).json(success('Movie Details Deleted Successfully', result, 201));
                    }
                }
        }
    })
}