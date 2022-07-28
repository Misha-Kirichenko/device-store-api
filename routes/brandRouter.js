const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/checkRole.js");
const BrandController = require("../controllers/BrandController");

router
  .route("/")
  .get(verifyToken, BrandController.all)
  .post([verifyToken, checkRole], BrandController.add);

router
  .route("/:id")
  .delete([verifyToken, checkRole], BrandController.remove)
  .patch([verifyToken, checkRole], BrandController.edit);

module.exports = router;
