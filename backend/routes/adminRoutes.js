const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");
router.post("/", registerAdmin);

router.post("/login", loginAdmin);

router.get("/get", protectAdmin, getAdmin);

module.exports = router;
