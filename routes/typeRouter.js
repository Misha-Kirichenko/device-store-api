const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken.js");
const TypeController = require("../controllers/TypeController");

router.route("/").get(verifyToken, TypeController.getAll);

module.exports = router;
