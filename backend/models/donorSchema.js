const mongoose = require('mongoose')

const DonorSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    EntityType: String,
    FoodType: String,
    LocationType: String,
    CombinedAreaName: String,
  },
  { collection: "Donors" }
);

module.exports = mongoose.model('DonorSchema', DonorSchema)