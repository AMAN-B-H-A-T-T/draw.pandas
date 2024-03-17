const mongoose = require('mongoose')

const Game_Category = mongoose.model("Game_Category",mongoose.Schema({
    game_type: {
        type: String,
        required: true,
        unique: true
    }
}))

module.exports = Game_Category
