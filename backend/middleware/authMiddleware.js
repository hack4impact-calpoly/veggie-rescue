const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Driver = require("../models/driverModel");
const Admin = require("../models/adminModel");

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

const protectAdmin = asyncHandler(async (req, res, next) => {
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

// This middleware is used for routes which both admins and drivers can use
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
      const dr = await Driver.findById(decoded.id).select("-pin");

      // This case for admin
      if (ad) {
        // Get admin from token
        req.admin = await Admin.findById(decoded.id).select("-password");
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
