const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema(
  {
    name: String,
    options: [String],
  },
  { collection: "Field" }
);

module.exports = mongoose.model('FieldSchema', FieldSchema)