const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Driver = require("../models/driverModel");
const jwt = require("jsonwebtoken");

// @desc Register a new driver; make sure password is <= 4 in length.
// @route /api/drivers
// @access Public
const registerDriver = asyncHandler(async (req, res) => {
  const { name, pin } = req.body;

  if (!name || !pin) {
    res.status(400);
    throw new Error("Please include name and pin");
  }

  // We have to see if the password already exists
  const foundDrivers = await Driver.find();

  //iterate through those results and compare pins, put those promises into data
  const data = foundDrivers.map(async (e) => {
    if (await bcrypt.compare(pin, e.pin)) return e;
  });

  //now return the fullfilled promise into foundDriver
  const result = await Promise.all(data);

  //since its an array filter out the undefined elements
  let foundDriver = result.filter((e) => e !== undefined);
  foundDriver = foundDriver[0];

  //Check if pin matched
  if (foundDriver !== undefined) {
    res.status(401);
    throw new Error("Pin already exists");
  }

  // Find if driver does not already exist
  const driverExists = await Driver.findOne({ name });

  if (driverExists) {
    res.status(400);
    throw new Error("Driver exists");
  }

  // Hash password
  /*const salty = await bcrypt.genSalt(10);
  const newHashPin = await bcrypt.hash(pin, salty);*/

  // Create driver
  const driver = await Driver.create({
    name,
    pin,
  });

  if (driver) {
    res.status(201).json({
      _id: driver._id,
      name: driver.name,
      token: generateToken(driver._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Driver Data");
  }
});

// @desc Login a driver
// @route /api/drivers
// @access Public
const loginDriver = asyncHandler(async (req, res) => {
  const { pin } = req.body;
  if (pin.length !== 4) {
    res.status(401);
    throw new Error("Invalid Pin length");
  }
  //  Get all drivers
  const foundDrivers = await Driver.find();

  // Iterate through those results and compare pins, put those promises into data
  const data = foundDrivers.map(async (e) => {
    if (pin == e.pin) return e;
  });

  // Now return the fullfilled promise into foundDriver
  const result = await Promise.all(data);

  // Since its an array filter out the undefined elements
  let foundDriver = result.filter((e) => e !== undefined);
  foundDriver = foundDriver[0];

  //Check if pin is found, if so return token
  if (foundDriver) {
    res.status(200).json({
      _id: foundDriver._id,
      name: foundDriver.name,
      token: generateToken(foundDriver._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Pin");
  }
});

// @desc    Get current driver
// @route   /api/drivers/get
// @access  Private
const getDriver = asyncHandler(async (req, res) => {
  const driver = {
    id: req.driver._id,
    name: req.driver.name,
    isLoggedIn: req.driver.isLoggedIn,
    clock_in: req.driver.clock_in,
    clock_out: req.driver.clock_out,
    pin: req.driver.pin,
  };
  res.status(200).json(driver);
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerDriver,
  loginDriver,
  getDriver,
};
