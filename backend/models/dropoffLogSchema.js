const mongoose = require('mongoose')

const DropoffLogSchema = new mongoose.Schema({
    id: String,
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    recipientEntityType: String,
    demographic: String,
    foodType: String,
    area: String,
    lbsDroppedOff: Number
}, {collection: 'People'});

const DropoffLog = mongoose.model('DropoffLog', DropoffLogSchema)

module.exports = DropoffLog