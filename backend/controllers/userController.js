const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const Driver = require('../models/driverSchema.js')
const { userInfo } = require('os')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require("jsonwebtoken");

// @desc Register a new user
// @route /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if driver does not already exist
    const driverExists = await Driver.findOne({email})

    if(driverExists){
        res.status(400)
        throw new Error('User exists')
    }

    // Hash password
    const salty = await bcrypt.genSalt(10)
    const newHashPin = await bcrypt.hash(password, salty)

    // Create driver
    const driver = await Driver.create({
        name,
        email,
        password: newHashPin
    })

    if(driver){
        res.status(201).json({
            _id: driver._id,
            name: driver.name,
            email: driver.email,
            token: generateToken(driver._id),
        })
    } else{
        res.status(400)
        throw new Error('Invalid User Data')
    }


    //res.send('Register Route')
})
// @desc Login a new user
// @route /api/users
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const foundDriver = await Driver.findOne({email})

    // Check if id and password matched
    if(foundDriver && (await bcrypt.compare(password, foundDriver.password))) {
        res.status(200).json({
            _id: foundDriver._id,
            name: foundDriver.name,
            email: foundDriver.email,
            token: generateToken(foundDriver._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid ID and Pin')
    }
})

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

module.exports = {
    registerUser,
    loginUser,
}