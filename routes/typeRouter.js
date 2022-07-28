const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const TypeController = require("../controllers/TypeController");

router
  .route("/")
  .get(verifyToken, TypeController.all)
  .post([verifyToken, checkRole], TypeController.add);

router
  .route("/:id")
  .delete([verifyToken, checkRole], TypeController.remove)
  .patch([verifyToken, checkRole], TypeController.edit);

module.exports = router;
