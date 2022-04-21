const express = require("express");
const router = express.Router();
const {
  getPickups,
  getDropoffs,
  createPickup,
  createDropoff,
  deletePickup,
  deleteDropoff,
} = require("../controllers/logsController");

const {
  protectDriver,
  protectAdmin,
  protectAdminOrDriver,
} = require("../middleware/authMiddleware");

// Get all pickup logs
router.get("/pickup", protectAdmin, getPickups);

// Post to pickup log
router.post("/pickup", protectDriver, createPickup);

// Delete a pickup log
router.delete("/pickup", protectAdmin, deletePickup);


// Get all dropoff logs
router.get("/dropoffs", protectAdmin, getDropoffs);

// Post to dropoff log
router.post("/dropoffs", protectDriver, createDropoff);

// Delete a dropoff log
router.delete("/dropoffs", protectAdmin, deleteDropoff);

module.exports = router;
