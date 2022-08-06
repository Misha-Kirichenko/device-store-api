const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const DeviceController = require("../controllers/DeviceController");

router
  .route("/")
  .get(verifyToken, DeviceController.all)
  .post([verifyToken, checkRole], DeviceController.add)
  .delete([verifyToken, checkRole], DeviceController.massRemove);

router
  .route("/:id")
  .get(verifyToken, DeviceController.one)
  .delete([verifyToken, checkRole], DeviceController.remove)
  .patch([verifyToken, checkRole], DeviceController.update);

router.delete(
  "/deleteDeviceDetail/:id",
  [verifyToken, checkRole],
  DeviceController.deleteDetail
);

module.exports = router;
