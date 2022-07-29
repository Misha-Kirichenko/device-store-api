const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const DeviceController = require("../controllers/DeviceController");

router
  .route("/")
  .post([verifyToken, checkRole], DeviceController.add)
  .get([verifyToken], DeviceController.all);

module.exports = router;
