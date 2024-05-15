const route = require('express').Router()
const favoriteController = require('../controllers/favorite.controller')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')

route.post('/favorite/create/song', middleware.verifyToken, catchAsync(favoriteController.createFavoriteSong))
route.post('/favorite/create/artist', middleware.verifyToken, catchAsync(favoriteController.createFavoriteArtist))
route.post('/favorite/create/album', middleware.verifyToken, catchAsync(favoriteController.createFavoriteAlbum))
route.post('/favorite/create/playlist', middleware.verifyToken, catchAsync(favoriteController.createFavoritePlaylist))

module.exports = route

