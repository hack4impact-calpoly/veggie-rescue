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

// Get all pickup logs
router.get("/pickup", getPickups);

// Post to pickup log
router.post("/pickup", createPickup);

// Delete a pickup log
router.delete("/pickup", deletePickup);

// Get all dropoff logs
router.get("/dropoffs", getDropoffs);

// Post to dropoff log
router.post("/dropoffs", createDropoff);

// Delete a dropoff log
router.delete("/dropoffs", deleteDropoff);

module.exports = router;
