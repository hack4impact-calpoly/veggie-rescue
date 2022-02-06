const mongoose = require('mongoose')

const PickupSchema = new mongoose.Schema({
    id: String,
    name: String,
    donorLocationType: String,
    donorEntityType: String,
    foodType: Array,
    area: String
}, {collection: 'People'});

const Pickup = mongoose.model('Pickup', PickupSchema)

module.exports = Pickup