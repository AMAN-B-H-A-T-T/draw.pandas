const mongoose = require('mongoose')

const Room = mongoose.model("Room",mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    room_id: {
        type: String,
        required: true
    }

}))

module.exports = Room