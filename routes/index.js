const router = require("express").Router();
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const deviceRouter = require("./deviceRouter");
const ratingRouter = require("./ratingRouter");
const detailRouter = require("./detailRouter");

router.use("/user", userRouter);
router.use("/types", typeRouter);
router.use("/brands", brandRouter);
router.use("/devices", deviceRouter);
router.use("/rating", ratingRouter);
router.use("/details", detailRouter);

module.exports = router;
