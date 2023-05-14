const router = require("express").Router();
const reportController = require("../controllers/reportController");
const { upload } = require("../helpers/cloudinary");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

// User
router.post("/report", authentication, upload.single("image"), reportController.postReport);

router.get("/reports", authentication, authorization, reportController.getReport);
router.get("/report/:reportId", authentication, authorization, reportController.getReportById);
router.put("/report/:reportId", authentication, authorization, reportController.editReportById);
router.delete("/report/:reportId", authentication, authorization, reportController.deleteReport);

module.exports = router;
