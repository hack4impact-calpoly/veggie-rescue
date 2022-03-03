const mongoose = require('mongoose')

const RecipientSchema = new mongoose.Schema({
    id: String,
    EntityType: String,
    LocationType: String,
    CombinedAreaName: String
});

module.exports = mongoose.model('RecipientSchema', RecipientSchema)