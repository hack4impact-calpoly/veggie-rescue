const Field = require('../models/FieldSchema');
const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

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
  try {
    const { name } = req.params;
    const field = await Field.findOne({ [name]: { $exists: true } });
    if (!field) {
      return res.status(404).json({ msg: 'Field not found' });
    }
    res.json(field);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
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
    res.send(`Success\n${field}`);
  } catch (err) {
    res.status(500).send(error.messaeg);
    console.log(`error is ${error.message}`);
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
  const body = req.body;

  if (body.name) Field.name = body.name;
  if (body.item) Field.item = body.item;

  await Field.findByIdAndUpdate(req.params.id, Field);
  return res.status(201).json(Field);
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

    const field = await Donor.findById(req.params.id);

    if (!field) {
      res.status(404);
      throw new Error("Field not found");
    }
    
    await field.remove();

    res.status(200).json({success: true})
});


  
