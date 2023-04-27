const PickupLog = require("../models/pickupLogSchema");
const DropoffLog = require("../models/dropoffLogSchema");
const Admin = require("../models/adminSchema");
const Driver = require("../models/driverSchema");

// @desc Get all pickup logs
// @route GET : /api/pickup
// @access Private -> Admin only
const getPickups = async (req, res) => {
  // Check and verify that this this is admin accessing data
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  res.send(await PickupLog.find({}));
};

// @desc Get all dropoff logs
// @route GET : /api/dropoffs
// @access Private -> Admin only
const getDropoffs = async (req, res) => {
  // Check and verify that this this is admin accessing data
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  res.send(await DropoffLog.find({}));
};

// @desc Post pickup log
// @route POST : /api/pickup
// @access Private
const createPickup = async (req, res) => {
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

  const { driver, vehicle, name, donorEntityType, area, foodAllocation } =
    req.body;

  let pickup = new PickupLog({
    driver,
    vehicle,
    name,
    donorEntityType,
    area,
    foodAllocation,
  });
  try {
    pickup = await pickup.save();
    res.send(`Success\n${pickup}`);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
};

// @desc Post dropoff log
// @route POST : /api/dropoffs
// @access Private
const createDropoff = async (req, res) => {
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
  const {
    driver,
    vehicle,
    name,
    recipientEntityType,
    demographic,
    area,
    foodAllocation,
  } = req.body;
  let dropoff = new DropoffLog({
    driver,
    vehicle,
    name,
    recipientEntityType,
    demographic,
    area,
    foodAllocation,
  });
  try {
    dropoff = await dropoff.save();
    res.send(`Success\n${dropoff}`);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
};

// @desc Delete a specific pickup
// @route DELETE : /api/pickup
// @access Private
const deletePickup = async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id } = req.body;
  try {
    await PickupLog.findOneAndRemove({
      _id,
    });
    res.send(`Pickup with id ${_id} was successfully deleted`);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
};

// @desc Delete a specific dropoff
// @route DELETE : /api/dropoffs
// @access Private
const deleteDropoff = async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id } = req.body;
  try {
    await DropoffLog.findOneAndRemove({
      _id,
    });
    res.send(`Dropoff with id ${_id} was successfully deleted`);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
};

// @desc Post multiple pickups
// @route POST : /api/pickup/batch
// @access Private -> Driver only
const pushPickups = async (req, res) => {
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

  // Get array from request body
  const data = req.body;
  let counter = 0;
  try {
    const response = await PickupLog.insertMany(data, { ordered: false });
    res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc Post multiple dropoffs
// @route POST : /api/dropoff/batch
// @access Private -> Driver only
const pushDropoffs = async (req, res) => {
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
  // Get array from request body
  const data = req.body;
  try {
    const response = await DropoffLog.insertMany(data, { ordered: false });
    res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getPickups,
  getDropoffs,
  createPickup,
  createDropoff,
  deletePickup,
  deleteDropoff,
  pushPickups,
  pushDropoffs,
};
