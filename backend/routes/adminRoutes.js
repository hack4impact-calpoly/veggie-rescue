const express = require("express");
const router = express.Router();
const {
  getAdmins,
  registerAdmin,
  editAdmin,
  deleteAdmin,
  loginAdmin,
  getAdmin,
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", protectAdmin, getAdmins).post("/", registerAdmin);

router.post("/login", loginAdmin);
router
  .route("/:id")
  .put(protectAdmin, editAdmin)
  .delete(protectAdmin, deleteAdmin);

router.get("/get", protectAdmin, getAdmin);

module.exports = router;
