const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
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
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        unique: true
    }
}, {collection: 'People'});

const Driver = mongoose.model('Driver', DriverSchema)

module.exports = Driver