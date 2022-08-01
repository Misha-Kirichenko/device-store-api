const router = require("express").Router();
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const deviceRouter = require("./deviceRouter");

router.use("/user", userRouter);
router.use("/types", typeRouter);
router.use("/brands", brandRouter);
router.use("/devices", deviceRouter);

module.exports = router;
