/* eslint-disable @typescript-eslint/no-unused-vars */
const asyncHandler = require("express-async-handler");
const Fields = require("../models/fieldSchema");
const Admin = require("../models/adminSchema");
const Driver = require("../models/driverSchema");

// @desc Get all fields
// @route GET /api/fields
// @access Private -> Admin only
const getFields = asyncHandler(async (req, res) => {
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

  try {
    res.send(await Fields.findOne({}));
  } catch (err) {
    res
      .status(err.statusCode ? err.statusCode : 500)
      .send(`Unable to fetch fields ${err.message}`);
  }
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
  try {
    const { fieldName } = req.params;
    // check if the field exists
    if (!Object.prototype.hasOwnProperty.call(Fields.schema.paths, fieldName)) {
      throw new Error({
        status: 400,
        messsage: `Field doesn't exist ${fieldName}`,
      });
    }
    const field = await Fields.findOne({ [fieldName]: { $exists: true } });
    res.json({ [fieldName]: field[fieldName] });
  } catch (err) {
    res
      .status(err.statusCode ? err.statusCode : 500)
      .send(`Unable to fetch field ${err.message}`);
  }
});

// @desc Add item to field
// @route PUT /api/fields/add
// @access Private -> Admin only
const createField = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  try {
    const { fieldName, value } = req.body;
    // check if the field exists
    if (!Object.prototype.hasOwnProperty.call(Fields.schema.paths, fieldName)) {
      throw new Error({
        status: 400,
        message: `Field doesn't exist ${fieldName}`,
      });
    }

    // add new item to array if it exists
    const filter = {};
    const update = { $addToSet: { [`${fieldName}`]: value } };
    const updatedField = await Fields.updateOne(filter, update);
    res.json(updatedField);
  } catch (err) {
    res
      .status(err.statusCode ? err.statusCode : 500)
      .send(`Unable to add field ${err.message}`);
  }
});

// @desc Edit field item
// @route PUT /api/fields/edit
// @access Private -> Admin only
const editField = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  try {
    const { fieldName, oldValue, newValue } = req.body;
    // check if the field exists
    if (!Object.prototype.hasOwnProperty.call(Fields.schema.paths, fieldName)) {
      throw new Error({
        status: 400,
        message: `Field doesn't exist ${fieldName}`,
      });
    }
    const filter = {};
    // set value of the element in the array associated with the specified field using the $ positional operator
    const update = { $set: { [`${fieldName}.$[elem]`]: newValue } };
    const options = { arrayFilters: [{ elem: oldValue }] }; // use arrayFilters to match the element with the old value
    const updatedField = await Fields.updateOne(filter, update, options);
    res.json(updatedField);
  } catch (err) {
    res
      .status(err.statusCode ? err.statusCode : 500)
      .send(`Unable to edit field ${err.message}`);
  }
});

// @desc Delete field item
// @route PUT /api/fields/delete
// @access Private -> Admin only
const deleteField = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  try {
    const { fieldName, value } = req.body;
    if (!Object.prototype.hasOwnProperty.call(Fields.schema.paths, fieldName)) {
      throw new Error({
        status: 400,
        message: `Field doesn't exist ${fieldName}`,
      });
    }

    const filter = { [fieldName]: value };
    const update = { $pull: { [fieldName]: value } };
    const options = { returnOriginal: false };

    const updatedField = await Fields.findOneAndUpdate(filter, update, options);
    res.json(updatedField);
  } catch (err) {
    res
      .status(err.statusCode ? err.statusCode : 500)
      .send(`Unable to delete field ${err.message}`);
  }
});

module.exports = {
  getFields,
  getFieldByName,
  createField,
  editField,
  deleteField,
};
