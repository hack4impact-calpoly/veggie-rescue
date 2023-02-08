const mongoose = require("mongoose");

const DropoffLogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    driver: String,
    vehicle: String,
    name: String,
    recipientEntityType: String,
    demographic: String,
    area: String,
    foodAllocation: { String, Number },
  },
  { collection: "DropoffLog" }
);

const DropoffLog = mongoose.model("DropoffLog", DropoffLogSchema);

module.exports = DropoffLog;
