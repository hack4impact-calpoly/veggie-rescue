const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    id: String,
    name: String,
    img: String,
    currentPickups: Array,
    currentDropoffs: Array,
    totalWeight: Number
}, {collection: 'People'});

const Vehicle = mongoose.model('Vehicle', VehicleSchema)

module.exports = Vehicle