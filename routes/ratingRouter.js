const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkRole = require("../middlewares/verifyToken.js");
const RatingController = require("../controllers/RatingController");

router
  .route("/:id")
  .get(verifyToken, RatingController.get)
  .post(verifyToken, RatingController.add)
  .delete([verifyToken, checkRole], RatingController.remove);

module.exports = router;
