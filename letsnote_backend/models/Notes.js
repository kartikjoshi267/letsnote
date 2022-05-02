const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const Notes = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        default: `Untitled`
    },
    tag: {
        type: String,
        default: "General"
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', Notes);