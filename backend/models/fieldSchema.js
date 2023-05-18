const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema(
  {
    EntityType: [String],
    LocationType: [String],
    CombinedAreaName: [String],
    OrgStructure: [String],
    DemographicsServed: [String],
    FoodDistModel: [String],
    FoodTypes: [String],
  },
  { collection: "Field" }
);

module.exports = mongoose.model("FieldSchema", FieldSchema);
