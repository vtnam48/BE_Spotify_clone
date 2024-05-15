const route = require('express').Router()
const historyController = require('../controllers/history.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')


route.get('/history/',middleware.verifyToken, catchAsync(historyController.getHistory))
route.post('/history/create/artist', middleware.verifyToken, catchAsync(historyController.createArtistHistory))
route.post('/history/create/album', middleware.verifyToken, catchAsync(historyController.createAlbumHistory))
route.post('/history/create/playlist', middleware.verifyToken, catchAsync(historyController.createPlaylistHistory))
route.delete('/history/delete/artist', middleware.verifyToken, catchAsync(historyController.deleteArtistHistory))
route.delete('/history/delete/album', middleware.verifyToken, catchAsync(historyController.deleteAlbumHistory))
route.delete('/history/delete/playlist', middleware.verifyToken, catchAsync(historyController.deletePlaylistHistory))
route.delete('/history/delete/all', middleware.verifyToken, catchAsync(historyController.deleteAllHistory))
// route.put('/genre/:id', middleware.verifyToken, catchAsync(genreController.updateGenreById))

module.exports = route

