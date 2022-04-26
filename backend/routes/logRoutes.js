const express = require("express");
const router = express.Router();
const {
  getPickups,
  getDropoffs,
  createPickup,
  createDropoff,
  deletePickup,
  deleteDropoff,
  pushPickups,
  pushDropoffs,
} = require("../controllers/logsController");

const {
  protectDriver,
  protectAdmin,
} = require("../middleware/authMiddleware");

// Get all pickup logs
router.get("/pickup", protectAdmin, getPickups);

// Post to pickup log
router.post("/pickup", protectDriver, createPickup);

// Delete a pickup log
router.delete("/pickup", protectAdmin, deletePickup);

// Post Multiple to dropoff log
router.post("/pickup/batch", protectDriver, pushPickups);

// Get all dropoff logs
router.get("/dropoffs", protectAdmin, getDropoffs);

// Post to dropoff log
router.post("/dropoffs", protectDriver, createDropoff);

// Delete a dropoff log
router.delete("/dropoffs", protectAdmin, deleteDropoff);

// Post Multiple to dropoff log
router.post("/dropoffs/batch", protectDriver, pushDropoffs);

module.exports = router;
