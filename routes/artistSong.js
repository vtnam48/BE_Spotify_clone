const route = require('express').Router()
const artistSongController = require('../controllers/artistSong.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')

route.get('/artistSong/all', catchAsync(artistSongController.getAllArtistSongs))
route.get('/artistSong/:artistId/:artistId', catchAsync(artistSongController.getArtistSongByIds))
route.get('/artistSong/songId/:id', catchAsync(artistSongController.getArtistSongBySongId))
route.get('/artistSong/artistId/:id', catchAsync(artistSongController.getArtistSongbyArtistId))
route.post('/artistSong', middleware.verifyToken, catchAsync(artistSongController.createArtistSong))
route.put('/artistSong/:id', middleware.verifyToken, catchAsync(artistSongController.updateArtistSongByIds))
route.delete('/artistSong/:id', middleware.verifyToken, catchAsync(artistSongController.deleteArtistSongByIds))

module.exports = route