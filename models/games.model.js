const mongoose = require('mongoose')

const Game = mongoose.model("Game",mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    game_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game_Category",
        required: true
    },
    tot_rounds: {
        type: Number,
        required: true
    },
    drawing_time: {
        type: Number,
        required: true
    }
}))

module.exports = {
    Game
}