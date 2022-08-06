const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const DetailController = require("../controllers/DetailController");

router
  .route("/")
  .get(verifyToken, DetailController.all)
  .post([verifyToken, checkRole], DetailController.add)
  .delete([verifyToken, checkRole], DetailController.massRemove);

router
  .route("/:id")
  .delete([verifyToken, checkRole], DetailController.remove)
  .patch([verifyToken, checkRole], DetailController.update);

module.exports = router;
