const express = require('express');
const router = express.Router()
const {registerDriver, loginDriver, getDriver} = require('../controllers/driverController')
const { protectDriver } = require('../middleware/authMiddleware')

router.post('/', registerDriver)

router.post('/login', loginDriver)

router.get('/get', protectDriver, getDriver)

module.exports = router