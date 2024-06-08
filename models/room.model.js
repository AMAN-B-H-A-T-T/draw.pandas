const mongoose = require('mongoose')

const Room = mongoose.model("Room",mongoose.Schema({
    players : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Player",
    }],
    room_id : {
        type : String,
        required : true,
        unique : true
    },
    round : {
        type : Number,
        required: true
    },
    round_details : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Rounds"
    }]
}))

module.exports = Room