const express = require('express');
const router = express.Router()
const {findDonor, findRecipient, createDonor, createRecipient, editDonor, editRecipient, deleteDonor, deleteRecipient} = require('../controllers/adminRequestsController')

//Fetch
router.get('/donor/find', findDonor)
router.get('/recipient/find', findRecipient)


//Post
router.post('/donor/create', createDonor)
router.post('/recipient/create', createRecipient)

//Edit
router.put('/donor/edit', editDonor)
router.put('/recipient/edit', editRecipient)

//Delete
router.delete('/donor/delete', deleteDonor)
router.delete('/recipient/delete', deleteRecipient)



module.exports = router

