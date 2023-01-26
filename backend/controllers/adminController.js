const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminSchema");

// Generate Token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

// @desc Get all admins
// @route /api/admin
// @access Private
const getAdmins = asyncHandler(async (req, res) => {
  // Get admin using the id in the JWT
  // Takes token from local storage key and verifies authenticity
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  const admins = await Admin.find();
  res.status(200).json(admins);
});

// @desc Register a new admin; check if email exists
// @route /api/admin
// @access Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all required inputs");
  }

  // We have to see if the email is already in database
  const foundAdmin = await Admin.findOne({ email });

  if (foundAdmin) {
    res.status(400);
    throw new Error("Email already used");
  }

  // Hash password
  const salty = await bcrypt.genSalt(10);
  const newHashPin = await bcrypt.hash(password, salty);

  // Create admin
  const admin = await Admin.create({
    name,
    email,
    password: newHashPin,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin Data");
  }
});

// @desc    Edit admin
// @route   PUT /api/admin/:id
// @access  Private
const editAdmin = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const admin = await Admin.findById(req.admin.id);

  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }
  const { email, name, password } = req.body;

  // Build admin object
  const adminFields = {};
  if (name) adminFields.name;
  if (email) {
    // Find if driver does not already exist
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      res.status(400);
      throw new Error("Email exists");
    }
    adminFields.email = email;
  }
  if (password) adminFields.password = password;

  try {
    let adminToUpdate = await Admin.findById(req.params.id);

    if (!adminToUpdate) return res.status(404).json({ msg: "Admin not found" });

    adminToUpdate = await Admin.findByIdAndUpdate(req.params.id, {
      $set: adminFields,
    });

    res.json(adminToUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Delete admin
// @route   DELETE /api/admin/:id
// @access  Private
const deleteAdmin = asyncHandler(async (req, res) => {
  // Get admin using the id in the JWT
  // Takes token from local storage key and verifies authenticity
  const admin = await Admin.findById(req.admin.id);
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  const adminToDelete = await Admin.findById(req.params.id);
  if (!adminToDelete) {
    res.status(404);
    throw new Error("Driver not found");
  }
  if (adminToDelete._id === admin._id) {
    res.status(404);
    throw new Error("Cannot delete yourself");
  }

  await adminToDelete.remove();

  res.status(200).json({
    success: true,
    msg: "Successfully removed admin",
  });
});

// @desc Login an admin
// @route /api/admin
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // get email
  const foundAdmin = await Admin.findOne({ email });

  if (foundAdmin && (await bcrypt.compare(password, foundAdmin.password))) {
    res.status(200).json({
      _id: foundAdmin._id,
      name: foundAdmin.name,
      email: foundAdmin.email,
      token: generateToken(foundAdmin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Password");
  }
});

// @desc    Get current admin
// @route   /api/admin/get
// @access  Private
const getAdmin = asyncHandler(async (req, res) => {
  const admin = {
    _id: req.admin._id,
    name: req.admin.name,
    email: req.admin.email,
    isLoggedIn: req.admin.isLoggedIn,
    password: req.admin.pin,
  };
  res.status(200).json(admin);
});

module.exports = {
  getAdmins,
  registerAdmin,
  editAdmin,
  deleteAdmin,
  loginAdmin,
  getAdmin,
};
