const asyncHandler = require('express-async-handler')

const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require("jsonwebtoken")

const Donor = require('../models/donorSchema.js')
const Recipient = require('../models/recipientSchema.js')
const Admin = require('../models/adminSchema.js')
const Driver = require('../models/driverModel.js')

// @desc Finding a donor
// @route /api/donor/find
// @access Public

const findDonor = asyncHandler(async (req, res) => {
    const{email} = req.body;
    const driverExists = await Driver.findOne({email})
    const adminExists = await Admin.findOne({email})

    if(!driverExists && !adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    /*
    const recipientId = req.params.id
    Donor.findById(recipientId, function(err, resultRecipient){
        if(err){
            res.status(422).send({ errors : [{title: 'Recipient Error!', detail: 'Could not find recipient!' }]})
        }
        res.json(resultRecipient);
    })*/
    //const admins = db.collection('Admin').find();
    const donor = await Donor.find();
    res.status(200).json(donor);
})



// @desc Finding a Recipient
// @route /api/recipient/find
// @access Public

const findRecipient = asyncHandler(async (req, res) => {
    const{email} = req.body;
    const driverExists = await Driver.findOne({email})
    const adminExists = await Admin.findOne({email})

    if(!driverExists && !adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    /*
    const recipientId = req.params.id
    Donor.findById(recipientId, function(err, resultRecipient){
        if(err){
            res.status(422).send({ errors : [{title: 'Recipient Error!', detail: 'Could not find recipient!' }]})
        }
        res.json(resultRecipient);
    })*/
    const recipient = await Recipient.find();
    res.status(200).json(recipient);
})


// @desc Manage a Donor
// @route /api/donor/manage
// @access Public

const createDonor = asyncHandler(async (req, res) => {
    const adminExists = await Admin.findOne({email})

    if(!adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    const { id, EntityType, FoodType, DemographicName, CombinedAreaName } = req.body
    
    if(!id || !EntityType || !FoodType || !DemographicName || !CombinedAreaName){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if donor does not already exist
    const donorExists = await Donor.findOne({id})

    if(donorExists){
        res.status(400)
        throw new Error('Donor already exists')
    }



    // Create donor
    const donor = await Donor.create({
        id, 
        EntityType, 
        FoodType, 
        DemographicName, 
        CombinedAreaName
    })

    if(donor){
        res.status(201).json({
            _id: donor._id,
            id: donor.id,
            EntityType: donor.EntityType,
            FoodType: donor.FoodType,
            DemographicName: donor.DemographicName,
            CombinedAreaName: donor.CombinedAreaName,
            token: generateToken(donor._id),
        })
    } else{
        res.status(400)
        throw new Error('Invalid Donor Data')
    }


    //res.send('Register Route')
})

// @desc Create a Recipient
// @route /api/recipient/create
// @access Public

const createRecipient = asyncHandler(async (req, res) => {
    const adminExists = await Admin.findOne({email})

    if(!adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    const { id, EntityType, LocationType, CombinedAreaName } = req.body
    
    if(!id || !EntityType || !LocationType || !CombinedAreaName){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if donor does not already exist
    const recipientExists = await Recipient.findOne({id})

    if(!recipientExists){
        res.status(400)
        throw new Error('Donor already exists')
    }


    // Create donor
    const recipient = await Recipient.create({
        id, 
        EntityType, 
        LocationType,  
        CombinedAreaName
    })

    if(recipient){
        res.status(201).json({
            _id: recipient._id,
            id: recipient.id,
            EntityType: recipient.EntityType,
            LocationType: recipient.LocationType,
            CombinedAreaName: recipient.CombinedAreaName,
            token: generateToken(recipient._id),
        })
    } else{
        res.status(400)
        throw new Error('Invalid Recipient Data')
    }


    //res.send('Register Route')
})

// @desc Update a Donor
// @route /api/donor/edit
// @access Public

const editDonor = asyncHandler(async (req, res) => {
    const adminExists = await Admin.findOne({email})

    if(!adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    const body = req.body
    const donor_id = req.params.id
    const donorInDB = db[donor_id]

    if(!donorInDB){
        return res
        .status(404)
        .json({ error: 'Donor not found'});
    }

    if(body.id || body.token){
        return res.status(400).json({ error: 'Cannot edit id'})
    }

    if(body.EntityType){
        donorInDB.EntityType = body.EntityType
    }
    if(body.FoodType){
        donorInDB.FoodType = body.FoodType
    }
    if(body.DemographicName){
        donorInDB.DemographicName = body.DemographicName
    }
    if(body.CombinedAreaName){
        donorInDB.CombinedAreaName = body.CombinedAreaName
    }

    return res
            .status(201)
            .json(donorInDB);


    //res.send('Register Route')
})

// @desc Update a Recipient
// @route /api/recipient/edit
// @access Public

const editRecipient = asyncHandler(async (req, res) => {
    const adminExists = await Admin.findOne({email})

    if(!adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    const body = req.body
    const recip_id = req.params.id
    const recipientInDB = db[recip_id]

    if(!recipientInDB){
        return res
        .status(404)
        .json({ error: 'Recipient not found'});
    }

    if(body.id || body.token){
        return res.status(400).json({ error: 'Cannot edit id'})
    }

    if(body.EntityType){
        recipientInDB.EntityType = body.EntityType
    }
    if(body.LocationType){
        recipientInDB.LocationType = body.LocationType
    }
    if(body.DemographicName){
        recipientInDB.DemographicName = body.DemographicName
    }

    return res
            .status(201)
            .json(recipientInDB);


    //res.send('Register Route')
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

module.exports = {
    findDonor,
    findRecipient,
    createDonor,
    createRecipient,
    editDonor,
    editRecipient,
}