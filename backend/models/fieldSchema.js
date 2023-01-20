const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema(
  {
    options: [String],
  },
  { collection: "Field" }
);

module.exports = mongoose.model('FieldSchema', FieldSchema)