const mongoose = require('mongoose')

const Player = mongoose.model("Player",mongoose.Schema({
    player_name : {
        type : String,
        required : true,
        unique : true
    },
    player_profile_image : {
        type: String,
        required: true
    },
    score : {
        type : String,
        required : true
    },
    is_private_room_creator : {
        type: Boolean,
        required: true
    }
}))

module.exports = Player