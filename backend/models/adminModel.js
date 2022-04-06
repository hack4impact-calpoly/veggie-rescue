const mongoose = require("mongoose");

const adminModel = mongoose.Schema(
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
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }, {collection: 'Admin'});

module.exports = mongoose.model("Admin", adminModel);
