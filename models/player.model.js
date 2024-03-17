const mongoose = require('mongoose')

const Player = mongoose.model("Player",mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
}))

module.exports = Player