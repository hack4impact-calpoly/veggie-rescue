const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        unique: true
    },
    isLoggedIn: {
        type: Boolean,
        required: false,
        default: false
    },
    clock_in: {
        type: String,
        required: false,
        default: '0:00'
    },
    clock_out: {
        type: String,
        required: false,
        default: '0:00'
    }

}, {collection: 'Drivers'});

const Driver = mongoose.model('Driver', DriverSchema)

module.exports = Driver