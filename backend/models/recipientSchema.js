const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema(
  {
    name: String,
    OrgStructure: String,
    DemographicsServed: String,
    CombinedAreaName: String,
    FoodDistModel: String,
  },
  { collection: "Recipients" }
);

module.exports = mongoose.model("RecipientSchema", RecipientSchema);
