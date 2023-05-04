const router = require("express").Router();
const userRouter = require("./user");
const reportRouter = require("./report");

router.use(userRouter);
router.use(reportRouter);

module.exports = router;
