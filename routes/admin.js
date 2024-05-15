const adminController = require("../controllers/admin.controller.js");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middleware/auth");
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/User/')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user.id}.jpg`)
  }
})

const upload = multer({ storage: storage })

router.delete("/admin/deleteUsers",middleware.verifyToken, catchAsync(adminController.deleteUsers));
router.delete("/admin/deleteSongs",middleware.verifyToken, catchAsync(adminController.deleteSongs));
router.delete("/admin/deletePlaylists",middleware.verifyToken, catchAsync(adminController.deletePlaylists));
router.delete("/admin/deleteAlbums",middleware.verifyToken, catchAsync(adminController.deleteAlbums));
router.delete("/admin/deleteArtists",middleware.verifyToken, catchAsync(adminController.deleteArtists));
router.post("/admin/deleteArtists",middleware.verifyToken, catchAsync(adminController.deleteArtists));
router.get("/admin/refreshSongUrl",middleware.verifyToken, catchAsync(adminController.refreshSongUrl));
//router.get("/admin/allUser", middleware.verifyToken, catchAsync(adminController.getAllUsers));
// router.post("/login", catchAsync(userController.userLogin));
// router.post("/logout", middleware.verifyToken, catchAsync(userController.userLogout));
// router.post("/refreshToken", catchAsync(userController.refreshRToken));
// router.post("/user/updateInfo",[middleware.verifyToken, upload.single("avatar")], catchAsync(userController.updateUser));
// router.get("/user/getInfo", middleware.verifyToken, catchAsync(userController.getInfoUserById));

module.exports = router;
