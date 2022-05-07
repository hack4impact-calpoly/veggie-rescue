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
const { protectAdmin } = require("../middleware/authMiddleware");

router
  .get("/", protectAdmin, getDrivers)
  .put("/", protectAdmin, registerDriver);

router.put("/login", loginDriver);

router
  .route("/:id")
  .put(protectAdmin, editDriver)
  .delete(protectAdmin, deleteDriver);

router.get("/get", protectAdmin, getDriver);


module.exports = router;