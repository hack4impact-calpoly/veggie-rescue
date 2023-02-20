const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const Donor = require('../models/donorSchema.js')
const Recipient = require('../models/recipientSchema.js')
const Admin = require('../models/adminSchema.js')
const Driver = require('../models/driverSchema.js')

// @desc Get full donor list
// @route /api/location/donor
// @access Private Admin OR Driver
const findDonor = asyncHandler(async (req, res) => {
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
  const donor = await Donor.find();
  res.status(200).json(donor);
})

// @desc Get full recipient list
// @route /api/location/recipient
// @access Private Admin OR Driver
const findRecipient = asyncHandler(async (req, res) => {
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

  const recipient = await Recipient.find();
  res.status(200).json(recipient);
})


// @desc Create a new Donor
// @route /api/location/donor
// @access Private -> Admin Only
const createDonor = asyncHandler(async (req, res) => {
  // Check and verify that this this is admin accessing data
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }
  const { name, EntityType, LocationType, CombinedAreaName } =
    req.body;

  if (!name || !EntityType || !LocationType || !CombinedAreaName) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if donor does not already exist
  const donorExists = await Donor.findOne({ name });

  if (donorExists) {
    res.status(400);
    throw new Error("Donor already exists");
  }

  // Create donor
  const donor = await Donor.create({
    name,
    EntityType,
    LocationType,
    CombinedAreaName,
  });

  if (donor) {
    res.status(201).json({
      name: donor.name,
      EntityType: donor.EntityType,
      LocationType: donor.LocationType,
      CombinedAreaName: donor.CombinedAreaName,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Donor Data");
  }
})

// @desc Create a Recipient
// @route /api/location/recipient
// @access Private -> Admin Only
const createRecipient = asyncHandler(async (req, res) => {
  // Check and verify that this this is admin accessing data
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  const { name, OrgStructure, DemographicsServed, CombinedAreaName, FoodDistModel } = req.body;

  if (!name || !OrgStructure || !DemographicsServed || !CombinedAreaName || !FoodDistModel) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if recipient does not already exist
  const recipientExists = await Recipient.findOne({ name });

  if (recipientExists) {
    res.status(400);
    throw new Error("Recipient already exists");
  }

  // Create donor
  const recipient = await Recipient.create({
    name,
    OrgStructure,
    DemographicsServed,
    CombinedAreaName,
    FoodDistModel,
  });

  if (recipient) {
    res.status(201).json({
      _id: recipient._id,
      name: recipient.name,
      OrgStructure: recipient.OrgStructure,
      DemographicsServed: recipient.DemographicsServed,
      CombinedAreaName: recipient.CombinedAreaName,
      FoodDistModel: recipient.FoodDistModel,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Recipient Data");
  }
})

// @desc Update a Donor
// @route /api/location/donor/:id
// @access Private -> Admin only

const editDonor = asyncHandler(async (req, res) => {
  // Check and verify that this this is admin accessing data
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    res.status(404);
    throw new Error("No donor found");
  }
  const body = req.body;

  if (body.name) donor.name = body.name;
  if (body.EntityType) donor.EntityType = body.EntityType;
  if (body.LocationType) donor.LocationType = body.LocationType;
  if (body.CombinedAreaName) donor.CombinedAreaName = body.CombinedAreaName;

  await Donor.findByIdAndUpdate(req.params.id, donor);
  return res.status(201).json(donor);
})

// @desc Update a Recipient
// @route /api/location/recipient/:id
// @access Private -> Admin only

const editRecipient = asyncHandler(async (req, res) => {
  // Check and verify that this this is admin accessing data
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  const recipient = await Recipient.findById(req.params.id);
  if (!recipient) {
    res.status(404);
    throw new Error("No recipient found");
  }
  const body = req.body;
  if (body.name) recipient.name = body.name;
  if (body.OrgStructure) recipient.OrgStructure = body.OrgStructure;
  if (body.DemographicsServed) recipient.DemographicsServed = body.DemographicsServed;
  if (body.CombinedAreaName) recipient.CombinedAreaName = body.CombinedAreaName;
  if (body.FoodDistModel) recipient.FoodDistModel = body.FoodDistModel;

  await Recipient.findByIdAndUpdate(req.params.id, recipient);
  return res.status(201).json(recipient);
})

// @desc Delete a Donor
// @route /api/location/donor/:id
// @access Private -> Admin only
const deleteDonor = asyncHandler(async (req, res) => {
  // Check and verify that this this is admin accessing data
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  const donor = await Donor.findById(req.params.id);

  if (!donor) {
    res.status(404);
    throw new Error("Donor not found");
  }

  await donor.remove();

  res.status(200).json({ success: true });
})

// @desc Delete a Recipient
// @route /api/location/recipient/:id
// @access Private -> Admin only
const deleteRecipient = asyncHandler(async (req, res) => {
  // Check and verify that this this is admin accessing data
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
    const recipient = await Recipient.findById(req.params.id);
  if (!recipient) {
    res.status(404);
    throw new Error("Recipient not found");
  }

  await recipient.remove();

  res.status(200).json({ success: true });

})

module.exports = {
    findDonor,
    findRecipient,
    createDonor,
    createRecipient,
    editDonor,
    editRecipient,
    deleteDonor,
    deleteRecipient,
}