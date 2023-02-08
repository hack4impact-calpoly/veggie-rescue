const mongoose = require("mongoose");

const PickupLogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    driver: String,
    vehicle: String,
    name: String,
    donorEntityType: String,
    area: String,
    foodAllocation: { String, Number },
  },
  { collection: "PickupLog" }
);

const PickupLog = mongoose.model("PickupLog", PickupLogSchema);

module.exports = PickupLog;
