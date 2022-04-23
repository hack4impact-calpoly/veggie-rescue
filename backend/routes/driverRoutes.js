const express = require("express");
const router = express.Router();
const {
  getDrivers,
  registerDriver,
  editDriver,
  deleteDriver,
  loginDriver,
  getDriver,
} = require("../controllers/driverController");
const { protectDriver, protectAdmin, protectAdminOrDriver } = require("../middleware/authMiddleware");

router
  .get("/", protectAdmin, getDrivers)
  .post("/", protectAdmin, registerDriver);

router.post("/login", loginDriver);

router.get("/get", protectAdmin, getDriver);

router.route("/:id").put(protectAdmin, editDriver).delete(protectAdmin, deleteDriver);

module.exports = router;