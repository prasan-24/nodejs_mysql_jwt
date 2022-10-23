const express = require('express');
const router = express.Router();

const userMiddleware = require('../middleware/user');

const { addMoviesDetails, editMoviesDetails, deleteMoviesDetails } = require('../controller/movieController');

//Add Movie Details End Point

router.post('/add/movie-details', userMiddleware.validateUser ,addMoviesDetails);


//Edit Movie Details End Point

router.post('/edit/movie-details', userMiddleware.validateUser , editMoviesDetails);

//Delete Movie Details End Point

router.post('delete/movie-details', userMiddleware.validateUser , deleteMoviesDetails)


module.exports = router;