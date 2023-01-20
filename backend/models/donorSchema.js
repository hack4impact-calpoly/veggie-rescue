const mongoose = require('mongoose')

const DonorSchema = new mongoose.Schema(
  {
    name: String,
    EntityType: String,
    LocationType: String,
    CombinedAreaName: String,
  },
  { collection: "Donors" }
);

module.exports = mongoose.model('DonorSchema', DonorSchema)