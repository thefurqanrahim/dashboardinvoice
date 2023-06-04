const mongoose = require('mongoose')

const DashbaordSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('USER', DashbaordSchema)