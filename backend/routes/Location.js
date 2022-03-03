const express = require('express');
const router = express.Router()
const {findDonor, findRecipient} = require('../controllers/userController')
//const {}

router.get('/donor/find', findDonor)

router.get('/recipient/find', findRecipient)

router.post('/donor/manage', manageDonor)
router.post('/recipient/manage', manageRecipient)

module.exports = Location