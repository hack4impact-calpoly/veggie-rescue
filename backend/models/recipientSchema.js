const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema(
  {
    name: String,
    EntityType: String,
    DemographicType: String,
    FoodType: String,
    CombinedAreaName: String,
    FoodDistributionModel: String,
  },
  { collection: "Recipients" }
);

module.exports = mongoose.model("RecipientSchema", RecipientSchema);
