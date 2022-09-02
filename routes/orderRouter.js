const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const OrderController = require("../controllers/OrderController");

router.route("/").get([verifyToken, checkRole], OrderController.all);

module.exports = router;
