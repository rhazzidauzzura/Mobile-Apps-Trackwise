const router = require("express").Router();
const reportController = require("../controllers/reportController");
const { upload } = require("../helpers/cloudinary");

// User
router.get("/reports", reportController.getReport);
router.post("/report", upload.single("image"), reportController.postReport);
router.get("/report/:reportId", reportController.getReportById);
router.put("/report/:reportId", reportController.editReportById);
router.delete("/report/:reportId", reportController.deleteReport);

module.exports = router;
