const route = require('express').Router()
const playlistSongController = require('../controllers/playlistSong.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')

route.get('/playlistSong/all', catchAsync(playlistSongController.getAllPlaylistSongs))
route.get('/playlistSong/:songId/:playlistId', catchAsync(playlistSongController.getPlaylistSongByIds))
route.get('/playlistSong/songId/:id', catchAsync(playlistSongController.getPlaylistSongBySongId))
route.get('/playlistSong/playlistId/:id', catchAsync(playlistSongController.getPlaylistSongbyPlayListId))
route.post('/playlistSong/create', middleware.verifyToken, catchAsync(playlistSongController.createPlaylistSong))
route.put('/playlistSong/:id', middleware.verifyToken, catchAsync(playlistSongController.updatePlaylistSongByIds))
route.delete('/playlistSong/delete', middleware.verifyToken, catchAsync(playlistSongController.deletePlaylistSongByIds))

module.exports = route