const express = require("express");
const router = express.Router();
const {
  getFields,
  getFieldByName,
  createField,
  editField,
  deleteField,
} = require("../controllers/fieldController");