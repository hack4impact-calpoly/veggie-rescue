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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, oldItem, newItem } = req.body;
  try {
    const field = await Field.findOneAndUpdate(
      { [name]: oldItem },
      { $set: { [`${name}.$`]: newItem } },
      { new: true }
    );
    if (!field) {
      return res.status(404).json({ msg: 'Field item not found' });
    }
    res.json(field);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc Delete field item
// @route DELETE /api/fields/:name
// @access Private -> Admin only
const deleteField = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name } = req.params;
    const { items } = req.body;
    try {
      const field = await Field.findOneAndUpdate(
        { [name]: { $in: items } },
        { $pull: { [name]: { $in: items } } },
        { new: true }
      );
      if (!field) {
        return res.status(404).json({ msg: `No such field with name ${name} and items ${items.join(', ')}` });
      }
      res.json(field);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
