const asyncHandler = require('express-async-handler')

const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require("jsonwebtoken")

const Vehicle = require('../models/vehicleSchema.js')
const Admin = require('../models/adminSchema.js')
const Driver = require('../models/driverSchema.js')


// @desc Finding a Vehicle
// @route /api/vehicle/find
// @access Public

const findVehicle = asyncHandler(async (req, res) => {
    const driverExists = await Driver.findOne({email})
    const adminExists = await Admin.findOne({email})

    if(!driverExists && !adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    /*const recipientId = req.params.id
    Donor.findById(recipientId, function(err, resultRecipient){
        if(err){
            res.status(422).send({ errors : [{title: 'Recipient Error!', detail: 'Could not find recipient!' }]})
        }
        res.json(resultRecipient);
    })*/
    const vehicle = await Vehicle.find();
    res.status(200).json(vehicle);
})


// @desc Create a Vehicle
// @route /api/vehicle/manage
// @access Public

const createVehicle = asyncHandler(async (req, res) => {
    const adminExists = await Admin.findOne({email})

    if(!adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    const { id, name, img, currentPickups, currentDropoffs, totalWeight} = req.body
    
    if(!id || !name || !img || !currentPickups || !currentDropoffs || totalWeight){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if donor does not already exist
    const vehicleExists = await Vehicle.findOne({id})

    if(vehicleExists){
        res.status(400)
        throw new Error('Vehicle already exists')
    }


    // Create donor
    const vehicle = await Vehicle.create({
        id, 
        name, 
        img, 
        currentPickups, 
        currentDropoffs,
        totalWeight
    })

    if(vehicle){
        res.status(201).json({
            _id: vehicle._id,
            id: vehicle.id,
            name: vehicle.name,
            img: vehicle.img,
            currentPickups: vehicle.currentPickups,
            currentDropoffs: vehicle.currentDropoffs,
            totalWeight: vehicle.totalWeight,
            token: generateToken(vehicle._id),
        })
    } else{
        res.status(400)
        throw new Error('Invalid Vehicle Data')
    }


    //res.send('Register Route')
})


// @desc Update a Vehicle
// @route /api/vehicle/edit
// @access Public

/*
*id: String,
    name: String,
    img: String,
    currentPickups: Array,
    currentDropoffs: Array,
    totalWeight: Number
*/

const editVehicle = asyncHandler(async (req, res) => {
    const adminExists = await Admin.findOne({email})

    if(!adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    const body = req.body
    const vehicle_id = req.params.id
    const vehicleInDB = db[vehicle_id]

    if(!vehicleInDB){
        return res.status(404).json({ error: 'Donor not found'});
    }

    if(body.id || body.token){
        return res.status(400).json({ error: 'Cannot edit id'})
    }

    if(body.name){
        vehicleInDB.name = body.name
    }
    if(body.img){
        vehicleInDB.img = body.img
    }
    if(body.currentPickups){
        vehicleInDB.currentPickups = body.currentPickups
    }
    if(body.currentDropoffs){
        vehicleInDB.currentDropoffs = body.currentDropoffs
    }
    if(body.totalWeight){
        vehicleInDB.totalWeight = body.totalWeight
    }

    return res.status(201).json(vehicleInDB);


    //res.send('Register Route')
})
