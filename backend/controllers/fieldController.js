const Field = require('../models/FieldSchema');
const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Admin = require("../models/adminSchema");

// @desc Get all fields
// @route GET /api/fields
// @access Private -> Admin only
const getFields = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  res.send(await Field.findOne({}));
});

// @desc Get field by name
// @route GET /api/fields/:name
// @access Private -> Admin only
const getFieldByName = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  // check if the field exists
  if (!Object.prototype.hasOwnProperty.call(Field.schema.paths, req.params.name)) {
    res.status(400);
    throw new Error(`Invalid field name ${req.params.name}`);
  }

  res.json({ [fieldName]: field[fieldName] });
});

// @desc Add item to field
// @route PUT /api/fields
// @access Private -> Admin only
const createField = asyncHandler(async (req, res) => {
  // check admin access
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  // check if the field exists
  if (!Object.prototype.hasOwnProperty.call(Field.schema.paths, req.params.name)) {
    res.status(400);
    throw new Error(`Invalid field name ${req.params.name}`);
  }

  // update array
  const filter = { };
  const update = { $addToSet: { [`${req.params.name}`]: req.body.value } }; 
  const updatedField = await Field.updateOne(filter, update);

  try {
    res.json(updatedField);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(`error is ${err.message}`);
  }
});

// @desc Edit field item
// @route PUT /api/fields/:name
// @access Private -> Admin only
const editField = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  // check if the field exists
  if (!Object.prototype.hasOwnProperty.call(Field.schema.paths, req.params.name)) {
    res.status(400);
    throw new Error(`Invalid field name ${req.params.name}`);
  }
  
  // update array
  const filter = { };
  const update = { $addToSet: { [`${req.params.name}`]: req.body.value } }; 
  const updatedField = await Field.updateOne(filter, update);

  try {
    res.json(updatedField);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(`error is ${err.message}`);
  }
});

// @desc Delete field item
// @route DELETE /api/fields/:name
// @access Private -> Admin only
const deleteField = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  if (!Object.prototype.hasOwnProperty.call(Field.schema.paths, req.params.name)) {
    res.status(400);
    throw new Error(`Invalid field name ${req.params.name}`);
  }

  const field = await Field.findOne();
  if (!field) {
    res.status(404);
    throw new Error("No field found");
  }

  await field.remove();

  res.status(200).json({ success: true });
});