const express = require("express");
const router = express.Router();
const {
  getVehicles,
  deleteVehicle,
  getVehicle,
  createVehicle,
  editVehicle,
  matchVehicle,
} = require("../controllers/vehicleController");
const {
  protectDriver,
  protectAdmin,
  protectAdminOrDriver,
} = require("../middleware/authMiddleware");

// ENDPOINT: http://<address>/api/vehicles
// DESCRIPTION: Get all vehicles (Admin or Driver), and create vehicle (Admin Only)
router
  .route("/")
  .get(protectAdminOrDriver, getVehicles)
  .post(protectAdmin, createVehicle);

// ENDPOINT: http://<address>/api/vehicles/match
// DESCRIPTION: Match driver to vehicle based on driver id. (Driver only)
router.get("/match", protectDriver, matchVehicle);

// ENDPOINT: http://<address>/api/:id
// DESCRIPTION: Given a vehicle id, get that vehicle (protectAdminOrDriver), delete that vehicle (Admin only), or edit that vehicle (protectAdminOrDriver)
router
  .route("/:id")
  //.get(protectAdminOrDriver, getVehicle)
  .delete(protectAdmin, deleteVehicle)
  .put(protectAdminOrDriver, editVehicle);

module.exports = router;
