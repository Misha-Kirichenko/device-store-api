const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const DeviceController = require("../controllers/DeviceController");

router.route("/").get(DeviceController.all).post(DeviceController.add);

router.route("/:id").get(DeviceController.one).delete(DeviceController.remove);

module.exports = router;
