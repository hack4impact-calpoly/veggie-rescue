const express = require("express");
const router = express.Router();
const {
  registerDriver,
  loginDriver,
  getDriver,
  deleteDriver
} = require("../controllers/driverController");
const { protectDriver, protectAdmin, protectAdminOrDriver } = require("../middleware/authMiddleware");

router.post("/", protectAdmin, registerDriver);

router.post("/login", loginDriver);

router.get("/get", protectAdmin, getDriver);

router.route("/:id").delete(protectAdmin, deleteDriver);

// Need to make:
// Get all drivers route 
// Delete Driver
// Update Driver
module.exports = router;