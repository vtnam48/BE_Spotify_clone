const userController = require("../controllers/user.controller.js");
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
router.get("/user/all", middleware.verifyToken, catchAsync(userController.getAllUsers));
router.post("/register", catchAsync(userController.createUser));
router.post("/login", catchAsync(userController.userLogin));
router.post("/logout", middleware.verifyToken, catchAsync(userController.userLogout));
router.post("/refreshToken", catchAsync(userController.refreshRToken));
router.post("/user/updateInfo",[middleware.verifyToken, upload.single("avatar")], catchAsync(userController.updateUser));
router.get("/user/getInfo", middleware.verifyToken, catchAsync(userController.getInfoUserById));

module.exports = router;
