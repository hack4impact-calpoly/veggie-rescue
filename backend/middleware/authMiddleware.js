const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Driver = require("../models/driverSchema");
const Admin = require("../models/adminSchema");

// Insert this into routes where you want only users who are logged in as drivers accessing routes
const protectDriver = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get driver from token
      req.driver = await Driver.findById(decoded.id).select("-pin");
      if (!req.driver) {
        res.status(401);
        throw new Error("Invalid token (probabably for admin)");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

// Insert this into routes where you want only users who are logged in as admins accessing routes
const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      [, token] = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        res.status(401);
        throw new Error("Invalid token (probabably for driver)");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

// Insert this into routes where you want only users who are logged in as drivers OR admins accessing routes
const protectAdminOrDriver = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Now see if response is an Admin or a Driver... otherwise it will be null
      const ad = await Admin.findById(decoded.id).select("-password");
      // This case for admin
      if (ad) {
        // Get admin from token
        req.admin = ad;
      } else {
        // Get driver from token
        req.driver = await Driver.findById(decoded.id).select("-pin");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});
module.exports = { protectDriver, protectAdmin, protectAdminOrDriver };