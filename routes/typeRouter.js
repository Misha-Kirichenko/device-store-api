const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const TypeController = require("../controllers/TypeController");

router
  .route("/")
  .get(verifyToken, TypeController.getAll)
  .post([verifyToken, checkRole], TypeController.addType);

router.delete("/:id", [verifyToken, checkRole], TypeController.removeType);

module.exports = router;
