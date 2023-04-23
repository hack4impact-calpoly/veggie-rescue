const express = require("express");
const router = express.Router();
const {
  getFields,
  getFieldByName,
  createField,
  editField,
  deleteField,
} = require("../controllers/fieldController");
const { protectAdmin } = require("../middleware/authMiddleware");


