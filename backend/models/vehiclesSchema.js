const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    id: String,
    name: String,
    driver: String,
    isLoggedIn: Boolean,
    img: String,
    currentPickups: Array,
    currentDropoffs: Array,
    totalWeight: Number,
}, {collection: 'Vehicle'});

const Vehicle = mongoose.model('Vehicle', VehicleSchema)

module.exports = Vehicle