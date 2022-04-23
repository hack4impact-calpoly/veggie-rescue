const asyncHandler = require('express-async-handler')

const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require("jsonwebtoken")

const Donor = require('../models/donorSchema.js')
const Recipient = require('../models/recipientSchema.js')
const Admin = require('../models/adminModel.js')
const Driver = require('../models/driverModel.js')

// @desc Get full donor list
// @route /api/location/donor
// @access Private
const findDonor = asyncHandler(async (req, res) => {
    const email = req.params.email;
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
    const userEmail = req.params.email
    const driverExists = await Driver.findOne({userEmail})
    const adminExists = await Admin.findOne({userEmail})

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


// @desc Create a new Donor
// @route /api/location/donor
// @access Private
const createDonor = asyncHandler(async (req, res) => {
    const adminEmail = req.params.email
    const adminExists = await Admin.findOne({adminEmail})

    if(!adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    const { name, EntityType, FoodType, LocationType, CombinedAreaName } =
      req.body;
    
    if (!name || !EntityType || !FoodType || !LocationType || !CombinedAreaName) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    // Find if donor does not already exist
    const donorExists = await Donor.findOne({name})

    if(donorExists){
        res.status(400)
        throw new Error('Donor already exists')
    }

    // Create donor
    const donor = await Donor.create({
        name, 
        EntityType, 
        FoodType, 
        LocationType,
        CombinedAreaName
    })

    if(donor){
        res.status(201).json({
          _id: donor._id,
          name: donor.name,
          EntityType: donor.EntityType,
          FoodType: donor.FoodType,
          LocationType: donor.LocationType,
          CombinedAreaName: donor.CombinedAreaName,
        });
    } else{
        res.status(400)
        throw new Error('Invalid Donor Data')
    }


    //res.send('Register Route')
})

// @desc Create a Recipient
// @route /api/location/recipient
// @access Public
const createRecipient = asyncHandler(async (req, res) => {
    const adminEmail = req.params.email
    const adminExists = await Admin.findOne({adminEmail})

    if(!adminExists){
        res.status(400)
        throw new Error('This User does not have access')
    }
    const { name, EntityType, DemographicName, CombinedAreaName } = req.body
    
    if( !name || !EntityType || !DemographicName  || !CombinedAreaName){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if donor does not already exist
    const recipientExists = await Recipient.findOne({name})

    if(recipientExists){
        res.status(400)
        throw new Error('Recipient already exists')
    }


    // Create donor
    const recipient = await Recipient.create({
      name,
      EntityType,
      DemographicName,
      CombinedAreaName,
    });

    if(recipient){
        res.status(201).json({
          _id: recipient._id,
          name: recipient.name,
          EntityType: recipient.EntityType,
          DemographicName: recipient.DemographicName,
          CombinedAreaName: recipient.CombinedAreaName,
        });
    } else{
        res.status(400)
        throw new Error('Invalid Recipient Data')
    }


    //res.send('Register Route')
})

// @desc Update a Donor
// @route /api/donor
// @access Public

const editDonor = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }
    const donor = await Donor.findById(req.params.id)

    const body = req.body
  if (!donor) {
    res.status(404);
    throw new Error("No donor found");
  }

    //const donor_id = req.params.id
    //const donorInDB = db[donor_id]

    // if(!donorInDB){
    //     return res
    //     .status(404)
    //     .json({ error: 'Donor not found'});
    // }

    // if(body.id || body.token){
    //     return res.status(400).json({ error: 'Cannot edit id'})
    // }
     if (body.name) {
     donor.name = body.EntityType;
    }
    if(body.EntityType){
        donor.EntityType = body.EntityType;
    }
    if(body.FoodType){
        donor.FoodType = body.FoodType;
    }
    if(body.DemographicName){
        donor.DemographicName = body.DemographicName;
    }
    if(body.CombinedAreaName){
        donor.CombinedAreaName = body.CombinedAreaName;
    }
    await Donor.findByIdAndUpdate(req.params.id, donor);
    return res.status(201).json(donor);


    //res.send('Register Route')
})

// @desc Update a Recipient
// @route /api/recipient/edit
// @access Public

const editRecipient = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }
    const recipient = await Recipient.findById(req.params.id);


    // if(!adminExists){
    //     res.status(400)
    //     throw new Error('This User does not have access')
    // }
    // const body = req.body
    // const recip_id = req.params.id
    // const recipientInDB = db[recip_id]

    // if(!recipientInDB){
    //     return res
    //     .status(404)
    //     .json({ error: 'Recipient not found'});
    // }

    // if(body.id || body.token){
    //     return res.status(400).json({ error: 'Cannot edit id'})
    // }

    // if(body.EntityType){
    //     recipientInDB.EntityType = body.EntityType
    // }
    // if(body.LocationType){
    //     recipientInDB.LocationType = body.LocationType
    // }
    // if(body.DemographicName){
    //     recipientInDB.DemographicName = body.DemographicName
    // }

    // return res
    //         .status(201)
    //         .json(recipientInDB);


    //res.send('Register Route')
})

// @desc Delete a Donor
// @route /api/location/donor/delete
// @access Public

const deleteDonor = asyncHandler(async (req, res) => {

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin not found");
    }
    
    const donor = await Donor.findById(req.params.id);

      if (!donor) {
        res.status(404);
        throw new Error("Donor not found");
      }

    await donor.remove();

      res.status(200).json({ success: true });

    // const adminEmail = req.params.email
    // const adminExists = await Admin.findOne({adminEmail})

    // if(!adminExists){
    //     res.status(400)
    //     throw new Error('This User does not have access')
    // }
    // const body = req.body
    // const donor_id = body.id
    // //const donorInDB = db[donor_id]
    // const donorInDB = await Donor.findOne({id: donor_id})

    // if(!donorInDB){
    //     return res
    //     .status(404)
    //     .json({ error: 'Donor not found'});
    // }

    // Donor.findOneAndRemove({id: donor_id}, function(err){
    //     if(err){
    //         console.log(err);
    //         return res.status(500).send();
    //     }
    //     return res.status(200).send();
    // })

    //return res.status(200).json(donorInDB)
    /*

    //const donorDeleted = await Donor.deleteById(donor_id);
    const donorDeleted = Donor.findByIdAndDelete(donor_id);

    if(!donorDeleted){
        return res.status(404).json({ error: 'Donor could not be deleted'})
    }


    return res
            .status(201)
            .json(donor_id);*/


    //res.send('Register Route')
})

// @desc Delete a Recipient
// @route /api/location/recipient/delete
// @access Public

const deleteRecipient = asyncHandler(async (req, res) => {

     // const vehicle = await Vehicle.find({ driver: req.params.id });

    // const adminEmail = req.params.email
    // const adminExists = await Admin.findOne({adminEmail})

    // if(!adminExists){
    //     res.status(400)
    //     throw new Error('This User does not have access')
    // }
    // const body = req.body
    // const recip_id = body.id
    // //const donorInDB = db[donor_id]
    // const recipInDB = await Recipient.findOne({id: recip_id})

    // if(!recipInDB){
    //     return res
    //     .status(404)
    //     .json({ error: 'Recipient not found'});
    // }

    // Recipient.findOneAndRemove({id: recip_id}, function(err){
    //     if(err){
    //         console.log(err);
    //         return res.status(500).send();
    //     }
    //     return res.status(200).send();
    // })

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
    deleteDonor,
    deleteRecipient,
}