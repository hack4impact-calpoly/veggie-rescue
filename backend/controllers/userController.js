const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const Driver = require('../models/driverSchema.js')
const { userInfo } = require('os')
const { JsonWebTokenError } = require('jsonwebtoken')

// @desc Register a new user
// @route /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, id, pin } = req.body

    if(!name || !id || !pin){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if driver does not already exist
    const driverExists = await Driver.findOne({id})

    if(driverExists){
        res.status(400)
        throw new Error('User exists')
    }

    // Hash password
    const salty = await bcrypt.genSalt(10)
    const newHashPin = await bcrypt.hash(pin, salty)

    // Create driver
    const driver = await Driver.create({
        name,
        id,
        pin: newHashPin
    })

    if(driver){
        res.status(201).json({
            _id: driver._id,
            name: driver.name,
            id: driver.id,
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
    const {id, pin} = req.body
    const foundDriver = await Driver.findOne({id})

    // Check if id and password matched
    if(foundDriver && (await bcrypt.compare(pin, foundDriver.pin))) {
        res.status(200).json({
            _id: foundDriver._id,
            name: foundDriver.name,
            id: foundDriver.id,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid ID and Pin')
    }
    res.send('Login Route')
})

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '12h'
    })
}

module.exports = {
    registerUser,
    loginUser,
}