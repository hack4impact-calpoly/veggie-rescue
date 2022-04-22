const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Driver = require("../models/driverModel");
const Admin = require("../models/adminModel")
const Vehicle = require("../models/vehiclesSchema");
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
  const foundDrivers = await Driver.find({ pin: pin });
  //iterate through those results and compare pins, put those promises into data
  // const data = foundDrivers.map(async (e) => {
  //   if (pin, e.pin) return e;
  // });

  //now return the fullfilled promise into foundDriver
  // const result = await Promise.all(data);

  //since its an array filter out the undefined elements
  // let foundDriver = result.filter((e) => e !== undefined);
  // foundDriver = foundDriver[0];
//console.log(foundDrivers )
  //Check if pin matched
  if (foundDrivers === []) {
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
  // const salty = await bcrypt.genSalt(10);
  // const newHashPin = await bcrypt.hash(pin, salty);

  // Create driver
  const driver = await Driver.create({
    name,
    pin,
  });

  // We have to create a personal vehicle with each driver so do that here.
  const vehicle = await Vehicle.create({
    driver: driver._id,
    name: "personal vehicle",
    isLoggedIn: false,
    img: "no image",
    currentPickups: [],
    currentDropoffs: [],
    totalWeight: 0,
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
    if (pin, e.pin) return e;
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

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Private

const deleteDriver = asyncHandler(async (req, res) => {
  // Get admin using the id in the JWT
      const admin = await Admin.findById(req.admin.id);
      if (!admin) {
        res.status(401);
        throw new Error("Admin not found");
      }


  // Get the personal vehicle which is connected to driver; make sure it is not logged in.
  const vehicle = await Vehicle.find({ driver: req.params.id });
  if (!vehicle) {
    res.status(401);
    throw new Error("Vehicle not found");
  }
  const updateVehicle = vehicle.filter(
    (e) => !e.isLoggedIn && e.name === "personal vehicle"
  );
  if (!updateVehicle) {
    res.status(401);
    throw new Error("Personal Vehicle is currently logged in");
  }
  

  const driver = await Driver.findById(req.params.id)

  
  if (!driver) {
    res.status(404)
    throw new Error('Driver not found')
  }

  // if (ticket.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('Not Authorized')
  // }

  await updateVehicle.remove();
  await driver.remove();

  res.status(200).json({ success: true })
})
module.exports = {
  registerDriver,
  loginDriver,
  getDriver,
  deleteDriver
};
