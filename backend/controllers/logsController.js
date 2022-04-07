const PickupLog = require("../models/pickupLogSchema");
const DropoffLog = require("../models/dropoffLogSchema");

// @desc Get all pickup logs
// @route GET : /api/pickup
// @access Private
const getPickups = async (req, res) => {
  res.send(await PickupLog.find({}));
};

// @desc Get all dropoff logs
// @route GET : /api/dropoffs
// @access Private
const getDropoffs = async (req, res) => {
  res.send(await DropoffLog.find({}));
};

// @desc Post pickup log
// @route POST : /api/pickup
// @access Private
const createPickup = async (req, res) => {
  const {
    date,
    driver,
    vehicle,
    name,
    donorEntityType,
    foodType,
    area,
    lbsPickedUp,
  } = req.body;
  let pickup = new PickupLog({
    date: date,
    driver: driver,
    vehicle: vehicle,
    name: name,
    donorEntityType: donorEntityType,
    foodType: foodType,
    area: area,
    lbsPickedUp: lbsPickedUp,
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
  const {
    date,
    driver,
    vehicle,
    name,
    recipientEntityType,
    demographic,
    foodType,
    area,
    lbsDroppedOff,
  } = req.body;
  let dropoff = new DropoffLog({
    date: date,
    driver: driver,
    vehicle: vehicle,
    name: name,
    recipientEntityType: recipientEntityType,
    demographic: demographic,
    foodType: foodType,
    area: area,
    lbsDroppedOff: lbsDroppedOff,
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
  const { _id } = req.body;
  try {
    await PickupLog.findOneAndRemove({
      _id: _id,
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
  const { _id } = req.body;
  try {
    await DropoffLog.findOneAndRemove({
      _id: _id,
    });
    res.send(`Dropoff with id ${_id} was successfully deleted`);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
};

module.exports = {
  getPickups,
  getDropoffs,
  createPickup,
  createDropoff,
  deletePickup,
  deleteDropoff,
};
