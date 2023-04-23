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

// get all fields
router.get("/", protectAdmin, getFields); 

// get field by name
router.get("/:name", protectAdmin, getFieldByName); 

// create field
router.post("/", protectAdmin, createField);

// edit field item
router.put("/:name", protectAdmin, editField);

// delete field
router.delete("/:name", protectAdmin, deleteField);

module.exports = router;