const mongoose = require('mongoose')

const LeaderBoard = mongoose.model("LeaderBoard",({
    room : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Room",
    },
    highscore : {
        type : Number,
        required : true
    }
}))

module.exports = LeaderBoard
