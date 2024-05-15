const route = require('express').Router()
const songController = require('../controllers/song.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.mimetype.includes("audio")){
      cb(null, './assets/Song/audio')
    }
    if(file.mimetype.includes("image")){
      cb(null, "./assets/Song/image")
    }
  },
  filename: function (req, file, cb) {
    if(file.mimetype.includes("audio")){
      cb(null, `tempAudio.mp3`)
    }
    if(file.mimetype.includes("image")){
      cb(null, `tempImage.jpg`)
    }    
  }
})
const upload = multer({ storage: storage })

route.get('/song/all',middleware.verifyToken, catchAsync(songController.getAllSongs))
route.get('/song/getInfo/:id',middleware.verifyToken, catchAsync(songController.getSongInfoById))
route.get('/song/:id', catchAsync(songController.getSongById))
route.get('/song/random/get/:playlistId',middleware.verifyToken, catchAsync(songController.getRandomSongs))
//route.get('/song/:name',middleware.verifyToken, catchAsync(songController.getSongByName))
route.post('/song/create',
[
  middleware.verifyToken,
  upload.fields(
    [
      { name: 'coverImg', maxCount: 1 },
      { name: 'audio', maxCount: 1 }
    ]
  )
],
catchAsync(songController.createSong))
route.put('/song/:id', middleware.verifyToken, catchAsync(songController.updateSongById))
route.delete('/song/:id', middleware.verifyToken, catchAsync(songController.deleteSongById))

module.exports = route
