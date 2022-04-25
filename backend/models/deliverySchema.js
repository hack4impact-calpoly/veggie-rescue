const mongoose = require('mongoose')

const DeliverySchema = new mongoose.Schema({
    name: String,
    recipientEntityType: String,
    demographic: String,
    foodType: Array,
    area: String
}, {collection: 'Delivery'});

const Delivery = mongoose.model('Delivery', DeliverySchema)

module.exports = Delivery