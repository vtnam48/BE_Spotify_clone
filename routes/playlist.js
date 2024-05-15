const route = require('express').Router()
const playlistController = require('../controllers/playlist.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/Playlist/')
  },
  filename: function (req, file, cb) {
    cb(null, `tempPlaylist.jpg`)
  }
})
const upload = multer({ storage: storage })

route.get('/playlist/all',middleware.verifyToken, catchAsync(playlistController.getAllPlaylists))
route.get('/playlist/:id',middleware.verifyToken, catchAsync(playlistController.getPlaylistById))
route.get('/playlist/user/getAll', middleware.verifyToken, catchAsync(playlistController.getPlaylistByUserId))
route.get('/playlist/:name', catchAsync(playlistController.getPlaylistByName))
route.post('/playlist', middleware.verifyToken, catchAsync(playlistController.createPlaylist))
route.post('/playlist/server', [middleware.verifyToken, upload.single("coverImage")], catchAsync(playlistController.createServerPlaylist))
route.post('/playlist/serverSong', [middleware.verifyToken], catchAsync(playlistController.createServerPlaylistSong))
route.post('/playlist/update/:id', [middleware.verifyToken, upload.single("coverImage")], catchAsync(playlistController.updatePlaylistName))
route.delete('/playlist/:id', middleware.verifyToken, catchAsync(playlistController.deletePlaylistById))
route.get('/playlist/getInfo/:id', middleware.verifyToken, catchAsync(playlistController.getPlaylistInfoById))

module.exports = route
