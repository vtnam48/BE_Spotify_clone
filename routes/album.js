const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middleware/auth");
const albumController = require("../controllers/album.controller.js");
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/Album/')
  },
  filename: function (req, file, cb) {
    cb(null, `tempAlbum.jpg`)
  }
})
const upload = multer({ storage: storage })

router.get("/album/all", middleware.verifyToken, catchAsync(albumController.getAllAlbums));
router.get("/album/:id", catchAsync(albumController.getAlbumById));
router.get("/album/:name", catchAsync(albumController.getAlbumByName));
router.post("/album/create", [middleware.verifyToken, upload.single("coverImg")], catchAsync(albumController.createAlbum));
router.put("/album/:id", middleware.verifyToken, catchAsync(albumController.updateAlbumById));
router.delete("/album/:id", middleware.verifyToken, catchAsync(albumController.deleteAlbumById));
router.get('/album/getInfo/:id', middleware.verifyToken, catchAsync(albumController.getAlbumInfoById))

module.exports = router;
