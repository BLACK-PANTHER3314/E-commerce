const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");

const { requireSignIN, isAdmin } = require("../middleware/authMiddleware");

//register || method post
router.post("/register", registerController);
//login || method post
router.post("/login", loginController);
//test route || get
router.get("/test", requireSignIN, isAdmin, testController);

module.exports = router;
