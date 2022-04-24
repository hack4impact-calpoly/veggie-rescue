const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Driver = require("../models/driverModel");
const Admin = require("../models/adminModel")
const Vehicle = require("../models/vehiclesSchema");
const jwt = require("jsonwebtoken");

// @desc Get all drivers
// @route /api/drivers
// @access Private
const getDrivers = asyncHandler(async (req, res) => {
  // Get admin using the id in the JWT
  // Takes token from local storage key and verifies authenticity
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
 
  const driver = await Driver.find();
  res.status(200).json(driver);
})

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

  // Create driver
  const driver = await Driver.create({
    name,
    pin,
  });

  // We have to create a personal vehicle with each driver so do that here.
  await Vehicle.create({
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

// @desc    Edit driver
// @route   PUT /api/drivers/:id
// @access  Private
const editDriver = asyncHandler (async (req,res) => {
  // Get user using the id in the JWT
  const admin = await Admin.findById(req.admin.id);

  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  const { name, pin} = req.body;

  // Build driver object
  const driverFields = {};
  if (name) {
    // Find if driver does not already exist
    const driverExists = await Driver.findOne({ name });

    if (driverExists) {
      res.status(400);
      throw new Error("Driver exists");
    }
    driverFields.name = name;
  }
  if (pin) {
    // We have to see if the password already exists
    const foundDrivers = await Driver.find({ pin: pin });
    //Check if pin matched
    if (foundDrivers.length !== 0) {
      res.status(401);
      throw new Error("Pin already exists");
    }
    driverFields.pin = pin;
  }
 
  try {
    let driver = await Driver.findById(req.params.id);

    if (!driver) return res.status(404).json({ msg: "Driver not found" });

    driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: driverFields });

    res.json({ updated: driver, new: driverFields });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Private
const deleteDriver = asyncHandler(async (req, res) => {
  // Get admin using the id in the JWT
  // Takes token from local storage key and verifies authenticity
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

  await Vehicle.findByIdAndRemove(updateVehicle[0]._id);
  await driver.remove();

  res.status(200).json({ 
    success: true,
  msg: 'Successfully removed driver and personal vehicle'})
})

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




module.exports = {
  getDrivers,
  registerDriver,
  editDriver,
  deleteDriver,
  loginDriver,
  getDriver,

};
