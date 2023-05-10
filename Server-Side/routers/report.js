const router = require("express").Router();
const reportController = require("../controllers/reportController");
const { upload } = require("../helpers/cloudinary");
const { authentication } = require("../middleware/authentication");
// User
router.post("/report", upload.single("image"), reportController.postReport);

router.use(authentication);
router.get("/reports", reportController.getReport);
router.get("/report/:reportId", reportController.getReportById);
router.put("/report/:reportId", reportController.editReportById);
router.delete("/report/:reportId", reportController.deleteReport);

module.exports = router;
