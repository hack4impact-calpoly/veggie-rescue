const express = require("express");

const router = express.Router();
const {
  getFields,
  getFieldByName,
  createField,
  editField,
  deleteField,
} = require("../controllers/fieldController");
const {
  protectAdmin,
  protectAdminOrDriver,
} = require("../middleware/authMiddleware");

// get all fields
router.get("/", protectAdminOrDriver, getFields);

// get field by name
router.get("/:name", protectAdmin, getFieldByName);

// add item to field
router.put("/add", protectAdmin, createField);

// edit field item
router.put("/edit", protectAdmin, editField);

// delete field
router.delete("/:name", protectAdmin, deleteField);

module.exports = router;
