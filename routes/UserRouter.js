const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);

module.exports = router;
