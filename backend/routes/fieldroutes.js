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
// router.get("/", (req, res) => {
//   // Handle GET request for /api/field
//   res.send("Hello, Field Routes!");
// });

// get field by name
router.get("/:name", protectAdmin, getFieldByName);

// add item to field
router.put("/add", protectAdmin, createField);

// edit field item
router.put("/edit", protectAdmin, editField);

// delete field
router.delete("/:name", protectAdmin, deleteField);

module.exports = router;
