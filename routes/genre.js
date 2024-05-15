const route = require('express').Router()
const genreController = require('../controllers/genre.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')


route.get('/genre/getAll', catchAsync(genreController.getAllGenres))
route.get('/genre/:id', catchAsync(genreController.getGenreById))
route.get('/genre/:name', catchAsync(genreController.getGenreByName))
route.post('/genre', middleware.verifyToken, catchAsync(genreController.createGenre))
route.put('/genre/:id', middleware.verifyToken, catchAsync(genreController.updateGenreById))
route.delete('/genre/:id', middleware.verifyToken, catchAsync(genreController.deleteGenreById))

module.exports = route

