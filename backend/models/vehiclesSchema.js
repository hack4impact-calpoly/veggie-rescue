const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    name: String,
    driver: String,
    isLoggedIn: Boolean,
    img: String,
    currentPickups: Array,
    currentDropoffs: Array,
    foodAllocation: {
      type: Map,
      of: Number,
    },
  },
  { collection: "Vehicle" }
);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = Vehicle;