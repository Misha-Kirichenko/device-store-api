const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const DeviceController = require("../controllers/DeviceController");

router
  .route("/")
  .get([verifyToken], DeviceController.all)
  .post([verifyToken, checkRole], DeviceController.add);

router
  .route("/:id")
  .get([verifyToken], DeviceController.all)
  .delete([verifyToken, checkRole], DeviceController.remove);

module.exports = router;
