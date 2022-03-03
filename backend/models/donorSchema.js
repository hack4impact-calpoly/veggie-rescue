const mongoose = require('mongoose')

const DonorSchema = new mongoose.Schema({
    id: String,
    EntityType: String,
    FoddType: String,
    DemographicName: String,
    CombinedAreaName: String
}, {collection: 'Donors'});

module.exports = mongoose.model('DonorSchema', DonorSchema)