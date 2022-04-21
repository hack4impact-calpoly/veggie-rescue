const express = require("express");
const router = express.Router();
const {
  registerDriver,
  loginDriver,
  getDriver,
} = require("../controllers/driverController");
const { protectDriver, protectAdmin, protectAdminOrDriver } = require("../middleware/authMiddleware");

router.post("/", protectAdmin, registerDriver);

router.post("/login", loginDriver);

router.get("/get", protectDriver, getDriver);

module.exports = router;