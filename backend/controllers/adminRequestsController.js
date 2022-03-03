const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const Donor = require('../models/donorSchema.js')
const Recipient = require('../models/recipientSchema.js')
const { userInfo } = require('os')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require("jsonwebtoken");

// @desc Finding a donor
// @route /api/donor/find
// @access Public

const findDonor = asyncHandler(async (req, res) => {
    const donorId = req.params.id
    Donor.findById(donorId, function(err, resultDonor){
        if(err){
            res.status(422).send({ errors : [{title: 'Donor Error!', detail: 'Could not find donor!' }]})
        }
        res.json(resultDonor);
    })
})



// @desc Finding a Recipient
// @route /api/recipient/find
// @access Public

const findRecipient = asyncHandler(async (req, res) => {
    const recipientId = req.params.id
    Donor.findById(recipientId, function(err, resultRecipient){
        if(err){
            res.status(422).send({ errors : [{title: 'Recipient Error!', detail: 'Could not find recipient!' }]})
        }
        res.json(resultRecipient);
    })
})


// @desc Manage a Donor
// @route /api/donor/manage
// @access Public

// @desc Manage a Recipient
// @route /api/recipient/manage
// @access Public

// @desc Update a Donor
// @route /api/donor/edit
// @access Public

// @desc Update a Recipient
// @route /api/recipient/edit
// @access Public