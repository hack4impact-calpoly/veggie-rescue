const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    id: String,
    name: String,
    isLoggedIn: Boolean,
    clock_in: String,
    clock_out: String,
    pin: Number
}, {collection: 'People'});

const Driver = mongoose.model('Driver', DriverSchema)

module.exports = Driver