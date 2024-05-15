const route = require('express').Router()
const songGenreController = require('../controllers/songGenre.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')

route.get('/songGenre/all', catchAsync(songGenreController.getAllSongGenres))
//route.get('/songGenre/:genreId/:genreId', catchAsync(songGenreController.getSongGenreByIds))
route.get('/songGenre/songId/:id', catchAsync(songGenreController.getSongGenreBySongId))
route.get('/songGenre/genreId/:genreId', catchAsync(songGenreController.getSongByGenreId))
route.post('/songGenre', middleware.verifyToken, catchAsync(songGenreController.createSongGenre))
route.put('/songGenre/:id', middleware.verifyToken, catchAsync(songGenreController.updateSongGenreByIds))
route.delete('/songGenre/:id', middleware.verifyToken, catchAsync(songGenreController.deleteSongGenreByIds))

module.exports = route