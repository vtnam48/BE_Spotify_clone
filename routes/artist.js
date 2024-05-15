const route = require('express').Router()
const artistController = require('../controllers/artist.controller.js')
const middleware = require('../middleware/auth')
const catchAsync = require('../utils/catchAsync')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/Artist/')
  },
  filename: function (req, file, cb) {
    cb(null, `tempArtist.jpg`)
  }
})
const upload = multer({ storage: storage })

route.get('/artist/all', middleware.verifyToken, catchAsync(artistController.getAllArtists))
route.get('/artist/:id', middleware.verifyToken, catchAsync(artistController.getArtistById))
route.get('/artist/:name', middleware.verifyToken, catchAsync(artistController.getArtistByName))
route.post('/artist/create',[middleware.verifyToken, upload.single("coverImg")] , catchAsync(artistController.createArtist))
route.put('/artist/:id', middleware.verifyToken, catchAsync(artistController.updateArtistById))
route.delete('/artist/:id', middleware.verifyToken, catchAsync(artistController.deleteArtistById))
route.get('/artist/getInfo/:id', middleware.verifyToken, catchAsync(artistController.getArtistInfoById))

module.exports = route
