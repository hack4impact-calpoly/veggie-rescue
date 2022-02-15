const mongoose = require('mongoose')

const DeliverySchema = new mongoose.Schema({
    id: String,
    name: String,
    recipientEntityType: String,
    demographic: String,
    foodType: Array,
    area: String
}, {collection: 'People'});

const Delivery = mongoose.model('Delivery', DeliverySchema)

module.exports = Delivery