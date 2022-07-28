const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const TypeController = require("../controllers/TypeController");

router
  .route("/")
  .get(verifyToken, TypeController.getAll)
  .post([verifyToken, checkRole], TypeController.addType);

router
  .route("/:id")
  .delete([verifyToken, checkRole], TypeController.removeType)
  .patch([verifyToken, checkRole], TypeController.editType);

module.exports = router;
