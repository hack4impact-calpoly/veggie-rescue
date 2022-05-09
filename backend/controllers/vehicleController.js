const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/vehiclesSchema.js");
const Admin = require("../models/adminModel.js");
const Driver = require("../models/driverModel.js");
const DropoffLogSchema = require("../models/dropoffLogSchema.js");
const PickupLogSchema = require("../models/pickupLogSchema.js");

// @desc GET all vehicles
// @route  GET /api/vehicles
// @access Private access to drivers OR admins
const getVehicles = asyncHandler(async (req, res) => {
  // Check and verify that this this is driver OR admin accessing data
  if (req.admin) {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }
  } else if (req.driver) {
    const driver = await Driver.findById(req.driver.id);

    if (!driver) {
      res.status(401);
      throw new Error("Driver not found");
    }
  }
  // Return array of vehicles
  const vehicle = await Vehicle.find();
  res.status(200).json(vehicle);
});

// @desc GET vehicle
// @route GET /api/vehicles/match
// @access Private to driver
const matchVehicle = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT.  This is passed in through authMiddleware.
  const driver = await Driver.findById(req.driver.id);
  if (!driver) {
    res.status(401);
    throw new Error("Current driver not found");
  }
  // Check all the vehicles and see if any of their their driver strings match the current user's
  // Then filter that array to see if any are currently logged in (This will take care of personal vehicle case)
  let vehicles = await Vehicle.find({ driver: req.driver.id.toString() });
  vehicles = vehicles.filter((e) => e.isLoggedIn);
  if (vehicles.length === 0) {
    // It will return an empty object if nothing is found.
    res.status(401);
    throw new Error("No Vehicle matched to driver.");
  } else {
    res.status(200).json(vehicles);
  }
});

// @desc POST / create a Vehicle
// @route POST /api/vehicles
// @access Private to admin
const createVehicle = asyncHandler(async (req, res) => {
  if (req.admin) {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }
  }
  const { name, img } = req.body;

  if (!name || !img) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  // Find if vehicle does not already exist
  const vehicleExists = await Vehicle.findOne({ name });
  if (vehicleExists) {
    res.status(400);
    throw new Error("Vehicle already exists");
  }

  // Create vehicle
  const vehicle = await Vehicle.create({
    driver: "",
    name,
    isLoggedIn: false,
    img,
    currentPickups: [],
    currentDropoffs: [],
    totalWeight: 0,
  });

  if (vehicle) {
    res.status(201).json({
      _id: vehicle._id,
      driver: vehicle.driver,
      isLoggedIn: vehicle.isLoggedIn,
      name: vehicle.name,
      img: vehicle.img,
      currentPickups: vehicle.currentPickups,
      currentDropoffs: vehicle.currentDropoffs,
      totalWeight: vehicle.totalWeight,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Vehicle Data");
  }
});

// @desc PUT Update a Vehicle
// @route PUT /api/vehicle/edit
// @access PRIVATE -> admin OR driver have access
/*
*id: String,
    name: String,
    img: String,
    currentPickups: Array,
    currentDropoffs: Array,
    totalWeight: Number
*/
const editVehicle = asyncHandler(async (req, res) => {
  // Check and verifity that this this is driver or admin accessing data
  if (req.admin) {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }
  } else if (req.driver) {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      res.status(401);
      throw new Error("Driver not found");
    }
  }
  const vehicleInDB = await Vehicle.findById(req.params.id);
  const body = req.body;
  if (!vehicleInDB) {
    res.status(404);
    throw new Error("Vehicle paired to given ID not found");
  }

  if (body.id || body.token) {
    return res.status(400).json({ error: "Cannot edit id or token" });
  }
  if (body.driver) {
    vehicleInDB.driver = body.driver;
  }
  if (body.isLoggedIn) {
    vehicleInDB.isLoggedIn = body.isLoggedIn;
  }

  if (body.name) {
    vehicleInDB.name = body.name;
  }
  if (body.img) {
    vehicleInDB.img = body.img;
  }
  if (body.currentPickups) {
    // First check if it is an array
    if (body.currentPickups.constructor == Array) {
      // this is for update logs section
      vehicleInDB.currentPickups = body.currentPickups;
    } else if (Object.keys(body.currentPickups).length === 0) {
      // First check if the object is an empty array.  If so, clear out the array

      vehicleInDB.currentPickups = [];
    } else {
      // Otherwise...
      // Create a pickup object and push it into the array
      //const pickup = await PickupLogSchema.create(body.currentPickups);
      vehicleInDB.currentPickups = [
        ...vehicleInDB.currentPickups,
        body.currentPickups,
      ];
    }
  }
  if (body.currentDropoffs) {
    // First check if it is an array
    if (body.currentDropoffs.constructor == Array) {
      // this is for update logs section
      vehicleInDB.currentDropoffs = body.currentDropoffs;
    } else if (Object.keys(body.currentDropoffs).length === 0) {
      // First check if the object is an empty array.  If so, clear out the array

      vehicleInDB.currentDropoffs = [];
    } else {
      // Otherwise...
      // Create a dropoff object and push it into the array
      //const dropoff = await DropoffLogSchema.create(body.currentDropoffs);
      vehicleInDB.currentDropoffs = [
        ...vehicleInDB.currentDropoffs,
        body.currentDropoffs,
      ];
    }
  }
  if (body.totalWeight === 0 || body.totalWeight) {
    vehicleInDB.totalWeight = body.totalWeight;
  }
  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    vehicleInDB
  );
  const update = await Vehicle.findById(updatedVehicle._id);
  res.status(201).json(update);
});

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private Admin only
const deleteVehicle = asyncHandler(async (req, res) => {
  // Get admin using the id in the JWT
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    res.status(404);
    throw new Error("Vehicle not found...");
  }

  await vehicle.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  getVehicles,
  createVehicle,
  editVehicle,
  matchVehicle,
  deleteVehicle,
};
