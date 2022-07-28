const router = require("express").Router();
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");

router.use("/user", userRouter);
router.use("/types", typeRouter);
router.use("/brands", brandRouter);

module.exports = router;
