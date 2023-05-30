const express = require("express");

const router = express.Router();
const {
  findDonor,
  findRecipient,
  createDonor,
  createRecipient,
  editDonor,
  editRecipient,
  deleteDonor,
  deleteRecipient,
} = require("../controllers/adminRequestsController");

const {
  protectAdmin,
  protectAdminOrDriver,
} = require("../middleware/authMiddleware");

// Fetch
router.get("/donor", protectAdminOrDriver, findDonor);
router.get("/recipient", protectAdminOrDriver, findRecipient);

// Post
router.post("/donor", protectAdmin, createDonor);
router.post("/recipient", protectAdmin, createRecipient);

// Edit
router.put("/donor/:id", protectAdmin, editDonor);
router.put("/recipient/:id", protectAdmin, editRecipient);

// Delete
router.delete("/donor/:id", protectAdmin, deleteDonor);
router.delete("/recipient/:id", protectAdmin, deleteRecipient);

module.exports = router;
