const express        = require("express");
const router         = express.Router();
const authController = require("../controllers/authController");
const isAuth         = require("../middleware/isAuth");

router.post("/register", authController.signupUser);
router.post("/login", authController.signinUser);
router.get("/user", isAuth, authController.getUser);

module.exports = router;
