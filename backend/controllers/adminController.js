const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

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

// @desc Login an admin
// @route /api/admin
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //get email
  const foundAdmin = await Admin.findOne({ email });

  if (foundAdmin && (await bycrpt.compare(password, foundAdmin.password))) {
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
    id: req.admin._id,
    name: req.admin.name,
    email: req.admin.email,
    isLoggedIn: req.admin.isLoggedIn,
    password: req.admin.pin,
  };
  res.status(200).json(admin);
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmin,
};
