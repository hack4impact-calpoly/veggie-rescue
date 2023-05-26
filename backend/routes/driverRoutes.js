const express = require("express");

const router = express.Router();
const {
  getDrivers,
  registerDriver,
  editDriver,
  deleteDriver,
  loginDriver,
  punchOutDriver,
  getDriver,
} = require("../controllers/driverController");
const { protectAdmin, protectDriver } = require("../middleware/authMiddleware");

router
  .get("/", protectAdmin, getDrivers)
  .post("/", protectAdmin, registerDriver);

router.post("/login", loginDriver);

router
  .route("/:id")
  .put(protectAdmin, editDriver)
  .delete(protectAdmin, deleteDriver);

router.get("/get", protectAdmin, getDriver);

// driver route for punch out
router.post("/logout", protectDriver, punchOutDriver);

module.exports = router;
