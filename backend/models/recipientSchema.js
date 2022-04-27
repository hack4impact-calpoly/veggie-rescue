const mongoose = require('mongoose')

const RecipientSchema = new mongoose.Schema({
    name: String,
    EntityType: String,
    DemographicName: String,
    CombinedAreaName: String
},  {collection: 'Recipients'});

module.exports = mongoose.model('RecipientSchema', RecipientSchema)