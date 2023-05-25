const mongoose = require("mongoose");

const driverModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    isLoggedIn: {
      type: Boolean,
      required: false,
      default: false,
    },
    clock_in: {
      type: [Date],
      default: [],
    },
    clock_out: {
      type: [Date],
      default: [],
    },
    pin: {
      type: String,
      required: [true, "Please add a 4 digit pin"],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
  { collection: "Driver" }
);

module.exports = mongoose.model("Driver", driverModel);
