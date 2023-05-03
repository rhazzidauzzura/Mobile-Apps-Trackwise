const router = require("express").Router();
const userController = require("../controllers/userController");

// CMS
router.post("/register", userController.register);
router.post("/login", userController.login);
// router.post("/google-sign-in", userController.loginWithGoogle);

module.exports = router;
