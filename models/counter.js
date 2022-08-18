const { Schema } = require('mongoose');
const mongoose = require('mongoose');

let i = 0;
const Person = new Schema({
    sNo: {
        type: Number,
        default: i++
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('persons', Person);
