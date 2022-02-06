const mongoose = require('mongoose')

const PickupLogSchema = new mongoose.Schema({
    id: String,
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    donorEntityType: String,
    donorEntityType: String,
    foodType: String,
    area: String,
    lbsPickedUp: Number
}, {collection: 'People'});

const PickupLog = mongoose.model('PickupLog', PickupLogSchema)

module.exports = PickupLog