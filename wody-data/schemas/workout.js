const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    fav: {
        type: Boolean,
        default: false
    },
    date: {
        type: Number,
        default: Date.now()
    },
    timefinish: {
        type: String,
        default: 'No res.'
    },
    sets: {
        type: Array,
    },
    movements: {
        type: Array
    }
})