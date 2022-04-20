const express = require('express');
const router = express.Router()
const {findVehicle, createVehicle, editVehicle, deleteVehicle} = require('../controllers/vehicleController')

//Fetch
router.get('/find', findVehicle)

//Post
router.post('/create', createVehicle)

//Edit
router.put('/edit', editVehicle)

//Delete
router.delete('/delete', deleteVehicle)


module.exports = router

