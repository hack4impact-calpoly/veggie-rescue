const express = require('express');
const router = express.Router()
const {findDonor, findRecipient, createDonor, createRecipient, editDonor, editRecipient, deleteDonor, deleteRecipient} = require('../controllers/adminRequestsController')

const {
  protectDriver,
  protectAdmin,
  protectAdminOrDriver,
} = require("../middleware/authMiddleware");

//Fetch
router.get("/donor", protectAdminOrDriver, findDonor);
router.get("/recipient", protectAdminOrDriver, findRecipient) 

//Post
router.post("/donor", protectAdmin, createDonor);
router.post('/recipient', protectAdmin,  createRecipient)

//Edit
router.put("/donor", protectAdmin, editDonor);
router.put("/recipient", protectAdmin, editRecipient);

//Delete
router.delete("/donor", protectAdmin, deleteDonor);
router.delete("/recipient", protectAdmin, deleteRecipient);



module.exports = router

