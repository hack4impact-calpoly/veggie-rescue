const mongoose = require('mongoose')

const PickupSchema = new mongoose.Schema({
    name: String,
    donorLocationType: String,
    donorEntityType: String,
    foodType: Array,
    area: String
}, {collection: 'Pickup'});

const Pickup = mongoose.model('Pickup', PickupSchema)

module.exports = Pickup