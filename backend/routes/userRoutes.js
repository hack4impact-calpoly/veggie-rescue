const express = require('express');
const router = express.Router()
const {registerUser, loginUser} = require('../controllers/userController')

router.post('/create', registerUser)

router.post('/login', loginUser)

module.exports = router