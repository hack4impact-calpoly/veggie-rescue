const Field = require('../models/FieldSchema');
const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel.js')

// @desc Get all fields
// @route GET /api/fields
// @access Private -> Admin only
const getFields = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  res.send(await Field.find({}));
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

  const field = await Field.findOne({ name: req.params.name });
  if (!field) {
    return res.status(404).json({ message: "No field found" });
  }

  res.json(field);
});

// @desc Add item to field
// @route POST /api/fields
// @access Private -> Admin only
const createField = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  const {
    name, 
    item,
  } = req.body;

  let field = new Field({
    name: name,
    item: item,
  });

  try {
    field = await field.save();
    res.json(field);
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

  const field = await Field.findOne({ name: req.params.name });
  if (!field) {
    res.status(404);
    throw new Error("No field found");
  }
  
  const body = req.body;

  if (body.name) field.name = body.name;
  if (body.item) field.item = body.item;

  await field.save();
  return res.status(201).json(field);
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

    const field = await Field.findById(req.params.id);

    if (!field) {
      res.status(404);
      throw new Error("Field not found");
    }
    
    await field.remove();

    res.status(200).json({success: true})
});


  
