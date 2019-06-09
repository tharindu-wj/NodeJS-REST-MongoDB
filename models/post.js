const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Number,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model('Post', postSchema)