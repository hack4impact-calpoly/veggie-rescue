/* eslint-disable @typescript-eslint/no-unused-vars */
const asyncHandler = require("express-async-handler");
const Fields = require("../models/fieldSchema");
const Admin = require("../models/adminSchema");

// @desc Get all fields
// @route GET /api/fields
// @access Private -> Admin only
const getFields = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }
    res.send(await Fields.findOne({}));
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode);
    } else {
      res.status(500);
    }
    res.send(`Unable to fetch fields ${err.message}`);
  }
});

// @desc Get field by name
// @route GET /api/fields/:name
// @access Private -> Admin only
const getFieldByName = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }

    const { fieldName } = req.body;
    // check if the field exists
    if (!Object.prototype.hasOwnProperty.call(Fields.schema.paths, fieldName)) {
      res.status(400);
      throw new Error(`Field doesn't exist ${fieldName}`);
    }
    const field = await Fields.findOne({ [fieldName]: { $exists: true } });
    res.json({ [fieldName]: field[fieldName] });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode);
    } else {
      res.status(500);
    }
    res.send(`Unable to fetch field ${err.message}`);
  }
});

// @desc Add item to field
// @route PUT /api/fields
// @access Private -> Admin only
const createField = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }

    const { fieldName, value } = req.body;
    // check if the field exists
    if (!Object.prototype.hasOwnProperty.call(Fields.schema.paths, fieldName)) {
      res.status(400);
      throw new Error(`Field doesn't exist ${fieldName}`);
    }

    // add new item to array if it exists
    const filter = {};
    const update = { $addToSet: { [`${fieldName}`]: value } };
    const updatedField = await Fields.updateOne(filter, update);
    res.json(updatedField);
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode);
    } else {
      res.status(500);
    }
    res.send(`Unable to add field ${err.message}`);
  }
});

// @desc Edit field item
// @route PUT /api/fields/:name
// @access Private -> Admin only
const editField = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }

    const { fieldName, oldValue, newValue } = req.body;
    // check if the field exists
    if (!Object.prototype.hasOwnProperty.call(Fields.schema.paths, fieldName)) {
      res.status(400);
      throw new Error(`Field doesn't exist ${fieldName}`);
    }

    const filter = {};
    // set value of the element in the array associated with the specified field using the $ positional operator
    const update = { $set: { [`${fieldName}.$[elem]`]: newValue } };
    const options = { arrayFilters: [{ elem: oldValue }] }; // use arrayFilters to match the element with the old value
    const updatedField = await Fields.updateOne(filter, update, options);
    res.json(updatedField);
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode);
    } else {
      res.status(500);
    }
    res.send(`Unable to edit field ${err.message}`);
  }
});

// @desc Delete field item
// @route DELETE /api/fields/:name
// @access Private -> Admin only
const deleteField = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }

    const { fieldName, value } = req.body;
    if (!Object.prototype.hasOwnProperty.call(Fields.schema.paths, fieldName)) {
      res.status(400);
      throw new Error(`Field doesn't exist ${fieldName}`);
    }

    const filter = { [fieldName]: value };
    const update = { $pull: { [fieldName]: value } };
    const options = { returnOriginal: false };

    const updatedField = await Fields.findOneAndUpdate(filter, update, options);
    res.json(updatedField);
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode);
    } else {
      res.status(500);
    }
    res.send(`Unable to delete field ${err.message}`);
  }
});
